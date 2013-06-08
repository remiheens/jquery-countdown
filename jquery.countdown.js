/**
 * jQuery Countdown plugin
 *
 *
 * @package      jQuery
 * @author      Remi Heens | www.remiheens.fr | jquery@remiheens.fr
 * @copyright   Copyright (c) 2013, Remi Heens.
 * @license      http://creativecommons.org/licenses/by-nc/3.0/
 * @link      http://www.remiheens.fr
 * @version      Version 0.1
 *
 */

(function($)
{ 
    $.fn.countdown = function(options)
    {
       var settings = $.extend({
          debug : true,
          delay : 1000,
          pattern : '{0}-{1}-{2}',
          events: {
            finish: function(){

            },
            progress : function(){

            }
          } 
        },options);

        var instance = [];
        return this.each(function(i,el)
        {
           function timer()
           {
              var date = $(el).attr('data-limit');
              var d = date.split(' ');
              var a0 = d[0];
              var b0 = d[1];
              var a = a0.split('-');
              var b = b0.split(':');

              var date_second = new Date(a[0], a[1]-1, a[2], b[0], b[1], b[2]).getTime() / 1000;
              var now = new Date().getTime() / 1000;

              var left = (date_second-now);

              if(left-1 < 0)
              {
                 window.clearInterval(instance[i]);
                 settings.events.finish();
                 left = 0;
                 return;
              }

              var hours = parseInt( left / 3600 ) % 24;
              var minutes = parseInt( left / 60 ) % 60;
              var seconds = parseInt( left % 60 );


              $(el).html(settings.pattern.format((hours < 10 ? "0" + hours : hours),(minutes < 10 ? "0" + minutes : minutes),(seconds  < 10 ? "0" + seconds : seconds)));

              // fire progress event
              settings.events.progress();
           }

           timer();
           instance[i] = setInterval(timer,settings.delay);
        });                         
    };

    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };

})(jQuery);
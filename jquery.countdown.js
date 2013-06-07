/**
 * jQuery Countdown plugin
 *
 *
 * @package		jQuery
 * @author		Remi Heens | www.remiheens.fr | jquery@remiheens.fr
 * @copyright	Copyright (c) 2013, Remi Heens.
 * @license		http://creativecommons.org/licenses/by-nc/3.0/
 * @link		http://www.remiheens.fr
 * @version		Version 0.1
 *
 */

(function($)
{ 
    $.fn.countdown = function(fct)
    {
    	var settings = {
    		debug : true,
            callback: function(){
            	if(settings.debug === true)
            	{
            		console.log('boum');
            	}
            }
        };

        if(fct)
        {
        	settings.callback = fct;
        }

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
	       		if(left < 0)
	       		{
	       			window.clearInterval(instance[i]);
	       			settings.callback();
	       			left = 0;
	       		}

	       		var hours = parseInt( left / 3600 ) % 24;
				var minutes = parseInt( left / 60 ) % 60;
				var seconds = parseInt( left % 60 );

				var text = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
	       		$(el).html(text);
			}

			timer();
       		instance[i] = setInterval(timer,1000);

       	});                         
    };
})(jQuery);
//-------------------------------------------------------------------------------
define(["jsrender", "jquery", "functions"], function(){
//-------------------------------------------------------------------------------
	$.views.helpers("window", window);

	$.views.converters("datetime", datetime);
	$.views.converters("safehtml", window.safehtml);
	$.views.converters("escapehtml", window.escapehtml);
	$.views.converters("nl2br", window.nl2br);
	//-------------------------------------------------------------------------------
	function datetime(timestamp){
	//-------------------------------------------------------------------------------
		var time = new Date(timestamp);

		return time.toLocaleDateString() + " " + time.toLocaleTimeString();
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

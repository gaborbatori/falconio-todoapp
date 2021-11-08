//-------------------------------------------------------------------------------
define(["text!./modal.html", "css!./modal.css"], function(tpl, css){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl),
		zIndex = 1000000;

	return {
		open: open
	};
	//-------------------------------------------------------------------------------
	function open(content){
	//-------------------------------------------------------------------------------
		var $modal = $(template.render({ content: content, zIndex: zIndex++ }))
				.appendTo($("body").addClass("has-modals"))
				.on("click", ".close", close);

		//set close to jquery object, so it can close itself on demand
		$modal.close = close;

		//fade in: request next timefrime to add transition after css has been added to DOM (as same timeframe would set transition to end immediately)
		css.done(window.requestAnimationFrame.bind(window, window.requestAnimationFrame.bind(window, $.fn.addClass.bind($modal, "visible"))));

		return $modal;
		//-------------------------------------------------------------------------------
		function close(){
		//-------------------------------------------------------------------------------
			if($("body").children(".modal").length == 1)
				$("body").removeClass("has-modals");

			//fade out, remove from DOM when done
			$modal.removeClass("visible");
			window.setTimeout($.fn.remove.bind($modal), 500);
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
define(["text!./modal.html", "css!./modal.css"], function(tpl){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl),
		zIndex = 1000000;

	return {
		open: open
	};
	//-------------------------------------------------------------------------------
	function open(content){
	//-------------------------------------------------------------------------------
		var $modal = $(template.render({ content: content, zIndex: zIndex++ })).appendTo($("body").addClass("has-modals"));

		$modal.on("click", "button.close", close).close = close;

		return $modal;
		//-------------------------------------------------------------------------------
		function close(){
		//-------------------------------------------------------------------------------
			if($("body").children(".modal").length == 1)
				$("body").removeClass("has-modals");

			$modal.remove();
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

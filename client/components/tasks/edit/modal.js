//-------------------------------------------------------------------------------
define(["modal", "text!./modal.html"], function(modal, tpl){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl);

	return {
		show: show
	};
	//-------------------------------------------------------------------------------
	function show(type, data){
	//-------------------------------------------------------------------------------
		var $defer = $.Deferred(),
			$modal = modal.open(template.render({ type: type, data: data || {} })).on("click", "a.button[name=confirm]", confirm),
			form = {
				$title: $(":input[name=title]", $modal),
				$description: $(":input[name=description]", $modal)
			};

		return $defer.promise();
		//-------------------------------------------------------------------------------
		function confirm(){
		//-------------------------------------------------------------------------------
			var data = {
				title: form.$title.val().trim(),
				description: form.$description.val().trim()
			};

			if(data.title == "")
				return form.$title.addClass("error").one("focus", $().removeClass.bind(form.$title, "error"));

			$defer.resolve(data);
			$modal.close();
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

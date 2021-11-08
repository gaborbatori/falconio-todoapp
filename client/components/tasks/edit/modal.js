//-------------------------------------------------------------------------------
define(["modal", "text!./modal.html", "../api"], function(modal, tpl, api){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl);

	return {
		show: show
	};
	//-------------------------------------------------------------------------------
	function show(type, item){
	//-------------------------------------------------------------------------------
		var $defer = $.Deferred(),
			$modal = modal.open(template.render({ type: type, item: item || {} })).on("click", "a.button[name=confirm]", confirm),
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
				return form.$title.addClass("error").one("focus", $.fn.removeClass.bind(form.$title, "error"));

			//add/edit
			type == "add"
				? api.add($.extend(data, { priority: "1" })).done(done)
				: api.update(item.id, data).done(done);
			//-------------------------------------------------------------------------------
			function done(data){
			//-------------------------------------------------------------------------------
				$defer.resolve(data);
				$modal.close();
			}
			//-------------------------------------------------------------------------------
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

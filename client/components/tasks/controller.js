//-------------------------------------------------------------------------------
define(["./api", "jsrender", "text!./view.html", "text!./items.html"], function(api, jsrender, view, tpl){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl);

	return {
		initialize: initialize
	};

	//-------------------------------------------------------------------------------
	function initialize($container){
	//-------------------------------------------------------------------------------
		$container.empty().html(view).addClass("loading");

		api.get().done(function(data){
			console.log(data);
		}).always($().removeClass.bind($container, "loading"));

		return true;
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

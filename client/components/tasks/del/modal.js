//-------------------------------------------------------------------------------
define(["modal", "text!./modal.html", "../api"], function(modal, tpl, api){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl);

	return {
		show: show
	};
	//-------------------------------------------------------------------------------
	function show(item){
	//-------------------------------------------------------------------------------
		var $defer = $.Deferred(),
			$modal = modal.open(template.render({})).on("click", "a.button[name=confirm]", confirm);

		return $defer.promise();
		//-------------------------------------------------------------------------------
		function confirm(){
		//-------------------------------------------------------------------------------
			api.del(item.id).done(done);
			//-------------------------------------------------------------------------------
			function done(){
			//-------------------------------------------------------------------------------
				$defer.resolve();
				$modal.close();
			}
			//-------------------------------------------------------------------------------
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

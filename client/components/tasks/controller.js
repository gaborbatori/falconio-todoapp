//-------------------------------------------------------------------------------
define(["require", "text!./view.html", "text!./item.html", "./api"], function(require, view, tpl, api){
//-------------------------------------------------------------------------------
	var template = $.templates(tpl);

	return {
		initialize: initialize
	};

	//-------------------------------------------------------------------------------
	function initialize($container){
	//-------------------------------------------------------------------------------
		var $items = $container.html(view)
			.on("click", "button[name=add]", add)
			.on("click", "button[name=del]", del)
			.on("click", "button[name=reload]", load)
			.children("ul");

		return load();
		//-------------------------------------------------------------------------------
		function load(){
		//-------------------------------------------------------------------------------
			return api.get()
				.done(function(data){
					$items.empty().html(template.render(data));
					showMessageIfEmpty();
				});
		}
		//-------------------------------------------------------------------------------
		function add(){
		//-------------------------------------------------------------------------------
			require(["./add/modal"], function(modal){
				modal.open().done(function(data){
					api.add(data).done(function(data){
						$items.children().remove(":not([data-id])").end().append(template.render(data));
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function del(){
		//-------------------------------------------------------------------------------
			var $el = $(this).closest("li");
			require(["./del/modal"], function(modal){
				modal.done(function(){
					api.del($el.attr("data-id")).done(function(){
						$el.remove();
						showMessageIfEmpty();
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function showMessageIfEmpty(){
		//-------------------------------------------------------------------------------
			if(!$items.children().length)
				$items.html("<li>No tasks... Great!</li>");
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

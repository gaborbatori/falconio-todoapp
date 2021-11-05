//-------------------------------------------------------------------------------
define(["require", "text!./view.html", "text!./item.html", "./api"], function(require, view, tpl, api){
//-------------------------------------------------------------------------------
	var items = [],
		template = $.templates(tpl);

	return {
		initialize: initialize
	};

	//-------------------------------------------------------------------------------
	function initialize($container){
	//-------------------------------------------------------------------------------
		var $items = $container.html(view)
			.on("click", "button[name=add]", add)
			.on("click", "button[name=edit]", edit)
			.on("click", "button[name=del]", del)
			.on("click", "button[name=reload]", load)
			.children("ul");

		return load();
		//-------------------------------------------------------------------------------
		function load(){
		//-------------------------------------------------------------------------------
			return api.get().done(function(data){
					items = data;
					$items.empty().html(template.render(items));
					showEmptyMessageIfNone();
				}).fail(function(xhr){ $items.empty().html(xhr.statusText); });
		}
		//-------------------------------------------------------------------------------
		function add(){
		//-------------------------------------------------------------------------------
			require(["./edit/modal"], function(modal){
				modal.open("New").done(function(data){
					api.add(data).done(function(item){
						hideEmptyMessage();
						items.push(item);
						$items.append(template.render(item));
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function edit(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest("li"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); });

			require(["./edit/modal"], function(modal){
				modal.open("Edit", item).done(function(data){
					api.update(item.id, data).done(function(data){
						$.extend(item, data);
						$item.replaceWith(template.render(item));
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function del(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest("li"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); });

			require(["./del/modal"], function(modal){
				modal.open().done(function(){
					api.del($item.attr("data-id")).done(function(){
						items.splice(items.indexOf(item), 1);
						$item.remove();
						showEmptyMessageIfNone();
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function showEmptyMessageIfNone(){
		//-------------------------------------------------------------------------------
			if(!$items.children().length)
				$items.html("<li>No tasks... Great!</li>");
		}
		//-------------------------------------------------------------------------------
		function hideEmptyMessage(){
		//-------------------------------------------------------------------------------
			if($items.children().length == 1)
				$items.children().remove(":not([data-id])");
		}
		//-------------------------------------------------------------------------------
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

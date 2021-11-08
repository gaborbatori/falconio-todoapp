//-------------------------------------------------------------------------------
define(["require", "./api", "text!./view.html", "text!./item.html", "css!./style.css"], function(require, api, view, tpl){
//-------------------------------------------------------------------------------
	var items = [],
		template = $.templates(tpl);

	return {
		initialize: initialize
	};

	//-------------------------------------------------------------------------------
	function initialize($container){
	//-------------------------------------------------------------------------------
		var $view = $container.html(view).children()
				.on("click", "a.button[name=add]", add)
				.on("click", "a.button[name=toggle]", toggle)
				.on("click", "a.button[name=edit]", edit)
				.on("click", "a.button[name=del]", del)
				.on("click", "a.button[name=reload]", load),
			$items = $view.children(".items");

		return load();
		//-------------------------------------------------------------------------------
		function load(){
		//-------------------------------------------------------------------------------
			return api.list().done(function(data){
					items = data;
					$items.empty().html(template.render(items));
					showEmptyMessageIfNone();
				}).fail(function(xhr){ $items.empty().html(xhr.statusText); });
		}
		//-------------------------------------------------------------------------------
		function add(){
		//-------------------------------------------------------------------------------
			require(["./edit/modal"], function(modal){
				modal.show("New").done(function(data){
					api.add($.extend(data, { priority: "1" })).done(function(item){
						hideEmptyMessage();
						items.push(item);
						$items.append(template.render(item));
					});
				});
			});
		}
		//-------------------------------------------------------------------------------
		function toggle(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest(".item"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); }),
				priority = item.priority == "1" ? "0" : "1";

			api.update(item.id, { priority: priority }).done(function(data){
				$.extend(item, data);
				$item.replaceWith(template.render(item));
			});
		}
		//-------------------------------------------------------------------------------
		function edit(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest(".item"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); });

			require(["./edit/modal"], function(modal){
				modal.show("Edit", item).done(function(data){
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
			var $item = $(this).closest(".item"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); });

			require(["./del/modal"], function(modal){
				modal.show().done(function(){
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
				$items.html('<div class="empty"><i class="fas fa-check"></i><h2>Great!</h2>You have no more tasks left…</div>');
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

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
				.on("click", "a.button[name=reload]", load)
				.on("focusin", ".item", function(){ $(this).find("> .title > a").css("opacity", 1); }) //accessibility - buttons remain visible on keyboard navigation
				.on("focusout", ".item", function(){ $(this).find("> .title > a").css("opacity", ""); }), //eof accessibility
			$items = $view.children(".items").addClass("loading");

		return load();
		//-------------------------------------------------------------------------------
		function load(){
		//-------------------------------------------------------------------------------
			return api.list()
				.done(function(data){
					items = data;
					$items.empty().html(template.render(items));
					showEmptyMessageIfNone();
				})
				.fail($.fn.html.bind($items, '<div class="empty">Error while loading list…</div>'))
				.always($.fn.removeClass.bind($items, "loading"));
		}
		//-------------------------------------------------------------------------------
		function add(){
		//-------------------------------------------------------------------------------
			require(["./edit/modal"], function(modal){
				modal.show("add").done(function(item){
					hideEmptyMessage();

					items.push(item);
					$items.append(template.render(item));
				});
			});
		}
		//-------------------------------------------------------------------------------
		function toggle(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest(".item"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); }),
				status = item.status == "completed" ? "incomplete" : "completed";

			api.update(item.id, { status: status }).done(function(data){
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
				modal.show("update", item).done(function(data){
					$.extend(item, data);
					$item.replaceWith(template.render(item));
				});
			});
		}
		//-------------------------------------------------------------------------------
		function del(){
		//-------------------------------------------------------------------------------
			var $item = $(this).closest(".item"),
				item = items.find(function(item){ return item.id == $item.attr("data-id"); });

			require(["./del/modal"], function(modal){
				modal.show(item).done(function(){
					items.splice(items.indexOf(item), 1);
					$item.remove();
					showEmptyMessageIfNone();
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

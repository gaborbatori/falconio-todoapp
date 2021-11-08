requirejs.config({
	baseUrl: "/",
	paths: {
		//lib - core
		jquery: "lib/jQuery/jquery-3.6.0.min",
		jsrender: "lib/jsRender/jsrender-1.0.11.min", css: "core/jsRender/css", text: "core/jsRender/text",

		//helpers
		functions: "helpers/functions",
		modal: "helpers/modal/modal"
	}
});

requirejs(["components/tasks/api", "text!/test/test item.html"], function(api, tpl){
	var $main = $("body > main"),
		template = $.templates(tpl);

	//Add tasks
	var add = {
			items: [
				{ title: "New Task #1" },
				{ title: "New Task #2", description: "Lorem ipsum dolor sit amet" }
			],
			promises: []
		};
	$main.append("<h3>Add Task</h3>");
	add.promises.push(test("Task with only title", JSON.stringify(add.items[0]), api.add.bind(null, add.items[0])));
	add.promises.push(test("Task with description", JSON.stringify(add.items[1]), api.add.bind(null, add.items[1])));

	//Update task
	window.setTimeout(function(){
		$main.append("<h3>Update Task</h3>");
		add.promises[1].done(function(item){
			var data = {
				description: "",
				status: "completed"
			};
			test("Task #2", JSON.stringify(data), api.update.bind(null, item.id, data));
		});
	}, 1000);

	//List tasks
	window.setTimeout(function(){
		$main.append("<h3>List Tasks</h3>");
		test("", "", api.list.bind(null));
	}, 2000);

	//Del tasks
	window.setTimeout(function(){
		var $container = $("<h3>Delete Tasks</h3><div></div><div></div>").appendTo($main);
		$.when.apply(null, add.promises).done(function(item1, item2){
			test("Task #1", JSON.stringify({ id: item1.id }), api.del.bind(null, item1.id), $container.filter("div").eq(0));
			test("Task #2", JSON.stringify({ id: item2.id }), api.del.bind(null, item2.id), $container.filter("div").eq(1));
		});
	}, 3000);
	//-------------------------------------------------------------------------------
	function test(title, request, fn, $container){
	//-------------------------------------------------------------------------------
		var $defer = $.Deferred(),
			$response = $(template.render({
				title: title,
				request: request
			})).appendTo($container || $main).children("[name=response]");

		fn().done(function(data){
				$response.html(JSON.stringify(data));
				$defer.resolve(data);
			}).fail(function(xhr){
				$response.html("FAIL");
				$defer.reject(xhr);
			});

		return $defer.promise();
	}
	//-------------------------------------------------------------------------------
});


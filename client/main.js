requirejs.config({
	baseUrl: "./",
	paths: {
		jquery: "lib/jQuery/jquery-3.6.0.min",
		jsrender: "lib/jsRender/jsrender-1.0.11.min",
		text: "lib/jsRender/text-2.0.16",
	}
});

requirejs(["jquery"], function(){
	require(["components/tasks/controller"], function(component){
		$.when(component.initialize($("body > main"))).then($().removeClass.bind($("body"), "loading"));
	});
});

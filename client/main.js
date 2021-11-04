window.application = {
	provider: {
		host: "http://localhost:1337"
	}
};

requirejs.config({
	baseUrl: "./",
	paths: {
		//lib - core
		jquery: "lib/jQuery/jquery-3.6.0.min",
		jsrender: "lib/jsRender/jsrender-1.0.11.min", css: "core/jsRender/css", text: "core/jsRender/text",

		//helpers
		functions: "helpers/functions",
		modal: "helpers/modal/modal"
	}
});

requirejs(["jquery", "core/jsRender/jsrender", "functions"], function(){
	require(["components/tasks/controller"], function(component){
		$.when(component.initialize($("body > main"))).then($().removeClass.bind($("body"), "loading"));
	});
});

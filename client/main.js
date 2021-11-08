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

requirejs(["core/application"], require.bind(null, ["components/tasks/controller"], function(component){
	component.initialize($("body > main"));
}));

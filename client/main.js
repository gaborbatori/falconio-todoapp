requirejs.config({
	baseUrl: "./",
	paths: {
		jquery: "lib/jQuery/jquery-3.6.0.min",
		jsrender: "lib/jsRender/jsrender-1.0.11.min",
		text: "lib/jsRender/text-2.0.16",
	}
});

requirejs(["jquery"], function(){
	console.log("jquery initialized...");
	
	$("body").removeClass("loading");
});

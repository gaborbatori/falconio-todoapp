//-------------------------------------------------------------------------------
define(["jquery"], function(){
//-------------------------------------------------------------------------------
	return {
		load: load
	};
	//-------------------------------------------------------------------------------
	function load(name, require, onload, config){
	//-------------------------------------------------------------------------------
		$.ajax(require.toUrl(name), { type: "GET", dataType: "text" }).done(onload).fail(onload.error.bind(null));
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

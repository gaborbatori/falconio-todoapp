//-------------------------------------------------------------------------------
define([], function(){
//-------------------------------------------------------------------------------
	var host = "http://localhost:1337";

	return {
		get: get
	};
	//-------------------------------------------------------------------------------
	function get(){
	//-------------------------------------------------------------------------------
		return $.ajax(host + "/tasks", { type: "GET", dataType: "json" });
	}
	//-------------------------------------------------------------------------------
});
//-------------------------------------------------------------------------------

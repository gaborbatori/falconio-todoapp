//-------------------------------------------------------------------------------
define(["jquery"], function(){
//-------------------------------------------------------------------------------
	//focus label's input without defining its `for` property
	$(document).on("click", "label:not([for])", function(){ $(this).next().focus(); });

	//enter triggers href click
	$(document).on("keypress", "a", function(event){
		if(event.keyCode == 13)
			$(this).trigger("click");
	});
});
//-------------------------------------------------------------------------------

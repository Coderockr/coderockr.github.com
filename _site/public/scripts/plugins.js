(function($) {
  $.fn.modal = function() {
  	if($("#floater-overlay").length == 0){
	  	$("body").append('<div id="floater-overlay">');//.attr("id","floater-overlay");
	  	$("body").append('<div id="floater">');

	  	$("#floater").append('<a class="left">').append('<a class="right">').append('<div class="reflex">').append('<div class="frame">');
	  	$("#floater a.left").attr({title:"Anterior",href:"javascript:void(0);"});
	  	$("#floater a.right").attr({title:"Próximo",href:"javascript:void(0);"});
	  	$("#floater-overlay").click(function(){
	  		$("#floater").fadeOut(300, function(){
	  			$("#floater-overlay").fadeOut(200);
	  		});
	  	});

	}
    $(this).click(function(){
    	var rel = $(this).attr("rel");
    	if(rel != ""){
	    	$("#floater").removeClass().addClass(rel);
	    	$("#floater-overlay").fadeIn(300,function(){
	    		console.log("vai");
	    		$("#floater").fadeIn(800);
	    	});
    	}
    });
  }
})(jQuery);


window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



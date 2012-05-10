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
			//var href = $(this).attr("href");
			var href = $(this).parent().find("ul:first");
			if(rel != ""){
		    	$("#floater").removeClass().addClass(rel);
		    	$("#floater .frame").html("");
		    	$("#floater-overlay").fadeIn(300,function(){
		    		$("#floater").fadeIn(800,function(){
					    $("#floater .frame").append(href);
					    $("#floater .frame").fadeIn(300);
					    $("#floater .frame").slideBanners();
						  /*
		  		    	$.ajax({
						  url: href,
						  dataType: "html",
						  success: function(project){
						    $("#floater .frame").html(project);
						    $("#floater .frame").fadeIn(300);
						    $("#floater .frame").slideBanners();
						  }
						});*/
		    		});
		    	});
			}
			return false;
		});
	}
})(jQuery);
(function($) {
	$.fn.slideBanners = function(options) {
		var settings = $.extend( {
				'leftArrow'		: "a.left",
				'rightArrow'	: "a.right",
				'pagination'	: ".pages",
		    	'autoplay'		: false,
			}, options);
		var $gallery		= $(this);
		var identify 	= $gallery.find("ul:first");
		$(identify).css({left:0,position:"absolute"});
		
		var wrapperW	= $gallery.width(),
			childs		= $(identify).children().length,
			childW		= $(identify).children().outerWidth(true);
		$(identify).css("width", (childs * childW));
		
		var width 		= $(identify).width(),
			limite 		= $gallery.width() - width,
			speed 		= childW,
			pages		= Math.round(childs / Math.floor(wrapperW / childW)),
			page		= 1,
			curPage 	= page,
			duration 	= 500;
		
		if($(settings.pagination+" ul li a").length > 0){
			$(settings.pagination+" ul li a").click(function(){
				var toPage = parseInt($(this).parent().attr("id").replace("p",""))-1;
				var goto = -(toPage*childW);
				$(identify).stop().animate({left: goto}, 500);
				$(settings.pagination+" .active").removeClass("active");
				$(settings.pagination+" #"+$(this).parent().attr("id")).addClass("active");
			});
			$(".pages #p1").addClass("active");
		}
		
		if($gallery.find(settings.leftArrow).length>0){
			$gallery.find(settings.leftArrow).bind("click", aLeft);
			$gallery.find(settings.rightArrow).bind("click", aRight);
		}else if($gallery.parent().parent().find(settings.leftArrow).length>0){
			$gallery.parent().parent().find(settings.leftArrow).bind("click", aLeft);
			$gallery.parent().parent().find(settings.rightArrow).bind("click", aRight);
		}
		
		function verify(){
			var pa = $(identify).position().left;
			if(pa > (0 + childW)) { $(identify).stop().animate({left: 0}, duration); }
			if(pa < (limite - childW)) { $(identify).stop().animate({left: limite}, duration); }
		}
		function aLeft(){// anima para esquerda
			stopBanenrs();
			var pa = $(identify).position().left;
			if(pa >= 0){
				$(identify).stop().animate({left: limite}, duration);
				curPage = pages;
				moveVerif = limite;
			} else {
				$(identify).stop().animate({left: "+=" + speed}, duration, verify);
				pa = $(identify).position().left+childW;
				curPage = ((parseInt(pa)*(-1))/childW)+1;
				moveVerif = speed;
			}
			autoPlayBanners();
			$gallery.find(".slide-nav .active").removeClass("active");
			$gallery.find(".slide-nav #p"+curPage+" a").addClass("active");
		}
		function aRight(){// anima para direita
			stopBanenrs();
			var pa = $(identify).position().left;
			var curPage;
			if(pa <= limite){
				$(identify).stop().animate({left: 0}, duration, 'easeInOutCirc');
				curPage = 1;
			} else {
				$(identify).stop().animate({left: "-=" + speed}, duration, 'easeInOutCirc', verify);
				pa = $(identify).position().left-childW;
				curPage = ((parseInt(pa)*(-1))/childW)+1;
			}
			autoPlayBanners();
			$gallery.find(".slide-nav .active").removeClass("active");
			$gallery.find(".slide-nav #p"+curPage+" a").addClass("active");
		}
		function autoPlayBanners(){ // autplay
			if(settings.autoplay){
				autoBanners = setInterval(function(){//autoplay
					aRight();
				}, 8000); // 4 segundos
			}
		}
		function stopBanenrs(){// stop autplay
			if(settings.autoplay){
				autoBanners=window.clearInterval(autoBanners);
			}
		}
		autoPlayBanners();
	}
})(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



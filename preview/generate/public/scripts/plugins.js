(function($) {
	$.fn.modal = function() {
		if($("#floater-overlay").length == 0){
		  	$("body").append('<div id="floater-overlay">');
		  	$("body").append('<div id="floater">');

		  	$("#floater").append('<a class="left">').append('<a class="right">').append('<div class="reflex">').append('<div class="frame" id="projFrame">').append('<a class="close" href="javascript:void(0);">x</a>');
		  	$("#floater a.left").attr({title:"Anterior",href:"javascript:void(0);"});
		  	$("#floater a.right").attr({title:"Próximo",href:"javascript:void(0);"});
		  	$("#floater-overlay, #floater .close").click(function(){
		  		$("#floater").fadeOut(300, function(){
		  			if(parseInt($(document).width()) < 770){
		  				$('html, body').animate({scrollTop: $("a[name='projetos']").offset().top}, 50,function(){
				  			$("#floater-overlay").fadeOut(200);
		  				});
		  			} else {
		  				$("#floater-overlay").fadeOut(200);
		  			}
		  		});
		  	});
		}
	  	$(document).keyup(function(e){
            if(e.which == 27){
				$("#floater").fadeOut(300, function(){
		  			$("#floater-overlay").fadeOut(200);
		  		});
            }
        });
		$(this).click(function(){
			var rel = $(this).attr("rel"),
				href = $(this).parent().find("ul:first").html();
			if(rel != ""){
		    	$("#floater").removeClass().addClass(rel);
		    	$("#floater .frame").html("");
		    	$("#floater-overlay").fadeIn(300,function(){
		    		$("#floater").fadeIn(800,function(){
					    $("#floater .frame").html("<ul>" + href + "</ul>");

					    $("#floater .frame").fadeIn(300, function(){

							if(parseInt($(document).width()) < 770){
								$("#floater .frame ul li").css({width:parseInt($(document).width())});
								var imgH = parseInt( (parseInt($("#floater .frame ul li > img").height()) * parseInt($(document).width()) ) / parseInt($("#floater .frame ul li > img").width()) ),
									imgW = parseInt($(document).width());
								$("#floater .frame ul li > img").css({height:imgH,width:imgW});
								$('html, body').animate({scrollTop: $("a[name='home']").offset().top}, 50);
							}

						    $("#floater .frame").slideBanners();
						    $("#floater .frame").focus();
						    
							//Enable swiping...
							$("#floater .frame ul:first-child").swipe({
								swipe:function(event, direction){
									if(direction == "left"){
										$("#floater .right").click();
									}
									if(direction == "right"){
										$("#floater .left").click();
									}
								},
								threshold:0
							});

	  		    		});
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

/*
 * touchSwipe - jQuery Plugin
 * https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * http://labs.skinkers.com/touchSwipe/
 * http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson (www.skinkers.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * $version: 1.3.1
 */
(function(a){function u(b){if(b&&b.allowPageScroll==undefined&&(b.swipe!=undefined||b.swipeStatus!=undefined))b.allowPageScroll=f;if(!b)b={};b=a.extend({},a.fn.swipe.defaults,b);return this.each(function(){var c=a(this);var d=c.data(s);if(!d){d=new v(this,b);c.data(s,d)}})}function v(t,u){function G(a){a=a.originalEvent;var b,c=n?a.touches[0]:a;w=j;if(n){y=a.touches.length}else{a.preventDefault()}distance=0;direction=null;duration=0;if(!n||y==u.fingers){z.x=A.x=c.pageX;z.y=A.y=c.pageY;C=S();if(u.swipeStatus)b=K(a,w)}else{J(a)}if(b===false){w=m;K(a,w);return b}else{v.bind(p,H);v.bind(q,I)}}function H(a){a=a.originalEvent;if(w==l||w==m)return;var b,c=n?a.touches[0]:a;A.x=c.pageX;A.y=c.pageY;D=S();direction=R();if(n)y=a.touches.length;w=k;N(a,direction);if(y==u.fingers||!n){distance=P();duration=O();if(u.swipeStatus)b=K(a,w,direction,distance,duration);if(!u.triggerOnTouchEnd){var d=!M();if(L()===true){w=l;b=K(a,w)}else if(d){w=m;K(a,w)}}}else{w=m;K(a,w)}if(b===false){w=m;K(a,w)}}function I(a){a=a.originalEvent;a.preventDefault();D=S();distance=P();direction=R();duration=O();if(u.triggerOnTouchEnd||u.triggerOnTouchEnd==false&&w==k){w=l;if((y==u.fingers||!n)&&A.x!=0){var b=!M();if((L()===true||L()===null)&&!b){K(a,w)}else if(b||L()===false){w=m;K(a,w)}}else{w=m;K(a,w)}}else if(w==k){w=m;K(a,w)}v.unbind(p,H,false);v.unbind(q,I,false)}function J(a){y=0;z.x=0;z.y=0;A.x=0;A.y=0;B.x=0;B.y=0;D=0;C=0}function K(a,f){var g;if(u.swipeStatus)g=u.swipeStatus.call(v,a,f,direction||null,distance||0,duration||0);if(f==m){if(u.click&&(y==1||!n)&&(isNaN(distance)||distance==0))g=u.click.call(v,a,a.target)}if(f==l){if(u.swipe){g=u.swipe.call(v,a,direction,distance,duration)}switch(direction){case b:if(u.swipeLeft)g=u.swipeLeft.call(v,a,direction,distance,duration);break;case c:if(u.swipeRight)g=u.swipeRight.call(v,a,direction,distance,duration);break;case d:if(u.swipeUp)g=u.swipeUp.call(v,a,direction,distance,duration);break;case e:if(u.swipeDown)g=u.swipeDown.call(v,a,direction,distance,duration);break}}if(f==m||f==l){J(a)}if(g!==undefined)return g}function L(){if(u.threshold!==null)return distance>=u.threshold;else return null}function M(){var a;if(u.maxTimeThreshold){if(duration>=u.maxTimeThreshold)a=false;else a=true}else{a=true}return a}function N(a,j){if(u.allowPageScroll==f){a.preventDefault()}else{var k=u.allowPageScroll==i;switch(j){case b:if(u.swipeLeft&&k||!k&&u.allowPageScroll!=g)a.preventDefault();break;case c:if(u.swipeRight&&k||!k&&u.allowPageScroll!=g)a.preventDefault();break;case d:if(u.swipeUp&&k||!k&&u.allowPageScroll!=h)a.preventDefault();break;case e:if(u.swipeDown&&k||!k&&u.allowPageScroll!=h)a.preventDefault();break}}}function O(){return D-C}function P(){return Math.round(Math.sqrt(Math.pow(A.x-z.x,2)+Math.pow(A.y-z.y,2)))}function Q(){var a=z.x-A.x;var b=A.y-z.y;var c=Math.atan2(b,a);var d=Math.round(c*180/Math.PI);if(d<0)d=360-Math.abs(d);return d}function R(){var a=Q();if(a<=45&&a>=0)return b;else if(a<=360&&a>=315)return b;else if(a>=135&&a<=225)return c;else if(a>45&&a<135)return e;else return d}function S(){var a=new Date;return a.getTime()}function T(){v.unbind(o,G);v.unbind(r,J);v.unbind(p,H);v.unbind(q,I)}var v=a(t);var w="start";var x=null;var y=0;var z={x:0,y:0};var A={x:0,y:0};var B={x:0,y:0};var C=0;var D=0;var E;try{v.bind(o,G);v.bind(r,J)}catch(F){a.error("events not supported "+o+","+r+" on jQuery.swipe")}this.enable=function(){v.bind(o,G);v.bind(r,J);return v};this.disable=function(){T();return v};this.destroy=function(){T();v.data(s,null);return v}}var b="left",c="right",d="up",e="down",f="none",g="horizontal",h="vertical",i="auto",j="start",k="move",l="end",m="cancel",n="ontouchstart"in window,o=n?"touchstart":"mousedown",p=n?"touchmove":"mousemove",q=n?"touchend":"mouseup",r="touchcancel",s="TouchSwipe";var t={fingers:1,threshold:75,maxTimeThreshold:null,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:true,allowPageScroll:"auto"};a.fn.swipe=function(b){$this=a(this);var c=$this.data(s);if(c&&typeof b==="string"){if(c[b])return c[b].apply(this,Array.prototype.slice.call(arguments,1));else a.error("Method "+b+" does not exist on jQuery.swipe")}else if(!c&&(typeof b==="object"||!b)){return u.apply(this,arguments)}};a.fn.swipe.defaults=t;a.fn.swipe.phases={PHASE_START:j,PHASE_MOVE:k,PHASE_END:l,PHASE_CANCEL:m};a.fn.swipe.directions={LEFT:b,RIGHT:c,UP:d,DOWN:e};a.fn.swipe.pageScroll={NONE:f,HORIZONTAL:g,VERTICAL:h,AUTO:i}})(jQuery)

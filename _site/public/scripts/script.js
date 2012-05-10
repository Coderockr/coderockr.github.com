/* Author: thiago@thiagovieira.com */
$(document).ready(function() {
	var interval=self.setInterval(function(){
		if(window.pageYOffset <= 100)
			$("header nav .home").parent().fadeOut(300);
		else if(window.pageYOffset >= 300)
			$("header nav .home").parent().fadeIn(300);
	},5);
	$("#projects > nav a").not("#projects > nav.pages a").click(function(){
		$("#projects > nav a").addClass("nonselect");
		$(this).removeClass("nonselect");
	});
	$("#projects > nav.pages ul").css({marginLeft:-(parseInt($("#projects > nav.pages ul").width()/2))});
	$("#contact input[type=text], #contact textarea").focus(function(){
		if($(this).val() == ""){
			$(this).parent().find("label").fadeOut(150);
		}		
	}).blur(function(){
		if($(this).val() == ""){
			$(this).parent().find("label").fadeIn(400);
		}		
	});
	$(".ie8 #floater-overlay, .ie7 #floater-overlay, .ie6 #floater-overlay").each(function(){
		alert($(window).width()+" x "+$(window).height())
	});
	sliderBanners("#projects #slider", false, false);
	$("#projects #slider a").modal();
});

function sliderBanners(gallery, autoplay, pagination){
	var identify = gallery+" ul:first";
	$(identify).css({left:0,position:"absolute"});
	
	var wrapperW	= $(gallery).width();
	var childs		= $(identify).children().length;
	var childW		= $(identify).children().outerWidth(true);

	$(identify).css("width", (childs * childW));
	
	var width 		= $(identify).width();
	var limite 		= $(gallery).width() - width;
	var speed 		= childW;
	var pages		= Math.round(childs / Math.floor(wrapperW / childW));
	var page		= 1;
	var curPage = page;
	var duration = 500;
	var autoBanners;
	
	if(pagination){
		$(gallery).append('<ul class="slide-nav"></ul>');
		for(i=1;i<=pages;i++){
			$(gallery+" .slide-nav").append('<li id="p'+i+'"><a href="javascript:void(0);" title="'+i+'"></a></li>');
		}
		$(gallery+" .slide-nav").css({width:parseInt($(gallery+" .slide-nav li").length * $(gallery+" .slide-nav li:first").outerWidth)})
		$(gallery+" .slide-nav").css({marginLeft:"-"+parseInt(parseInt($(gallery+" .slide-nav").width())/2)+"px"})
		$(gallery+" .slide-nav #p"+curPage+" a").addClass("active");
		
		$(gallery+" .slide-nav a").click(function(){
			var toPage = parseInt($(this).parent().attr("id").replace("p",""))-1;
			var goto = -(toPage*childW);
			$(identify).stop().animate({left: goto}, 500);
			$(gallery+" .slide-nav .active").removeClass("active");
			$(gallery+" .slide-nav #"+$(this).parent().attr("id")).addClass("active");
		});
		$(gallery+" .pages #p1").addClass("active");
	}else{
		if($(".pages ul li a").length > 0){
			$(".pages ul li a").click(function(){
				var toPage = parseInt($(this).parent().attr("id").replace("p",""))-1;
				var goto = -(toPage*childW);
				$(identify).stop().animate({left: goto}, 500);
				$(".pages .active").removeClass("active");
				$(".pages #"+$(this).parent().attr("id")).addClass("active");
			});
			$(".pages #p1").addClass("active");
		}
	}
	if($(gallery+" a.nav-left").length>0){
		$(gallery+" a.nav-left").bind("click", aLeft);
		$(gallery+" a.nav-right").bind("click", aRight);
	}else{
		$(gallery).parent().find("a.nav-left").bind("click", aLeft);
		$(gallery).parent().find("a.nav-right").bind("click", aRight);
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
		$(gallery+" .slide-nav .active").removeClass("active");
		$(gallery+" .slide-nav #p"+curPage+" a").addClass("active");
	}
	function aRight(){// anima para direita
		stopBanenrs();
		var pa = $(identify).position().left;
		var curPage;
		if(pa <= limite){
			$(identify).stop().animate({left: 0}, duration);
			curPage = 1;
		} else {
			$(identify).stop().animate({left: "-=" + speed}, duration, verify);
			pa = $(identify).position().left-childW;
			curPage = ((parseInt(pa)*(-1))/childW)+1;
		}
		autoPlayBanners();
		$(gallery+" .slide-nav .active").removeClass("active");
		$(gallery+" .slide-nav #p"+curPage+" a").addClass("active");
	}
	function autoPlayBanners(){ // autplay
		if(autoplay){
			autoBanners = setInterval(function(){//autoplay
				aRight();
			}, 8000); // 4 segundos
		}
	}
	function stopBanenrs(){// stop autplay
		if(autoplay){
			autoBanners=window.clearInterval(autoBanners);
		}
	}
	autoPlayBanners();
}

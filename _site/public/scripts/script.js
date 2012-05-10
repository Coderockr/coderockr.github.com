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

	$("#projects #slider").slideBanners();
	$("#projects #slider a").modal();

	$("header nav a").click(function(){
		var href = $(this).attr("href");
		href = href.replace("#","");
		$('html, body').animate({scrollTop: $("a[name="+href+"]").offset().top}, 1000);
	});
});

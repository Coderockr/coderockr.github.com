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

	$("header nav a, footer nav a, #home nav a").click(function(){
		var href = $(this).attr("href");
		href = href.replace("#","");
		$('html, body').animate({scrollTop: $("a[name="+href+"]").offset().top}, 1000);
		$("header nav").find(".active").removeClass("active");
		$("header nav").find("a[href=#"+href+"]").addClass("active");
	});

	/*on start page*/
	var hash = window.location.href.slice(window.location.href.indexOf('#') + 1);
	if( hash != "" ) $("header nav").find("a[href=#"+hash+"]").addClass("active");

	$("#contact-form")
		.unbind('submit')
		.bind('submit', function(){ 
			var $form = $(this),
                data = ($form.serializeArray());
        	if(data[0].value == "" || data[2].value == "") {
        		alert('Dados inválidos');
        	}
        	else {
	        	$.ajax({
		            url: 'http://lab.coderockr.com/sendEmail.php',
		            type: 'POST',
		            crossDomain: true,
		            data: data,
		            dataType: "json",
		            cache: false,
		            complete: function(){
		            	clearForm();
		            	alert('E-mail enviado. Obrigado pelo contato');

		            }
	        	});
	        }
            return false;
		});
	$("#contact .map-link").bind("click",function(){
		$("#contact div.map").slideToggle(function() {
			window.open($("#contact .map-link").attr("href"),"codemap");
			$("#contact div.map iframe").focus();
		});
		return false;
	});
});

function clearForm()
{
	$('#contact-form').each(function () {
        this.reset();
    });
    // Google Chrome isn't resetting the form throug the reset() method,
    // so we are forcing this here.
    $('#contact-form .reset').click();
}
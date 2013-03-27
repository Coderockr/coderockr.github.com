/* Author: thiago@coderockr.com */
$(document).ready(function() {
	var interval=self.setInterval(function(){
		if(window.pageYOffset <= 100)
			$("header nav .home").parent().fadeOut(300);
		else if(window.pageYOffset >= 300 && parseInt($(document).width())>640)
			$("header nav .home").parent().fadeIn(300);
	},5);
	$("#projetos > nav a").not("#projetos > nav.pages a").click(function(){
		$("#projetos > nav a").addClass("nonselect");
		$(this).removeClass("nonselect");
	});
	$("#projetos > nav.pages ul").css({marginLeft:-(parseInt($("#projetos > nav.pages ul").width()/2))});
	$("#contato label").bind('click',function(){
		$(this).next().focus();
	});
	$("#contato input[type=text], #contato input[type=tel], #contato input[type=email], #contato textarea").focus(function(){
		if($(this).val() == ""){
			$(this).parent().find("label").fadeOut(150);
		}		
	}).blur(function(){
		if($(this).val() == ""){
			$(this).parent().find("label").fadeIn(400);
		}		
	});

	$("#projetos #slider").slideBanners();
	$("#projetos #slider a").modal();

	$("header nav a, footer nav a, #home nav a").click(function(){
		var href = $(this).attr("href");
		href = href.replace("#","");
		if(parseInt($(document).width()) < 770){
			$("#main > section").hide();
			$("#main > section#" + href).show();
		} else {
			$('html, body').animate({scrollTop: $("a[name="+href+"]").offset().top}, 1000);
			$("header nav").find(".active").removeClass("active");
			$("header nav").find("a[href=#"+href+"]").addClass("active");
		}
	});

	/*on start page*/
	var hash = window.location.href.slice(window.location.href.indexOf('#') + 1);
	if( ( parseInt($(document).width()) < 770 ) && ( hash.indexOf("http://") == -1 ) ){
		$("#main > section").hide();
		$("#main > section#" + hash).show();
	} else {
		if( ( hash != "" ) && ( hash.indexOf("http://") == -1 ) ) $("header nav").find("a[href=#"+hash+"]").addClass("active");
	}

	$("#contato-form")
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
	$("#contato .map-link").bind("click",function(){
		var hrefMap = $(this).attr("href");
		$("#contato div.map").slideToggle(function() {
			window.open(hrefMap,"mapa");
			$("#contato div.map iframe").focus();
		});
		return false;
	});
});

function clearForm()
{
	$('#contato-form').each(function () {
        this.reset();
    });
    // Google Chrome isn't resetting the form throug the reset() method,
    // so we are forcing this here.
    $('#contato-form .reset').click();
}
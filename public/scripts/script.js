/* Author: thiago@coderockr.com */
$(document).ready(function() {
	orientation();
	var interval=self.setInterval(function(){
		if(window.pageYOffset <= 100 && !($("body").hasClass("mobile")))
			$("nav#menu .home").parent().fadeOut(300);
		else if( (window.pageYOffset >= 300 && parseInt($(document).width())>640) )
			$("nav#menu .home").parent().fadeIn(300);
		if(parseInt($(document).width()) < 768)
			$(".mobile nav#menu").css({minHeight:$(document).height()})
	},5);
	$("nav#menu a").click(function(){
		$(this).parent().parent().find("li a.active").removeClass("active");
		$(this).addClass("active");
	});

	$(".mobile nav#menu a").click(function(){
		$("#openmenu").attr("checked",false);
		$("html, body").animate({scrollTop: 0}, 1000);
	});
	$("#main, .bt-menu").click(function(){
		hideLanguage();
	});

	$("#projetos > nav a").not("#projetos > nav.pages a").click(function(){
		$("#projetos > nav a").addClass("nonselect");
		$(this).removeClass("nonselect");
		hideLanguage();
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

	$("nav#menu a, footer nav a, #home nav a").click(function(){
		var href = $(this).attr("href");
		href = href.replace("#","");
		if(parseInt($(document).width()) < 768){
			$("#main > section").hide();
			$("#main > section#" + href).show();
		} else {
			$("html, body").animate({scrollTop: $("a[name="+href+"]").offset().top}, 1000);
			$("header nav").find(".active").removeClass("active");
			$("header nav").find("a[href=#"+href+"]").addClass("active");
		}
	});

	/*on start page*/
	var hash = window.location.href.slice(window.location.href.indexOf('#') + 1);
	if( ( parseInt($(document).width()) < 768 ) && ( hash.indexOf("http://") == -1 ) ){
		$("#main > section").hide();
		$("#main > section#" + hash).show();

	}
	if( ( hash != "" ) && ( hash.indexOf("http://") == -1 ) ){
		$("nav#menu").find("a.active").removeClass("active");
		$("nav#menu").find("a[href=#"+hash+"]").addClass("active");
	}
    $(window).resize( function(){
        if(!$("input, select, textarea").is(":focus")){
            orientation();
        }
    });


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
		if($("body").hasClass("mobile")){
			window.open(hrefMap,"_blank");
		} else {
			$("#contato div.map").slideToggle(function() {
				window.open(hrefMap,"mapa");
				$("#contato div.map iframe").focus();
			});
			return false;
		}
	});
	$('div[class=^"language-"] a').bind("click", function(){
		var langValue = $(this).attr("rel");
		createCookie("idioma", langValue, 60);
	});
});
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
function hideLanguage() {
	$('input[name="language"]').attr('checked', false);
}
function orientation() {
	var height = $(window).height();
    var width = $(window).width();
    if(width < 770) {
    	$("body").addClass("mobile");
    	$("nav#menu .home").parent().show();
    	$("nav#menu .home").css({display:"block"});

        if(width>height) {
            $("body").addClass("landscape");
        } else {
            $("body").removeClass("landscape");
        }
    } else {
    	$("body").removeClass("mobile");
    }
}
function clearForm()
{
	$("#contato-form").each(function () {
        this.reset();
    });
    // Google Chrome isn't resetting the form throug the reset() method,
    // so we are forcing this here.
    $("#contato-form .reset").click();
}

/*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */
(function( win ){
   var doc = win.document;
   // If there's a hash, or addEventListener is undefined, stop here
   if( !location.hash && win.addEventListener ){
       //scroll to 1
       win.scrollTo( 0, 1 );
       var scrollTop = 1,
       getScrollTop = function(){
           return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
       },
   
       //reset to 0 on bodyready, if needed
       bodycheck = setInterval(function(){
           if( doc.body ){
               clearInterval( bodycheck );
               scrollTop = getScrollTop();
               win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
           }
       }, 15 );
       
       win.addEventListener( "load", function(){
           setTimeout(function(){
               //at load, if user hasn't scrolled more than 20 or so...
               if( getScrollTop() < 20 ){
                   //reset to hide addr bar at onload
                   win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
               }
           }, 30);
       }, false );
   }
})( this );
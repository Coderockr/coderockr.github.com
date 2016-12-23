'use strict';

var Main = {};

Main = {
  init: function(page){
    switch(page) {
      case 'home':
        Main.initVideo();
        Main.initTestimonials();
        break;
      case 'contact':
        Main.initForm();
        Main.initMap();
        break;
    }
  },

  common: function(){
    // easeOutQuad
    $.easing['jswing'] = $.easing['swing'];

    $.extend($.easing, {
        def: 'easeOutQuad',
        easeInOutExpo: function (x, t, b, c, d) {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
          return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });

    // autoscroll
    $('*[data-autoscroll]').click(function(){
      var target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {
          $('html,body').animate({ scrollTop: target.offset().top }, 1500, 'easeInOutExpo');
          return false;
      }
    });

    // open mobile menu
    $('.menu-trigger').on('click', function (event) {
      event.preventDefault();
      $('#main-content').addClass('move-out');
      $('#menu-mobile').addClass('is-visible');
      $('.shadow-layer').addClass('is-visible');
    });

    // close mobile menu
    $('.close-menu').on('click', function (event) {
      event.preventDefault();
      $('#main-content').removeClass('move-out');
      $('#menu-mobile').removeClass('is-visible');
      $('.shadow-layer').removeClass('is-visible');
    });

    $('#menu-mobile a').on('click', function(event){
      $('.close-menu').click();
    });
  },

  initTestimonials: function(){
    var $fotoramaDiv = $('.fotorama').fotorama({
      autoplay: false,
      shadows: false,
      width: '100%',
      arrows: 'always',
      height: $('.testimonial').height(),
      keyboard: true,
      loop: true,
      click: true,
      preload: 3
    });

    var fotorama = $fotoramaDiv.data('fotorama');

    function positioningFotoramaNav(fotorama){
      var margin = $(fotorama.activeFrame.html).find('header').height() + 29;
      $('.fotorama__nav').css('top', margin + 'px');
    }

    function resizeFotorama(fotorama){
      var newHeight = $(fotorama.activeFrame.html).height();
      fotorama.resize({height: newHeight});
      positioningFotoramaNav(fotorama);
    }

    positioningFotoramaNav(fotorama);

    $(window).resize(function() {
      resizeFotorama(fotorama);
    });

    $('.fotorama').on('fotorama:showend ', function (e, fotorama, extra) {
      resizeFotorama(fotorama);
    });

    $('.fotorama').on('fotorama:show ', function (e, fotorama, extra) {
      positioningFotoramaNav(fotorama);
    });
  },

  initVideo: function(){
    var player = plyr.setup();

    player[0].source({
      type:    'video',
      title:   'Example title',
      poster:  '../images/video-cover.jpg',
      sources: [{
        src:    '../images/video.mp4',
        type:   'video/mp4'
      }]
    });
  },

  initForm: function(){
    $('[name=\'phone\']').mask('99 9999-9999?9',{placeholder:' '});

    var deadline = document.getElementById('deadline');

    noUiSlider.create(deadline, {
      start: [ 6 ],
      connect: [true, false],
      step: 1,
      range: {
        'min': [ 1 ],
        'max': [ 13 ]
      }
    });

    deadline.noUiSlider.on('update', function( values, handle ) {
      var sufix = values[handle] == '1.00' ? ' Mês' : ' Meses',
          months = values[handle].replace('.00', sufix)
            .replace('13 Meses', '12+ Meses');

      $('.deadline label').html(months);
    });

    var budget = document.getElementById('budget');

    noUiSlider.create(budget, {
      start: [ 30, 60 ],
      connect: true,
      step: 1,
      range: {
        'min':   [ 0 ],
        '60%':   [ 100, 100 ],
        '62.5%': [ 125, 125 ],
        '65%':   [ 150, 150 ],
        '67.5%': [ 175, 175 ],
        '70%':   [ 200, 200 ],
        '72.5%': [ 225, 225 ],
        '75%':   [ 250, 250 ],
        '77.5%': [ 275, 275 ],
        '80%':   [ 300, 300 ],
        '82.5%': [ 325, 325 ],
        '85%':   [ 350, 350 ],
        '87.5%': [ 375, 375 ],
        '90%':   [ 400, 400 ],
        '92.5%': [ 425, 425 ],
        '95%':   [ 450, 450 ],
        '97.5%': [ 475, 475 ],
        'max':   [ 500 ]
      }
    });

    budget.noUiSlider.on('change', function ( values, handle ) {
      if ( values[handle] < 30 ) {
        budget.noUiSlider.set(30);
      }
    });

    budget.noUiSlider.on('update', function( values, handle ) {
      var start = values[0].replace('.00', ''),
          end = values[1].replace('.00', ''),
          label = 'R$ ';

      if (start == '500') {
        label = 'Acima de 500K';
      } else {
        label += start + 'K a ' + end + 'K';
      }

      $('.budget label').html(label);
    });

    var validator = $('[name=contactForm]').validate({
      errorPlacement: function(error, element) { },
      'rules': {
        'name': 'required',
        'email': {
          'required': true,
          'email': true
        },
        'phone': 'required',
        'needs[]': 'required',
        'features': 'required',
      },
      submitHandler: function(form, event){
        var needs = [],
            xhrRunning,
            message = {
              success: {
                type: 'success',
                title: 'Recebemos suas informações!',
                text: 'Em breve entraremos em contato.'
              },
              error: {
                type: 'error',
                title: 'Não foi possível processar suas informações :(',
                text: 'Por favor, tente novamente.'
              }
            };

        $('[name=\'needs[]\']:checked').each(function(i){
          needs[i] =$(this).next().html();
        });

        xhrRunning = $.ajax({
          type: 'POST',
          url: 'http://mansanofotografia.com.br/proxy',
          data: {
            'name': $('[name=name]').val(),
            'email': $('[name=email]').val(),
            'company': $('[name=company]').val(),
            'phone': $('[name=phone]').val(),
            'phase': $('[name=phase]:checked').next().html(),
            'needs': needs.join(', '),
            'features_description': $('[name=features]').val(),
            'deadline': $('.deadline .slider label').html(),
            'budget': $('.budget .slider label').html(),
            'description': $('[name=details]').val()
          },
          success: function (data) {
            if (data.length) {
              Main.sweetAlert(message.success);
            } else {
              Main.sweetAlert(message.error);
            }
          },
          error: function (xhr, textStatus, thrownError) {
            Main.sweetAlert(message.error);
          }
        });
      }
    });
  },

  sweetAlert: function(alert){
    swal({
      'type': alert.type,
      'title': alert.title,
      'html': alert.text,
      showCloseButton: true,
    }).catch(swal.noop);
  },

  initMap: function(){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(-26.3009, -48.8463),
      zoomControl: false,
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      panControl: true,
      streetViewControl: false,
      overviewMapControl: true,
      mapTypeId: 'roadmap',
      styles: [
        {
          'elementType': 'labels.text.fill',
          'featureType': 'administrative',
          'stylers': [
            {
              'color': '#444444'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'stylers': [
            {
              'color': '#f2f2f2'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'elementType': 'labels',
          'featureType': 'poi',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi.attraction',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi.business',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'stylers': [
            {
              'saturation': -100
            },
            {
              'lightness': 45
            }
          ]
        },
        {
          'elementType': 'labels.icon',
          'featureType': 'road.arterial',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'stylers': [
            {
              'visibility': 'simplified'
            }
          ]
        },
        {
          'featureType': 'transit',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water',
          'stylers': [
            {
              'color': '#46bcec'
            },
            {
              'visibility': 'on'
            }
          ]
        }
      ]
    });

    (function () {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-26.3012, -48.8508),
        icon: '../images/pin.svg',
        map: map
      });
    })();
  }
}

$(document).ready(function() {
  Main.common();
});

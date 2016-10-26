'use strict';

var UrlAll = null;

var Main = {};

Main = {
  init: function(){
    // Avoid `console` errors in browsers that lack a console.
    (function() {
      var method;
      var noop = function () {};
      var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
      ];

      var length = methods.length;
      var console = (window.console = window.console || {});

      while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
          console[method] = noop;
        }
      }
    }());

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

    if ($('.fotorama').length) {
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

      Main.positioningFotoramaNav(fotorama);

      $(window).resize(function() {
        Main.resizeFotorama(fotorama);
        map.setCenter(center);
      });

      $('.fotorama').on('fotorama:showend ', function (e, fotorama, extra) {
        Main.resizeFotorama(fotorama);
      });
      $('.fotorama').on('fotorama:show ', function (e, fotorama, extra) {
        Main.positioningFotoramaNav(fotorama);
      });
    }


    var html5Slider = document.getElementById('teste');

    noUiSlider.create(html5Slider, {
      start: [ 10, 30 ],
      connect: true,
      range: {
        'min': -20,
        'max': 40
      }
    });


    var rangeSlider = document.getElementById('slider-range');

    noUiSlider.create(rangeSlider, {
      start: [ 4000 ],
      connect: [true, false],
      range: {
        'min': [  2000 ],
        'max': [ 10000 ]
      }
    });

    Main.initMap();

  },

  initMap: function(){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(-26.3009, -48.8463),
      mapTypeId: 'roadmap'
    });

    (function () {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-26.3007, -48.8510),
        icon: '../images/pin.svg',
        map: map
      });
    })();
  },

  resizeFotorama: function(fotorama){
    var newHeight = $(fotorama.activeFrame.html).height();
    fotorama.resize({height: newHeight});
    Main.positioningFotoramaNav(fotorama);
  },

  positioningFotoramaNav: function(fotorama){
    $('.fotorama__nav').css('top', ($(fotorama.activeFrame.html).find('header').height() + 29) +'px');
  }
}

$(document).ready(function() {
  Main.init();
});

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
    }
}

$(document).ready(function() {
    Main.init();
});

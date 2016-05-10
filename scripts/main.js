/**
 * Created by zank on 23/04/16.
 */
var loaded_done = false;
requirejs(["scripts/jquery-2.2.3.min.js","scripts/bootstrap/helpers.js","scripts/webgl/helpers.js","scripts/utility.js"], function (util) {
    console.log('main loaded');
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
});


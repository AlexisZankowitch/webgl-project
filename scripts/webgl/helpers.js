/**
 * Created by zank on 23/04/16.
 */
requirejs(["scripts/webgl/libs/helpers.js"], function (util) {
    console.log('libs loaded');
    requirejs(["scripts/webgl/obj/helpers.js"], function (util) {
        requirejs(["scripts/webgl/global_utility.js"], function () {
            requirejs(["scripts/webgl/interactions.js"], function () {
                requirejs(["scripts/webgl/ldm.js"], function () {
                    console.log("solar system");
                    requirejs(["scripts/webgl/webgl.js"],function(util){
                        console.log('script');
                        $().ready(function () {
                            $('#loader').remove();
                            $('#main-container').removeClass('hidden').animateCss('fadeIn');
                        });
                    });
                });
            });
        });
    });
});
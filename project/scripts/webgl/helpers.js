/**
 * Created by zank on 23/04/16.
 */
requirejs(["scripts/webgl/libs/helpers.js"], function (util) {
    console.log('webgl loaded');
    requirejs(["scripts/webgl/obj/helpers.js"], function (util) {
        requirejs(["scripts/webgl/global_variables.js"], function () {
            requirejs(["scripts/webgl/interactions.js"], function () {
                requirejs(["scripts/webgl/webgl.js"], function () {
                    console.log("script webgl");
                })
            });
        });
    });
});
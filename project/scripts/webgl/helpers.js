/**
 * Created by zank on 23/04/16.
 */
requirejs(["scripts/webgl/libs/helpers.js"], function (util) {
    console.log('webgl loaded');
    requirejs(["scripts/webgl/global_variables.js"], function (util) {
        console.log("global varaibles");
    });
});
/**
 * Created by zank on 23/04/16.
 */
requirejs(["scripts/webgl/obj/3Dobject.js"],function (util) {
    console.log('3dobjects loaded');
    requirejs(["scripts/webgl/obj/utilityFunctions.js"], function(util){
        console.log("utility loaded");
        requirejs([
            "scripts/webgl/obj/grassBall.js",
            "scripts/webgl/obj/sphere.js",
            "scripts/webgl/obj/square.js",
            "scripts/webgl/obj/camera.js",
            "scripts/webgl/obj/triangle.js"],function () {
            console.log("webgl objects loaded");
            loaded_done = true;
        });
    });
});
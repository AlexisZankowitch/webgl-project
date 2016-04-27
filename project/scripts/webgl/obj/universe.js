/**
 * Created by zank on 26/04/16.
 */
Universe.prototype = [];

function Universe() {
    this.skybox = null;
}

Universe.prototype.getItembyType = function (item) {
    var find = false;
    var i = 0;
    while (!find) {
        if (this[i].objectType === item) {
            find = true;
        }
    }
    return find;
};

Universe.prototype.initiateSkybox = function (skybox) {
    this.skybox = new Sphere(null, skybox.radius);
    this.skybox.imgTexture = skybox.texture;
};
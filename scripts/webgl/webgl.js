/**
 * Created by zank on 23/04/16.
 */


function getShader(gl, id)
{
    var shaderScript = document.getElementById(id);
    if (!shaderScript)
    {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k)
    {
        if (k.nodeType == 3)
        {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment")
    {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex")
    {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex")
    {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else
    {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShaders()
{
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
    shaderProgram.pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");
}

function mvPushMatrix()
{
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix()
{
    if (mvMatrixStack.length == 0)
    {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function setMatrixUniforms()
{
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}


//TEXTURES
function initTexture()
{
    var compteur = 0;
    for (var i=0; i<universe.length;i++){
        createTexture(universe[i],universe[i].imgTexture,compteur);
        compteur++;
    }
}

function createTexture(element,src,compteur){
    element.texture = gl.createTexture();
    element.texture.image = new Image();
    element.texture.image.onload = function()
    {
        handleLoadedTexture(element.texture);
        compteur++;
        if(compteur === universe.length-1){
            tex_loaded = true;
        }
    };
    element.texture.image.src = src;
}

function handleLoadedTexture(texture)
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


//INITGL

function drawScene()
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0, pMatrix);
    mat4.identity(mvMatrix);

    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    //ambient lightning
    //gl.uniform3f(shaderProgram.ambientColorUniform,0.2,0.2,0.2);

    mat4.translate(mvMatrix, [camPosX, camPosY, camPosZ]);
    mat4.translate(mvMatrix, [0, 0.0, camPosZ]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    rootObjects.forEach(function (rootObject) {
        rootObject.draw();
    });


}

function initUniverseObjects(universeParam)
{
    universe = new Universe();
    //todo issue when sun 0,0,0 
     for (var i = 0; i < universeParam.length; i++){

         for(var m = 0 ; m < universeParam[i].galaxies.length; m++){
             var galaxies = universeParam[i].galaxies;
             var galaxy = createObject(galaxies[m].object_type,galaxies[m].radius,null);
             galaxy.initObject(galaxies[m]);
             universe.push(galaxy);
             rootObjects.push(galaxy);

             for (var j =0; j< galaxies[m].suns.length; j++){
                 var suns = galaxies[m].suns;
                 var sun = createObject(suns[j].object_type,suns[j].radius,galaxy);
                 sun.initObject(suns[j]);
                 universe.push(sun);

                 var input = '<button type="button" class="btn btn-primary" ' +
                     'data-cam-pos-x="'+ suns[j].translate[0] + ' " ' +
                     'data-cam-pos-y=" '+ suns[j].translate[1] +' " ' +
                     'data-cam-pos-z=" '+ suns[j].translate[2] +' " '+'>'+ suns[j].name +' system</button>';
                 $('#system_cam').append(input);

                 for (var k=0; k<suns[j].planets.length;k++){
                     var planets = suns[j].planets;
                     var planet = createObject(planets[k].object_type,planets[k].radius,sun);
                     planet.initObject(planets[k]);
                     universe.push(planet);

                     for(var l =0; l <  planets[k].moons.length;l++){
                         var moons = planets[k].moons;
                         var moon = createObject(moons[l].object_type,moons[l].radius,planet);
                         moon.initObject(moons[l]);
                         universe.push(moon);
                     }
                 }
             }
         }
    }

    //event buttons
    $('#system_cam').find('button').click(function (e) {
        console.log('aze');
        if(tex_loaded) {
            $('#system_cam').find('button').removeClass('active');
            $(this).addClass('active');
            camPosX = parseInt($(this).attr('data-cam-pos-x')) * -1;
            camPosY = parseFloat($(this).attr('data-cam-pos-y')) * -1;
            camPosZ = parseInt($(this).attr('data-cam-pos-z')) * -1;
            camPosZ -= 10;
        }
    });
}

var createObject = function(type, radius, root){
    switch (type) {
        case 'galaxy':
            return new Sphere(root,radius, type);
            break;
        case 'sun':
            return new Sphere(root,radius, type);
            break;
        case 'planet':
            return new Sphere(root,radius, type);
            break;
    }
};

function animate()
{
    var timeNow = new Date().getTime();
    var elapsed = 0;
    if (lastTime != 0)
    {
        elapsed = timeNow - lastTime;

        rTri += (90 * elapsed) / 1000.0;
        rSquare += (75 * elapsed) / 1000.0;
        rSphere += (50 * elapsed) / 1000.0;
    }
    rootObjects.forEach(function(rootObject){
        rootObject.animate(elapsed);
    });
    lastTime = timeNow;
}

function tick() {
    requestAnimFrame(tick);
    if(tex_loaded){
        //true to draw skybox
        drawScene();
        animate();
    }
}

function webGLStart(universe) {
    //webGL
    //initGL(canvas);
    initShaders();
    rootObject = initUniverseObjects(universe);
    initTexture();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //interactions
    // true to enable interactions
    interaction(true);
    drawStyle = gl.TRIANGLES;
    tick();
}
/**
 * Created by zank on 23/04/16.
 */
//SHADERS

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

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
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
}


//TEXTURES
function initTexture()
{
    for (var i=0; i<objects.length;i++){
        createTexture(i,objects[i].imgTexture);
    }
}

function createTexture(i,src){
    textures[i] = gl.createTexture();
    textures[i].image = new Image();
    textures[i].image.onload = function()
    {
        handleLoadedTexture(textures[i]);
        if(i === objects.length-1){
            tex_loaded = true;
        }
    };
    textures[i].image.src = src;
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

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    mat4.rotate(mvMatrix, -camHeight, [1, 0, 0]);

    mat4.translate(mvMatrix, [camX, 0.0, camZ]);
    mat4.translate(mvMatrix, [0, 0.0, -10.0]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.uniform1i(shaderProgram.samplerUniform, 0);

    rootObjects.forEach(function (rootObject) {
        rootObject.draw();
    });
}

function initWorldObjects()
{
     for (var i = 0; i < univers.length; i++){
         for(var m = 0 ; m < univers[i].galaxies.length; m++){
             var galaxies = univers[i].galaxies;
             var galaxy = createObject(galaxies[m].object_type,galaxies[m].radius,null);
             rootObjects.push(galaxy);
             for (var j =0; j< univers[i].galaxies[m].suns.length; j++){
                 var suns = univers[i].galaxies[m].suns;
                 var sun = createObject(suns[j].object_type,suns[j].radius,galaxy);
                 sun = initObject(sun,suns[j]);
                 //usefull for textures
                 objects.push(sun);
                 for (var k=0; k<suns[j].planets.length;k++){
                     var planets = suns[j].planets;
                     var planet = createObject(planets[k].object_type,planets[k].radius,sun);
                     planet = initObject(planet,planets[k]);
                     objects.push(planet);
                     for(var l =0; l <  planets[k].moons.length;l++){
                         var moons = planets[k].moons;
                         var moon = createObject(moons[l].object_type,moons[l].radius,planet);
                         moon = initObject(moon,moons[l]);
                         objects.push(moon);
                     }
                 }
             }
         }
    }
}

function initObject(obj, objParam){
    obj.imgTexture = objParam.texture;
    obj.translate(objParam.translate);
    obj.orbitParam=objParam.orbit;
    obj.revolutionParam=objParam.revolution;
    return obj;
}

function createObject(type, radius, root){
    switch (type) {
        case 'sphere':
            return new sphere(root,radius);
        break;
    }
}

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
        drawScene();
        animate();
    }
}

function drawTexture() {
    for(var i=0;i<objects.length;i++){
        objects[i].texture = textures[i];
    }
}

function webGLStart() {
    //webGL
    //initGL(canvas);
    initShaders();
    rootObject = initWorldObjects();
    initTexture();
    drawTexture();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //interactions
    // true to enable interactions
    interaction(true);
    drawStyle = gl.TRIANGLES;
    tick();
}

//Star script
webGLStart();


/**
 * Created by zank on 23/04/16.
 */
//GLOBALS
var gl;
var shaderProgram;

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

//textures
var texture0;
var textures = [];

//interaction
var drawStyle;

var userRotationMatrix = mat4.create();
mat4.identity(userRotationMatrix);

var rTri = 0;
var rSquare = 0;
var rSphere = 0;

var lastTime = 0;
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var currentZoom = 1;

var toggleTriangle = true;
var toggleSquare = true;
var toggleSphere = true;

var camPosX = 0;
var camPosY = 0;
var camPosZ = -100;
var camHeight = 0;
//world
var rootObjects = [];
var universe;

//geometry
var pasLat = 3;
var pasLong = 6;
var tetaMax = 360;
var phiMax = 90;

//canvas
var canvas = document.getElementById("scene");

//boolean
var tex_loaded = false;

var skybox;

//init GL
function initGL(canvas)
{
    try
    {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {}
    if (!gl)
    {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

initGL(canvas);


var basePath = "./img/";
var sunsPath = "suns/";
var planetsPath = "planets/";

var getRandIndexes = function (tab) {
    return Math.floor((Math.random() * tab.length));
};

var objectType = {
    'spheres': [
        'galaxy',
        'sun',
        'planet'
    ]
};

var tabTextures = {
    'suns': [
        [
            {
                'texture': basePath + sunsPath + "sun.jpg",
                'lightning': [1.2, 1.2, 1.2]
            }
        ],
        [
            {
                'texture': basePath + sunsPath + "redsun.jpg",
                'lightning': [1.5, 1, 1]
            }
        ],
        [
            {
                'texture': basePath + sunsPath + "sun_yellow.jpg",
                'lightning': [1, 1, 1]
            }
        ],
        [
            {
                'texture': basePath + sunsPath + "bluesun.jpg",
                'lightning': [1, 1, 1.5]
            }
        ]
    ],
    'planets': [
        basePath + planetsPath + "earth.jpg",
        basePath + planetsPath + "jupiter.jpg",
        basePath + planetsPath + "mars.jpg",
        basePath + planetsPath + "mercure.jpg",
        basePath + planetsPath + "moon.gif",
        basePath + planetsPath + "neptune.jpg",
        basePath + planetsPath + "saturn.png",
        basePath + planetsPath + "uranus.png",
        basePath + planetsPath + "venus.jpg"
    ],
    "universe": [
        basePath + "milkyway.jpg"
    ]
};
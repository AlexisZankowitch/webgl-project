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
var toggleSquare= true;
var toggleSphere= true;

var camX = 0;
var camZ = 0;
var camHeight = 0;

//world
var objects = [];
var rootObject;

//geometry
var pasLat = 3;
var pasLong = 6;
var tetaMax = 360;
var phiMax = 90;

//canvas
var canvas = document.getElementById("scene");

//boolean
var tex_loaded = false;
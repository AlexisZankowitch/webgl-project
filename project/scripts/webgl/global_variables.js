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

var sizeSun = 2;

var planets = [{
    'name': 'mercury',
    'texture': "./img/mercure.jpg",
    'translate': [3, 0, 0],
    'rotate': {
        '1': 'Math.PI/12',
        '2': [0, 0, 1]
    },
    'scale': [1, 1, 1],
    'radius' : 0.1,
    'moons':[],
    'orbit': 0.2,
    'revolution': 1.5
}, {
    'name': 'venus',
    'texture': "./img/venus.jpg",
    'translate': [3.5, 0, 0],
    'rotate': {
        '1': 'Math.PI/12',
        '2': [3.5, 0, 1]
    },
    'scale': [1, 1, 1],
    'radius' : 0.13,
    'moons':[],
    'orbit': 0.5,
    'revolution': 0.8
}, {
    'name': 'earth',
    'texture': "./img/earth.jpg",
    'translate': [4.1, 0, 0],
    'rotate': {
        '1': 'Math.PI/12',
        '2': [0, 0, 1]
    },
    'scale': [1, 1, 1],
    'radius' : 0.15,
    'moons' : [
        {
            'name' : 'moon',
            'texture': "./img/moon.gif",
            'translate': [0.2, 0, 0],
            'rotate': {
                '1': 'Math.PI/12',
                '2': [0, 0, 1]
            },
            'scale': [1, 1, 1],
            'radius' : 0.02,
            'orbit' : 1,
            'revolution': 1
        }
    ],
    'orbit': 1,
    'revolution': 1
},
    {
        'name': 'mars',
        'texture': "./img/mars.jpg",
        'translate': [4.5, 0, 0],
        'rotate': {
            '1': 'Math.PI/12',
            '2': [0, 0, 1]
        },
        'scale': [1, 1, 1],
        'radius' : 0.11,
        'moons':[],
        'orbit': 1.2,
        'revolution': 1
    }
    , {
        'name': 'jupiter',
        'texture': "./img/jupiter.jpg",
        'translate': [6.5, 0, 0],
        'rotate': {
            '1': 'Math.PI/12',
            '2': [0, 0, 1]
        },
        'scale': [1, 1, 1],
        'radius' : 0.85,
        'moons':[],
        'orbit': 0.7,
        'revolution': 2
    }, {
        'name': 'saturne',
        'texture': "./img/saturn.png",
        'translate': [9, 0, 0],
        'rotate': {
            '1': 'Math.PI/12',
            '2': [0, 0, 1]
        },
        'scale': [1, 1, 1],
        'radius' : 0.7,
        'moons':[],
        'orbit': 1.5,
        'revolution': 0.5
    }, {
        'name': 'uranus',
        'texture': "./img/uranus.png",
        'translate': [11, 0, 0],
        'rotate': {
            '1': 'Math.PI/12',
            '2': [0, 0, 1]
        },
        'scale': [1, 1, 1],
        'radius' : 0.4,
        'moons':[],
        'orbit': 1,
        'revolution': 1
    }, {
        'name': 'neptune',
        'texture': "./img/neptune.jpg",
        'translate': [12.5, 0, 0],
        'rotate': {
            '1': 'Math.PI/12',
            '2': [0, 0, 1]
        },
        'scale': [1, 1, 1],
        'radius' : 0.5,
        'moons':[],
        'orbit': 1.3,
        'revolution': 0.2
    }
];

//todo change orbit param
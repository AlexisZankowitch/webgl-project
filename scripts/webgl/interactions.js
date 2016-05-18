//interactions
function interaction(bool) {
    if(bool){
        canvas.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
        document.onmousemove = handleMouseMove;
        canvas.onmousewheel = handleWheel;
        window.addEventListener("keydown", handleKeyDown, false);
    }
}

function handleMouseDown(event) {
    mouseDown = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

function handleMouseUp(event) {
    mouseDown = false;
}

function handleMouseMove(event) {
    if (!mouseDown) {
        return;
    }
    var newX = event.clientX;
    var newY = event.clientY;


    var newRotationMatrix = mat4.create();
    mat4.identity(newRotationMatrix);

    var deltaX = newX - lastMouseX;
    mat4.rotate(newRotationMatrix, degToRad(deltaX / 7), [0, 1, 0]);

    var deltaY = newY - lastMouseY;
    mat4.rotate(newRotationMatrix, degToRad(deltaY / 7), [1, 0, 0]);

    mat4.multiply(newRotationMatrix, userRotationMatrix, userRotationMatrix);

    lastMouseX = newX;
    lastMouseY = newY;

}

function handleWheel(event) {
    event.preventDefault();
    currentZoom *= 1 + (event.wheelDelta / Math.abs(event.wheelDelta)) / 10;
}

function handleKeyDown(event) {
    $('#system_cam').find('button').removeClass('active');
    switch (event.keyCode) {
        case 37: //left
            camPosX++;
            break;
        case 39: //right
            camPosX--;
            break;
        case 38: //down
            event.preventDefault();
            camPosZ++;
            break;
        case 40: //forward
            event.preventDefault();
            camPosZ--;
            break;
        case 33: //pageUp
            event.preventDefault();
            camHeight += degToRad(1);
            break;
        case 34: //pageDown
            event.preventDefault();
            camHeight -= degToRad(1);
            break;

        default:

    }
}


function drawCombo(list) {
    drawStyle = list.selectedIndex;
}

function handleClick(checkMesh) {
    switch (checkMesh.value) {
        case 'triangle':
            toggleTriangle = checkMesh.checked;
            break;
        case 'square':
            toggleSquare = checkMesh.checked;
            break;
        case 'Sphere':
            toggleSphere = checkMesh.checked;
            break;
        default:
    }
}

function handleSlider1(sliderValue) {
    //console.log(sliderValue);
}
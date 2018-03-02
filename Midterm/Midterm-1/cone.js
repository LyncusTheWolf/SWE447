var cone = null;
var gl = null;

var canvas = undefined;
//var P = undefined;  // matrix storing the projection transformation
var near = 1.0;     // near clipping plane's distance
var far = 10.0;     // far clipping plane's distance

// Viewing transformation parameters
var V = undefined;
var M = undefined;
var angle = 0.0;
var dAngle = 0.0; //Math.PI / 10.0;
var S = undefined;
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var zvalue = -0.5*(near + far);
var offset = [ 0.0,  0.0, 0.0 ];
var rotationAxis = undefined;
var xAxis = [1, 0, 0];
var yAxis = [0, 1, 0];
var speed = 1;
var stoprotating = 0;

function init() {
    canvas = document.getElementById("webgl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
	
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }
    
    document.getElementById("cBox").onclick = function() {
    /*
        var chk=document.getElementById("cBox").value;
        console.log("Clicked, new value = " + chk); // chk.checked
        if (chk == 0) document.getElementById("cBox").innerHTML = "1";
        //else document.getElementById("cBox").innerHTML = 0;
        //dAngle = 0.0;
    */  
        if(document.getElementById("cBox").checked == true) {
            dAngle = 0.0;
            stoprotating = 1;
        }
        else {
            dAngle = 2.0;
            stoprotating = 0;
        }
    }    
    
    document.getElementById("xButton").onclick = function() {
        rotationAxis = xAxis;

    }
    
    document.getElementById("yButton").onclick = function() {
        rotationAxis = yAxis;
    }    
    
    document.getElementById("slider").onchange = function(event) {
        speed = event.target.value / 10; //100 - event.srcElement.value;
    };
    
    canvas.onmousedown = function handleMouseDown(event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }

    document.onmouseup = function handleMouseUp(event) {
        mouseDown = false;
        if (stoprotating) dAngle = 0.0;
        return;
    }

    document.onmousemove = function handleMouseMove(event) {
		if (!mouseDown) {
		  if(stoprotating) dAngle = 0.0;
		  return;
		}
		var newX = event.clientX;
		var newY = event.clientY;

		var deltaX = newX - lastMouseX;
		var deltaY = newY - lastMouseY;
		dAngle = degToRad(deltaX + deltaY) * Math.PI * 5;
		lastMouseX = newX;
		lastMouseY = newY;
    }   


    document.onkeydown = function handleKeyDown(event) {
        mkey = event.which || event.keyCode;
        switch( mkey ) { // String.fromCharCode(mkey)
            case 33 : zvalue -= 0.05; break; // Page Up
            case 34 : zvalue += 0.05; break; // Page Down
            case 37 : offset = [ -3.0,  0.0, 0.0 ]; break; // Left cursor key
            case 39 : offset = [  3.0,  0.0, 0.0 ]; break; // right cursor key
            case 38 : offset = [ 0.0,  3.0, 0.0 ]; break; // Up cursor key
            case 40 : offset = [ 0.0,  -3.0, 0.0 ]; break; // Down cursor key
            case 27 : offset = [ 0.0,  0.0, 0.0 ]; dAngle = 0; break; // Esc key
            default : /*alert("You pressed the key code = " + mkey);*/ break;
        }    
    }    

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl);
    resize();
	
    window.requestAnimationFrame(render);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    V = translate(0.0, 0.0, zvalue);
    angle += dAngle ;
    //offset = [ -3.0,  3.0, 0.0 ];
    var axis = undefined; //[ 1.0, 1.0, 1.0 ];
    if (rotationAxis != undefined) axis = rotationAxis;
    else axis = [ 1.0, 1.0, 1.0 ];
  
    ms = new MatrixStack();
    ms.push();
    ms.load(V);
    ms.translate(offset);
    ms.rotate((speed * angle), axis);
    ms.scale(1.0, 1.0, 1.0);
    cone.MV = ms.current();
    ms.pop();

    cone.render();
    window.requestAnimationFrame(render);
}

function resize() {
    var width = canvas.clientWidth,
    height = canvas.clientHeight;
    gl.viewport(0, 0, width, height);
    var fovy = 120.0; // degrees
    aspect = width/height;
    cone.P = perspective(fovy, aspect, near, far);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

window.onload = init;
window.onresize = resize;


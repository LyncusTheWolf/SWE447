var canvas;
var cube = null;
var gl = null;
var P;
var time;
var deltaTime;				//Cache time stamps between frames
var rotationSpeed = 50.0;	//In degrees per second around an axis

function init() {
	time = 0.0;
	deltaTime= 0.0;
	
	canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.enable(gl.DEPTH_TEST);
	
	gl.clearColor(0.0, 1.0, 1.0, 1.0);

	cube = new Cube(gl);
	cube.MV = lookAt([0, 1, -5], [0, 0, 0], [0, 1, 0]); //mult();
	
	P = perspective(60, 1, 0.3, 1000);
	window.requestAnimationFrame(render);
	//render();
}

/*function resize(){
	var w = canvas.clientWidth,
		h = canvas.clientHeight;
		
	gl.viewport(0, 0, w, h);
	P = perspective(60, w/h, 0.3, 1000);
}*/

function render(){
	//Clear the buffers
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//Get the time in seconds
	var timeSlice = performance.now() * 0.001
	
	//Obtain the delta in time before the previous frame before overwritting time
	deltaTime = timeSlice - time;
	time = timeSlice; 
	
	//Reassign the perspective here, assume the camera has moved
	cube.P = P;
	
	//Use a normalized skewed angle
	var rotMat = rotate(deltaTime * rotationSpeed, [0.6324, 0.5477, 0.5477]);
	//Add another rotation matrix that slowly rotates around the Y-axis
	var rotMat2 = rotate(deltaTime * rotationSpeed * 0.2, [0.0, 1.0, 0.0]);
	
	cube.MV = mult(mult(cube.MV, rotMat), rotMat2);
	cube.render();
	window.requestAnimationFrame(render);
	//console.log(1 / deltaTime);
}

window.onload = init;
//window.onresize = resize;
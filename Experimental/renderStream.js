var gl = null;
var cube = null;
var time;
var deltaTime;				//Cache time stamps between frames
var viewMatrix;
var camProjMatrix;
var mainLight;

function init() {
	time = 0.0;
	deltaTime= 0.0;
	
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.enable(gl.DEPTH_TEST);
	
	gl.clearColor(0.5, 0.5, 1.0, 1.0);
	
	mainLight = new LightSource();
	mainLight.direction = [-1.0, 1.0, -1.0]

	cube = new Cube(gl);
	
	//Create the view matrix
	viewMatrix = lookAt([0, 1, -5], [0, 0, 0], [0, 1, 0]);
		
	//Load in the camera's view projection
	camProjMatrix = perspective(60, 1, 0.3, 1000);

	window.requestAnimationFrame(render);
}

function render(){		
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//Get the time in seconds
	var timeSlice = performance.now() * 0.001
	
	//Obtain the delta in time before from previous frame before overwritting time for the current frame
	deltaTime = timeSlice - time;
	time = timeSlice;
	
	//mainLight.color = [Math.sin(time * 1.5 * Math.PI + Math.PI), Math.sin(time * 2.0 * Math.PI), Math.sin(time * 3.0 * Math.PI)];
	
	var rotMat = rotate(deltaTime * 15.0, [0.6324, 0.5477, 0.5477]);
	var rotMat2 = rotate(deltaTime * 25.0, [0.0, 1.0, 0.0]);
	cube.worldMatrix = mult(mult(cube.worldMatrix, rotMat), rotMat2);
	cube.render(viewMatrix, camProjMatrix, mainLight);
	window.requestAnimationFrame(render);
}

function resize(){
		
}

window.onload = init;
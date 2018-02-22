var mesh = null;

var time;
var deltaTime;				//Cache time stamps between frames

var viewMatrix;
var camProjMatrix;

function init() {
	time = 0.0;
	deltaTime= 0.0;
	
	console.log("Loading GL");
	
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.enable(gl.DEPTH_TEST);
	
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.FRONT);
	
	gl.clearColor(0.5, 0.5, 1.0, 1.0);
	
	mesh = new MeshObj();
	
	//Create the view matrix
	viewMatrix = lookAt([0, 1, -5], [0, 0, 0], [0, 1, 0]);
		
	//Load in the camera's view projection
	camProjMatrix = perspective(60, 1, 0.3, 1000);
	
	window.requestAnimationFrame(render);	
}

function render(){
	console.log("Executing Render Loop");
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//Get the time in seconds
	var timeSlice = performance.now() * 0.001
	
	//Obtain the delta in time before from previous frame before overwritting time for the current frame
	deltaTime = timeSlice - time;
	time = timeSlice;
	
	var ms = new MatrixStack();

	ms.load(translate(0.0, 0.0, 0.0));
	
	ms.push();
	ms.rotate(time * 45, [0.0, 1.0, 0.0]);
	mesh.render(flatten(ms.current()), viewMatrix, camProjMatrix);
	ms.pop();
	window.requestAnimationFrame(render);
}

window.onload = init;
var canvas;
var cube = null;
var gl = null;
var P;
var time;
var deltaTime;
var rotMat;

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
	var timeSlice = performance.now() * 0.001
	
	//Obtain the delta in time before the previous frame before overwritting time
	deltaTime = timeSlice - time;
	time = timeSlice; 
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	cube.P = P;
	//cube.MV = lookAt([0, 1, -5], [0, 0, 0], [0, 1, 0]); //mult();
	rotMat = rotate(deltaTime * 50.0, [0.6324, 0.5477, 0.5477]);
	
	cube.MV = mult(cube.MV, rotMat);
	cube.render();
	window.requestAnimationFrame(render);
	//console.log(1 / deltaTime);
}

window.onload = init;
//window.onresize = resize;
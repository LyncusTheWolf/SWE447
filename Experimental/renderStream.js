var cone = null;
var cube = null;
var gl = null;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.clearColor(0.0, 1.0, 1.0, 1.0);
	
	//cone = new Cone(gl);
	cube = new Cube(gl);
		
	console.log("Test");
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	cube.render();
	
	/*var loop = function render(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		//cone.render();
		cube.render();
		//requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);*/
}


window.onload = init;
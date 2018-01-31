var cone = null;
//var cube = null;
var gl = null;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.enable(gl.DEPTH_TEST);
	
	gl.clearColor(0.0, 1.0, 1.0, 1.0);
	
	//cone = new Cone(gl);
	cube = new Cube(gl);
	

	//cone.render();

	window.requestAnimationFrame(render);
	/*var loop = function render(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		//cone.render();
		cube.render();
		//requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop);*/
}

function render(){
	//console.log(performance.now());
	var timeDelta = performance.now();
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	cube.render(timeDelta);
	window.requestAnimationFrame(render);
}

function resize(){
		
}

window.onload = init;
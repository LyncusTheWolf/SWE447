var cone = null;
var gl = null;

function init() {
	var canvas = document.getElementById("webgl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	
	if (!gl) { 
		alert("Unable to setup WebGL");
		return;
	}
	
	gl.clearColor(0.0, 1.0, 1.0, 1.0);

	cone = new Cone(gl);
	
	render();
}

function render(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	cone.render();
}

window.onload = init;

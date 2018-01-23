function init(){
	var canvas = document.getElementById("webgl-canvas");
	
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl) { return; }
	
	gl.clearColor(1.0, 0.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function render(){

}

window.onload = init;

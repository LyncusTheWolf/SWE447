var cube = null;
var gl = null;

var near = 1.0;     // near clipping plane's distance
var far = 10.0;     // far clipping plane's distance

// Viewing transformation parameters
var V = undefined;
var M = undefined;
var angle = 0.0;
var dAngle = Math.PI / 10.0;


function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
	
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    // Enable depth test
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);
    // Accept fragment if it closer to the camera than the former one
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var fovy = 60.0; // degrees
    var aspect = w / h;

    cube = new Cube(gl);
    cube.P = perspective(fovy, aspect, near, far);
	
    window.requestAnimationFrame(render);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    V = translate(0.0, 0.0, -0.5*(near + far));
    angle += dAngle;
    offset = [ 0.0,  0.0, 0.0 ]; 
    var axis = [ 1.0, 1.0, 1.0 ];
    M = mult(translate(offset), rotate(angle, axis));

    cube.MV = mult(V, M);
    
    cube.AmbientLight = vec3(0.2, 0.2, 0.2);
  	cube.Light_color = vec3(1.0, 1.0, 1.0);
  	cube.Light_position = vec3(0.0, 0.0, 1.0);
  	cube.Shininess = 40.0;
       
    cube.render();
    window.requestAnimationFrame(render);
    return 0;
}

window.onload = init;

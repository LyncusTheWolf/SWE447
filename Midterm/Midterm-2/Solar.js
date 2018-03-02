/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of planets (each of which is a sphere)
//
// The list of planets to render.  Uncomment any planets that you are 
// including in the scene. For each planet in this list, make sure to 
// set its distance from the Sun, as well its size, color, and orbit
// around the Sun. 

var Planets = {
	Sun : undefined,
	Mercury : undefined,
	Venus : undefined,
	Earth : undefined,
	Moon : undefined,
	Mars : undefined,
	Jupiter : undefined,
	Saturn : undefined,
	Uranus : undefined,
	Neptune : undefined,
	Pluto : undefined
};

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 160;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

//var distanceScalar = 12.0;
var orbitScalar = 50.0;

var orbitShift = 6000;	//An additional shift applied to each planets rotation at the start

var sunPos = new Float32Array([0.0, 0.0, 0.0]);
var ambient = new Float32Array([0.3, 0.3, 0.3]);

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
	canvas = document.getElementById("webgl-canvas");

	// Configure our WebGL environment
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) { alert("WebGL initialization failed"); }

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

	// Initialize the planets in the Planets list, including specifying
	// necesasry shaders, shader uniform variables, and other initialization
	// parameters.  This loops adds additinoal properties to each object
	// in the Planets object;

	for (var name in Planets ) {

		// Create a new sphere object for our planet, and assign it into the
		// appropriate place in the Planets dictionary.  And to simplify the code
		// assign that same value to the local variable "p", for later use.

		var planet = Planets[name] = new Sphere();

		// For each planet, we'll add a new property (which itself is a 
		// dictionary) that contains the uniforms that we will use in
		// the associated shader programs for drawing the planets.  These
		// uniform's values will be set each frame in render().

		planet.uniforms = { 
			color : gl.getUniformLocation(planet.program, "color"),
			MV : gl.getUniformLocation(planet.program, "MV"),
			P : gl.getUniformLocation(planet.program, "P"),
			lightPos : gl.getUniformLocation(planet.program, "lightPos"),
			ambientLight : gl.getUniformLocation(planet.program, "ambientLight")
		};
	}

	resize();

	window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {		
	//time += timeDelta;
	//Obatin time with respect to the current fps;
	time = performance.now() * 0.001 + orbitShift;

	var ms = new MatrixStack();

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Specify the viewing transformation, and use it to initialize the 
	// matrix stack

	//V = translate(0.0, 0.0, -0.5*(near + far));
	V = translate(0.0, 0.0, 0.0);
	ms.load(V);
	
	//Scale up the initial solar system
	//ms.scale(1);

	// Create a few temporary variables to make it simpler to work with
	// the various properties we'll use to render the planets.  The Planets
	// dictionary (created in init()) can be indexed by each planet's name.
	// We'll use the temporary variables "planet" to reference the geometric
	// information (e.g., sphere model) we created in the Planets array.
	// Likewise, we'll use "data" to reference the database of information
	// about the planets in SolarSystem.  Look at how these are
	// used; it'll simplify the work you need to do.

	var name, planet, data;

	name = "Sun";
	planet = Planets[name];
	data = SolarSystem[name];

	// Set PointMode to true to render all the vertices as points, as
	// compared to filled triangles.  This can be useful if you think
	// your planet might be inside another planet or the Sun.  Since the
	// "planet" variable is set for each object, you will need to set this
	// for each planet separately.

	planet.PointMode = false;

	// Use the matrix stack to configure and render a planet.  How you rener
	// each planet will be similar, but not exactly the same.  In particular,
	// here, we're only rendering the Sun, which is the center of the Solar
	// system (and hence, has no translation to its location).

	ms.push();
	ms.scale(data.radius);
	gl.useProgram(planet.program);
	gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
	gl.uniform4fv(planet.uniforms.color, flatten(data.color));
	gl.uniform3fv(planet.uniforms.lightPos, flatten(sunPos));
	gl.uniform3fv(planet.uniforms.ambientLight, flatten(ambient));
	planet.render();
	ms.pop();
	
	renderPlanet("Mercury", ms);
	
	renderPlanet("Venus", ms);
	
	//Utilize the render pipeline for the Earth and it's Moon
	name = "Earth";
	planet = Planets[name];
	data = SolarSystem[name];
	
	planet.PointMode = false;
	
	ms.push();
	ms.rotate(time * orbitScalar / data.year, [0.0, 1.0, 0.0]);
	ms.translate(data.distance, 0, 0);
	ms.push();
	ms.scale(data.radius);
	gl.useProgram(planet.program);
	gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
	gl.uniform4fv(planet.uniforms.color, flatten(data.color));
	gl.uniform3fv(planet.uniforms.lightPos, flatten(sunPos));
	gl.uniform3fv(planet.uniforms.ambientLight, flatten(ambient));
	planet.render();
	ms.pop();
	
	//Borrow some of the transformations for the Earth to render the moon
	name = "Moon";
	planet = Planets[name];
	data = SolarSystem[name];
	
	planet.PointMode = false;
	
	ms.rotate(time * orbitScalar / data.year, [0.0, 1.0, 0.0]);
	ms.translate(data.distance, 0, 0);
	ms.scale(data.radius);
	gl.useProgram(planet.program);
	gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
	gl.uniform4fv(planet.uniforms.color, flatten(data.color));
	gl.uniform3fv(planet.uniforms.lightPos, flatten(sunPos));
	gl.uniform3fv(planet.uniforms.ambientLight, flatten(ambient));
	planet.render();
	ms.pop();

	renderPlanet("Mars", ms);
	
	renderPlanet("Jupiter", ms);
	
	renderPlanet("Saturn", ms);
	
	renderPlanet("Uranus", ms);
	
	renderPlanet("Neptune", ms);

	renderPlanet("Pluto", ms);
		
	window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function renderPlanet(planetName, ms){
	var name = planetName;
	var planet = Planets[name];
	var data = SolarSystem[name];
	
	planet.PointMode = false;
	
	ms.push();
	ms.rotate(time * orbitScalar / data.year, [0.0, 1.0, 0.0]);
	ms.translate(data.distance, 0, 0);
	ms.scale(data.radius);
	gl.useProgram(planet.program);
	gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
	gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
	gl.uniform4fv(planet.uniforms.color, flatten(data.color));
	gl.uniform3fv(planet.uniforms.lightPos, flatten(sunPos));
	gl.uniform3fv(planet.uniforms.ambientLight, flatten(ambient));
	planet.render();
	ms.pop();
}

function resize() {
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;

	gl.viewport(0, 0, w, h);

	var fovy = 60; // degrees
	var aspect = w / h;

	P = perspective(fovy, aspect, near, far);
	
	//Add in a view angle for better viewing
	//P = mult(P, lookAt([0, 0.5*(near + far), 0], [0, 0, -0.5*(near + far)], [0, 1, 0]));
	P = mult(P, lookAt([0.0, 0.3*(near + far), 0.3*(near + far)], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]));
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;
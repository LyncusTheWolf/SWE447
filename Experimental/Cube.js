function Cube(gl, vertexShaderId, fragmentShaderId ) {
	// Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";
	
	this.program = initShaders(gl, vertShdr, fragShdr);
	
	if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
	
	var cubeVertices =
	[
		//X, Y, Z				R, G, B
		0.0, 0.5, 0.0,			/*1.0, 1.0, 0.0,*/
		-0.5, -0.5, 0.0,		/*0.7, 0.0, 1.0,*/
		0.5, -0.5, 0.0,			/*0.9, 1.0, 0.6*/
	];
	
	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
	
	var positionAttribLocation = gl.getAttribLocation(this.program, "vPosition");
	//var colorAttribLocation = gl.getAttribLocation(this.program, "vColor");
	
	
	
	/*gl.vertexAttribPointer(
		colorAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT,
		3 * Float32Array.BYTES_PER_ELEMENT
	);*/
	
	gl.enableVertexAttribArray(positionAttribLocation);
	//gl.enableVertexAttribArray(colorAttribLocation);
		
	this.render = function(){
		gl.useProgram( this.program );
		
		//gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
		
		gl.vertexAttribPointer(
			positionAttribLocation,
			3,
			gl.FLOAT,
			gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		
		gl.drawArrays(gl.POINTS, 0, 3);
		
		console.log("Cube render is called");
	}
}
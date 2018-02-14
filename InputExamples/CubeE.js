
function Cube(gl, vertexShaderId, fragmentShaderId) {
    	var vertShdr = vertexShaderId || "Cube-vertex-shader";
    	var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    	this.program = initShaders(gl, vertShdr, fragShdr);

    	if ( this.program < 0 ) {
        	alert( "Error: Cube shader pipeline failed to compile.\n\n" +
        	    "\tvertex shader id:  \t" + vertShdr + "\n" +
        	    "\tfragment shader id:\t" + fragShdr + "\n" );
        	return; 
    	}

	this.count = 24;
	this.positions = {
		values : new Float32Array([
		    // Front face
		    -1.0, -1.0, 1.0,
		    1.0, -1.0, 1.0,
		    1.0, 1.0, 1.0,
		    -1.0, 1.0, 1.0,

		    // Back face
		    -1.0, -1.0, -1.0,
		    -1.0, 1.0, -1.0,
		    1.0, 1.0, -1.0,
		    1.0, -1.0, -1.0,

		    // Top face
		    -1.0, 1.0, -1.0,
		    -1.0, 1.0, 1.0,
		    1.0, 1.0, 1.0,
		    1.0, 1.0, -1.0,

		    // Bottom face
		    -1.0, -1.0, -1.0,
		    1.0, -1.0, -1.0,
		    1.0, -1.0, 1.0,
		    -1.0, -1.0, 1.0,

		    // Right face
		    1.0, -1.0, -1.0,
		    1.0, 1.0, -1.0,
		    1.0, 1.0, 1.0,
		    1.0, -1.0, 1.0,

		    // Left face
		    -1.0, -1.0, -1.0,
		    -1.0, -1.0, 1.0,
		    -1.0, 1.0, 1.0,
		    -1.0, 1.0, -1.0
		]),
		numComponents : 3 // 3 components for each
		// position (3D coords)
	};
	this.colors = {
		values : new Float32Array([
		    1.0, 1.0, 1.0, 1.0,    // Front face: white
		    1.0, 1.0, 1.0, 1.0,    // Front face: white
		    1.0, 1.0, 1.0, 1.0,    // Front face: white
		    1.0, 1.0, 1.0, 1.0,    // Front face: white
		    
		    1.0, 0.0, 0.0, 1.0,    // Back face: red
		    1.0, 0.0, 0.0, 1.0,    // Back face: red
		    1.0, 0.0, 0.0, 1.0,    // Back face: red
		    1.0, 0.0, 0.0, 1.0,    // Back face: red
		    
		    0.0, 1.0, 0.0, 1.0,    // Top face: green
		    0.0, 1.0, 0.0, 1.0,    // Top face: green
		    0.0, 1.0, 0.0, 1.0,    // Top face: green
		    0.0, 1.0, 0.0, 1.0,    // Top face: green
		    
		    0.0, 0.0, 1.0, 1.0,    // Bottom face: blue
		    0.0, 0.0, 1.0, 1.0,    // Bottom face: blue
		    0.0, 0.0, 1.0, 1.0,    // Bottom face: blue
		    0.0, 0.0, 1.0, 1.0,    // Bottom face: blue
		    
		    1.0, 1.0, 0.0, 1.0,    // Right face: yellow
		    1.0, 1.0, 0.0, 1.0,    // Right face: yellow
		    1.0, 1.0, 0.0, 1.0,    // Right face: yellow
		    1.0, 1.0, 0.0, 1.0,    // Right face: yellow
		    
		    1.0, 0.0, 1.0, 1.0,     // Left face: purple
		    1.0, 0.0, 1.0, 1.0,     // Left face: purple
		    1.0, 0.0, 1.0, 1.0,     // Left face: purple
		    1.0, 0.0, 1.0, 1.0     // Left face: purple
		]),
		numComponents : 4 
	};

	this.indices = {
		values : new Uint16Array([ 
		    0, 1, 2,        0, 2, 3,        // front
		    4, 5, 6,        4, 6, 7,        // back
		    8, 9, 10,       8, 10, 11,      // top
		    12, 13, 14,     12, 14, 15,     // bottom
		    16, 17, 18,     16, 18, 19,     // right
		    20, 21, 22,     20, 22, 23      // left
		  ])
	};

	// positions
    	this.positions.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	//gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.positions.values), gl.STATIC_DRAW );
	gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
    	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    	gl.enableVertexAttribArray( this.positions.attributeLoc );

	// colors
    	this.colors.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	//gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.colors.values), gl.STATIC_DRAW );
	gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );

    	this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    	gl.enableVertexAttribArray( this.colors.attributeLoc );


	// indices
    	this.indices.buffer = gl.createBuffer();
    	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

	this.uniforms = {
	  MV : undefined,
	  P : undefined
	};

	this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");

  	this.MV = mat4(); // or undefined
  	this.P = mat4();

	this.render = function () {
        	gl.useProgram( this.program );
        	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );

       
        	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
        	gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );


        	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

		gl.uniformMatrix4fv( this.uniforms.MV, gl.FALSE, flatten(this.MV) );
		gl.uniformMatrix4fv( this.uniforms.P, gl.FALSE, flatten(this.P) );


		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);

	};

};


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


	gl.useProgram(this.program);
	this.count = 4;

	this.positions = {
		values : new Float32Array([
		    //Top
			0.5, 0.5, 0.5,		//Vertex 0
			0.5, 0.5, -0.5,		//Vertex 1
			-0.5, 0.5, 0.5,		//Vertex 2
			-0.5, 0.5, -0.5,	//Vertex 3
			
			//Bottom
			0.5, -0.5, 0.5,		//Vertex 4
			0.5, -0.5, -0.5,	//Vertex 5
			-0.5, -0.5, 0.5,	//Vertex 6
			-0.5, -0.5, -0.5,	//Vertex 7
			
			//Front
			0.5, 0.5, -0.5,		//Vertex 8
			0.5, -0.5, -0.5,	//Vertex 9
			-0.5, 0.5, -0.5,	//Vertex 10
			-0.5, -0.5, -0.5,	//Vertex 11
			
			//Back
			0.5, 0.5, 0.5,		//Vertex 12
			0.5, -0.5, 0.5,		//Vertex 13
			-0.5, 0.5, 0.5,		//Vertex 14
			-0.5, -0.5, 0.5,	//Vertex 15
			
			//Right
			0.5, 0.5, 0.5,		//Vertex 16
			0.5, 0.5, -0.5,		//Vertex 17
			0.5, -0.5, 0.5,		//Vertex 18
			0.5, -0.5, -0.5,	//Vertex 19
			
			//Left
			-0.5, 0.5, 0.5,		//Vertex 20
			-0.5, 0.5, -0.5,	//Vertex 21
			-0.5, -0.5, 0.5,	//Vertex 22
			-0.5, -0.5, -0.5	//Vertex 23
		]),
		numComponents : 3 // 3 components for each position
	};
	this.colors = {
		values : new Float32Array([
			//Top
		    1.0, 0.0, 0.0, 
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
		    1.0, 0.0, 0.0,
			
			//Bottom
			0.25, 0.75, 1.0, 
		    0.25, 0.75, 1.0, 
			0.25, 0.75, 1.0, 
			0.25, 0.75, 1.0, 
			
			//Front
			0.5, 0.0, 0.5, 
		    0.5, 0.0, 0.5,
			0.5, 0.0, 0.5,
			0.5, 0.0, 0.5,
			
			//Back
			1.0, 1.0, 1.0, 
		    1.0, 1.0, 1.0,
			1.0, 1.0, 1.0, 
			1.0, 1.0, 1.0, 
			
			//Right
			0.25, 0.25, 0.5, 
		    0.25, 0.25, 0.5,
		    0.25, 0.25, 0.5,
		    0.25, 0.25, 0.5,
			
			//Left
			0.0, 0.75, 0.25, 
		    0.0, 0.75, 0.25,
			0.0, 0.75, 0.25, 
			0.0, 0.75, 0.25
		]),
		numComponents : 3 
	};
    this.indices = {
		values : new Uint16Array([
			//Top
			1, 2, 3,
			1, 0, 2,
			
			//Bottom
			4, 5, 7,
			4, 7, 6,
			
			//Front
			9, 8, 10,
			9, 10, 11,
			
			//Back
			12, 13, 15,
			12, 15, 14,
			
			//Right
			17, 18, 16,
			17, 19, 18,
			
			//Left
			20, 23, 21,
			20, 22, 23
		])
    };
	
	this.MV = mat4();
	this.P = mat4();	
	
	this.uniforms = {
		MV : undefined,
		P : undefined
	};
	
	// positions	
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );

	// colors
    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );
    this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    gl.enableVertexAttribArray( this.colors.attributeLoc );
    
	// indices
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
	
	//Uniforms
	this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");
    

	this.render = function () {
    	gl.useProgram( this.program );
    	//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		//var ms = new MatrixStack();
		
		//ms.load(V)
		
		gl.uniformMatrix4fv(this.uniforms.MV, gl.FALSE, flatten(this.MV));
		gl.uniformMatrix4fv(this.uniforms.P, gl.FALSE, flatten(this.P));

    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	gl.vertexAttribPointer( 
			this.positions.attributeLoc, 
			this.positions.numComponents,
        	gl.FLOAT, 
			gl.FALSE, 
			3 * Float32Array.BYTES_PER_ELEMENT, 
			0 
		);

           
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	gl.vertexAttribPointer( 
			this.colors.attributeLoc, 
			this.colors.numComponents,
        	gl.FLOAT, 
			gl.FALSE, 
			3 * Float32Array.BYTES_PER_ELEMENT, 
			0 
		);
	
        //gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
		//var start = 0;
		//var count = this.count;
		//gl.drawArrays(gl.TRIANGLE_STRIP, start, count); // TRIANGLE_STRIP
		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
	};

};
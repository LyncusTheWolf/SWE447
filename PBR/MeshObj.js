function MeshObj(){
	var vertShdr = "PBR-vertex-shader";
	var fragShdr = "PBR-fragment-shader";

	this.program = initShaders(gl, vertShdr, fragShdr);
		
	if ( this.program < 0 ) {
    	alert( "Error: Cube shader pipeline failed to compile.\n\n" +
    	    "\tvertex shader id:  \t" + vertShdr + "\n" +
    	    "\tfragment shader id:\t" + fragShdr + "\n" );
    	return; 
	}
	
	gl.useProgram( this.program );
	
	this.positions = {
		values : new Float32Array([
			0.5, 0.5, 0.0,
			-0.5, 0.5, 0.0,
			0.5, -0.5, 0.0,
			-0.5, -0.5, 0.0
		]),
		numComponents : 3
	};
	
	this.indices = {
		values : new Uint16Array([
			0, 1, 2,
			1, 3, 2
		])
	};
	
	this.uniforms = {
		ModelMatrix : undefined,
		ViewMatrix : undefined,
		ProjMatrix : undefined
	}
	
	//Positions
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPos" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );
	
	// indices
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
	
	//Uniforms
	this.uniforms.ModelMatrix = gl.getUniformLocation(this.program, "mWorld");
	this.uniforms.ViewMatrix = gl.getUniformLocation(this.program, "mView");
	this.uniforms.ProjMatrix = gl.getUniformLocation(this.program, "mProj");
	
	this.render = function(worldMatrix, viewMatrix, projMatrix){
		gl.useProgram( this.program );
		
		gl.uniformMatrix4fv(this.uniforms.ModelMatrix, gl.FALSE, flatten(worldMatrix));
		gl.uniformMatrix4fv(this.uniforms.ViewMatrix, gl.FALSE, flatten(viewMatrix));
		gl.uniformMatrix4fv(this.uniforms.ProjMatrix, gl.FALSE, flatten(projMatrix));
		
		//Rebind position values
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	gl.vertexAttribPointer( 
			this.positions.attributeLoc, 
			this.positions.numComponents,
        	gl.FLOAT, 
			gl.FALSE, 
			3 * Float32Array.BYTES_PER_ELEMENT, 
			0 
		);
		
		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
	}
}
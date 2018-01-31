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
		0.0, 0.5, 0.0,			1.0, 1.0, 0.0,
		-0.5, -0.5, 0.0,		0.7, 0.0, 1.0,
		0.5, -0.5, 0.0,			0.2, 0.2, 0.6
	];
	
	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
	
	var positionAttribLocation = gl.getAttribLocation(this.program, "vPosition");
	var colorAttribLocation = gl.getAttribLocation(this.program, "vColor");	
			
	gl.vertexAttribPointer(
		positionAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT,
		0
	);
	
	gl.vertexAttribPointer(
		colorAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT,
		3 * Float32Array.BYTES_PER_ELEMENT
	);
	
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

	gl.useProgram( this.program );
					
	var matWorldUniformLocation = gl.getUniformLocation(this.program, "mWorld");
	var matViewUniformLocation = gl.getUniformLocation(this.program, "mView");
	var matProjUniformLocation = gl.getUniformLocation(this.program, "mProj");
	
			
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), 1, 0.1, 1000.0);
	
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	
	this.render = function(timeDelta){
		//Make the gpu point to this programs respective shader
		gl.useProgram( this.program );
		
		//Moved assignment of buffer data to outside of the render loop
		//var matWorldUniformLocation = gl.getUniformLocation(this.program, "mWorld");
		//var matViewUniformLocation = gl.getUniformLocation(this.program, "mView");
		//var matProjUniformLocation = gl.getUniformLocation(this.program, "mProj");
				
		//var worldMatrix = new Float32Array(16);
		//var viewMatrix = new Float32Array(16);
		//var projMatrix = new Float32Array(16);
		
		//mat4.identity(worldMatrix);
		//mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
		//mat4.perspective(projMatrix, glMatrix.toRadian(45), 1, 0.1, 1000.0);
		
		//gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		//gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		//gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
		
		/*for(var i = 0; i < cubeVertices.length; i++){
			cubeVertices[i] += timestamp;
		}*/
		
		angle = timeDelta / 1000 / 6 * 2 * Math.PI;

		mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);
		
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		
		//gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

		
		gl.drawArrays(gl.TRIANGLES, 0, 3);
		
		console.log("Cube render is called: " + angle);
	}
}
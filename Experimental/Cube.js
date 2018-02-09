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
			1.0, 1.0, 1.0,		//Vertex 0
			1.0, 1.0, -1.0,		//Vertex 1
			-1.0, 1.0, 1.0,		//Vertex 2
			-1.0, 1.0, -1.0,	//Vertex 3
			
			//Bottom
			1.0, -1.0, 1.0,		//Vertex 4
			1.0, -1.0, -1.0,	//Vertex 5
			-1.0, -1.0, 1.0,	//Vertex 6
			-1.0, -1.0, -1.0,	//Vertex 7
			
			//Front
			1.0, 1.0, 1.0,		//Vertex 12
			1.0, -1.0, 1.0,		//Vertex 13
			-1.0, 1.0, 1.0,		//Vertex 14
			-1.0, -1.0, 1.0,	//Vertex 15
			
			//Back
			1.0, 1.0, -1.0,		//Vertex 8
			1.0, -1.0, -1.0,	//Vertex 9
			-1.0, 1.0, -1.0,	//Vertex 10
			-1.0, -1.0, -1.0,	//Vertex 11						
			
			//Right
			1.0, 1.0, 1.0,		//Vertex 16
			1.0, 1.0, -1.0,		//Vertex 17
			1.0, -1.0, 1.0,		//Vertex 18
			1.0, -1.0, -1.0,	//Vertex 19
			
			//Left
			-1.0, 1.0, 1.0,		//Vertex 20
			-1.0, 1.0, -1.0,	//Vertex 21
			-1.0, -1.0, 1.0,	//Vertex 22
			-1.0, -1.0, -1.0	//Vertex 23
		]),
		numComponents : 3 // 3 components for each position
	};
	this.normals = {
		values : new Float32Array([
			//Top
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			
			//Bottom
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			0.0, -1.0, 0.0,
			
			//Front
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
			
			//Back
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			
			//Right
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			
			//Left
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0			
		]),
		numComponents : 3
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
			
			//Back
			0.5, 0.0, 0.5, 
		    0.5, 0.0, 0.5,
			0.5, 0.0, 0.5,
			0.5, 0.0, 0.5,
			
			//Front
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
    this.uvs = {
		values : new Float32Array([
			//Top
			0.0, 0.0,
			0.0, 1.0,
			1.0, 0.0,			
			1.0, 1.0,
			
			//Bottom
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			
			//Front
			0.0, 0.0,
			0.0, 1.0,
			1.0, 0.0,			
			1.0, 1.0,
			
			//Back
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			
			//Right
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0,
			
			//Left
			0.0, 0.0,
			1.0, 0.0,
			0.0, 1.0,
			1.0, 1.0
		]),
		numComponents : 2
	};
	this.indices = {
		values : new Uint16Array([
			//Top
			1, 3, 2,
			1, 2, 0,
			
			//Bottom
			4, 7, 5,
			4, 6, 7,
			
			//Front
			8, 11, 9,
			8, 10, 11,
			
			//Back
			13, 14, 12,
			13, 15, 14,						
			
			//Right
			17, 16, 18,
			17, 18, 19,
			
			//Left
			20, 21, 23,
			20, 23, 22
		])
    };
	
	var texture = null;
	var textureHasLoaded = false;
	
	diffuseTexture = gl.createTexture();
	
	diffuseTexture.image = new Image();

	diffuseTexture.image.onload = function(){
		handleTextureLoad(diffuseTexture);
		//console.log("I have been loaded");
	}
	
	function handleTextureLoad(texture){
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
		textureHasLoaded = true;
	}
	
	diffuseTexture.image.crossOrigin = "Use-Credentials";
	//TODO: Figure out how to handle CORS domain errors later
	//Utilize: --allow-file-access-from-files
	diffuseTexture.image.src = "img/Box_Diffuse.png";
	
	this.worldMatrix = mat4(1);
	
	this.uniforms = {
		ModelMatrix : undefined,
		ViewMatrix : undefined,
		ProjMatrix : undefined,
		AmbientLight : undefined,
		LightDirection : undefined,
		LightMainColor : undefined,
		Diffuse : undefined
	};
	
	// positions	
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );
	
	this.normals.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.normals.buffer );
	gl.bufferData( gl.ARRAY_BUFFER, this.normals.values, gl.STATIC_DRAW );
	this.normals.attributeLoc = gl.getAttribLocation(this.program, "vNormal" );
	gl.enableVertexAttribArray( this.normals.attributeLoc );

	// colors
    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );
    this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    gl.enableVertexAttribArray( this.colors.attributeLoc );
	
	// uvs
	this.uvs.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.uvs.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.uvs.values, gl.STATIC_DRAW );
	this.uvs.attributeLoc = gl.getAttribLocation( this.program, "vUV" );
	gl.enableVertexAttribArray( this.uvs.attributeLoc );
    
	// indices
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
	
	//Uniforms
	this.uniforms.ModelMatrix = gl.getUniformLocation(this.program, "mWorld");
	this.uniforms.ViewMatrix = gl.getUniformLocation(this.program, "mView");
	this.uniforms.ProjMatrix = gl.getUniformLocation(this.program, "mProj");
	this.uniforms.AmbientLight = gl.getUniformLocation(this.program, "ambientLighting");
	this.uniforms.LightDirection = gl.getUniformLocation(this.program, "lightDir");
	this.uniforms.LightMainColor = gl.getUniformLocation(this.program, "lightCol");
	
	//gl.uniform3f(this.uniforms.AmbientLight, 0.9, 1.0, 1.0);

	this.render = function (viewMatrix, projMatrix, mainLight) {
    	gl.useProgram( this.program );
		
		//Assign all the uniforms
		gl.uniformMatrix4fv(this.uniforms.ModelMatrix, gl.FALSE, flatten(this.worldMatrix));
		gl.uniformMatrix4fv(this.uniforms.ViewMatrix, gl.FALSE, flatten(viewMatrix));
		gl.uniformMatrix4fv(this.uniforms.ProjMatrix, gl.FALSE, flatten(projMatrix));
		
		gl.uniform3f(this.uniforms.AmbientLight, 0.3, 0.3, 0.3);
		gl.uniform3f(this.uniforms.LightDirection, mainLight.direction[0], mainLight.direction[1], mainLight.direction[2]);
		gl.uniform3f(this.uniforms.LightMainColor, mainLight.color[0], mainLight.color[1], mainLight.color[2]);

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

		//Rebind normal values
		gl.bindBuffer( gl.ARRAY_BUFFER, this.normals.buffer );
		gl.vertexAttribPointer(
			this.normals.attributeLoc,
			this.normals.numComponents,
			gl.FLOAT,
			gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
        
		//Rebind color values		
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	gl.vertexAttribPointer( 
			this.colors.attributeLoc, 
			this.colors.numComponents,
        	gl.FLOAT, 
			gl.FALSE, 
			3 * Float32Array.BYTES_PER_ELEMENT, 
			0 
		);
		
		//Rebind uv values		
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.uvs.buffer );
    	gl.vertexAttribPointer( 
			this.uvs.attributeLoc, 
			this.uvs.numComponents,
        	gl.FLOAT, 
			gl.FALSE, 
			2 * Float32Array.BYTES_PER_ELEMENT, 
			0 
		);
		
		if(textureHasLoaded){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, diffuseTexture);
			gl.uniform1i(this.uniforms.Diffuse, 0);
		}

		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
	};

};
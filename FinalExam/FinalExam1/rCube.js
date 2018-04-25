
var mixedTextures = 0; // 1 to have 6 different images (one per face of the cube)

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
   	
	this.positions = {
		values : new Float32Array([
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
		]),
		numComponents : 3 // 3 components for each
		// position (3D coords)
	};
	/*this.colors = {
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
	};*/
	
	this.indices = {
		values : new Uint16Array([ 
		    0, 1, 2,        0, 2, 3,        // front
		    4, 5, 6,        4, 6, 7,        // back
		    8, 9, 10,       8, 10, 11,      // top
		    12, 13, 14,     12, 14, 15,     // bottom
		    16, 17, 18,     16, 18, 19,     // right
		    20, 21, 22,     20, 22, 23      // left
		  ]),
    };

    if(mixedTextures == 1) {    
	    this.textures = { // texture coords with 6 images (one per cube face)
		    values : new Float32Array([ 
            // select the bottom left image
            0.0   , 0.0  ,
            0.25   , 0.0,
            0.25, 0.25  ,
            0   , 0.25,
            // select the bottom middle image
            0.25, 0.0  ,
            0.5 , 0.0  ,
            0.5, 0.5,
            0.25, 0.5,
            // select to bottom right image
            0.5 , 0.0  ,
            0.75 , 0.0,
            0.75, 0.5  ,
            0.5 , 0.5,
            // select the top left image
            0   , 0.5,
            0.25, 0.5,
            0.25 , 1.0,
            0   , 1.0  ,
            // select the top middle image
            0.25, 0.5,
            0.5, 0.5 ,
            0.5 , 1.0,
            0.25, 1.0  ,
            // select the top right image
            0.5 , 0.5,
            0.75, 0.5,
            0.75 , 1.0  ,
            0.5 , 1.0 
            ]),
		    numComponents : 2 
	    }; 
    }	
    else {	 
	    this.textures = { // texture coords
		    values : new Float32Array([ 
                // Front
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Back
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Top
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Bottom
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Right
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
                // Left
                0.0,  0.0,
                1.0,  0.0,
                1.0,  1.0,
                0.0,  1.0,
		    ]),
		    numComponents : 2 
	    };
    }	


	this.initTexture = function () {
        texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function () {
            handleLoadedTexture (texImage, texture);
        }
        if(mixedTextures == 0)
            texImage.src = "leaves.jpg"; //"monkey.png"; //"noodles.jpg" "5.jpg" "3.jpg" "2.jpg" "1.jpg" "thumb.png"; "cubetexture.png" "mud.gif"
        else texImage.src = "noodles.jpg"; 
            
    }


    // positions
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );


    // Texture
    this.initTexture();
    
    this.textures.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
    gl.bufferData( gl.ARRAY_BUFFER, this.textures.values, gl.STATIC_DRAW );
    this.textures.attributeLoc = gl.getAttribLocation( this.program, "aTextureCoord" );
	gl.enableVertexAttribArray(this.textures.attributeLoc);


    // indices
	this.indices.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );


	this.uniforms = {
	  MV : undefined,
	  P : undefined,
	  uSampler: gl.getUniformLocation(this.program, 'uSampler'),
	  TextureSize: gl.getUniformLocation(this.program, 'uTextureSize'),
	  kernelLocation: gl.getUniformLocation(this.program, 'ukernel[0]'),
	  kernelWeightLocation: gl.getUniformLocation(this.program, 'ukernelWeight')
	};

	this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");

  	this.MV = mat4(); // or undefined
  	this.P = mat4();
	var normalKernel = [
		0, 0, 0,
		0, 1, 0,
		0, 0, 0
	]
	
  	/*var edgeDetectKernel = [
     -1, -1, -1,
     -1,  8, -1,
     -1, -1, -1
    ];
	
	var blurKernel = [
		1, 1, 1,
		1, 1, 1,
		1, 1, 1
	]*/
	
	this.inUseKernal = normalKernel;
	
	/*this.setKernel = function (newKernel) {
		inUseKernal = newKernel;
	}*/

	this.render = function () {
        	gl.useProgram( this.program );
        	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );
      	
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textures.buffer);
            gl.vertexAttribPointer(this.textures.attributeLoc, this.textures.numComponents, gl.FLOAT, gl.FALSE, 0, 0);

        	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

		    gl.uniformMatrix4fv( this.uniforms.MV, gl.FALSE, flatten(this.MV) );
		    gl.uniformMatrix4fv( this.uniforms.P, gl.FALSE, flatten(this.P) );
		    
	        gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
		    gl.uniform1i(this.uniforms.uSampler, 0);
            gl.uniform2f(this.uniforms.TextureSize, texImage.width, texImage.height);
            gl.uniform1fv(this.uniforms.kernelLocation, this.inUseKernal);
            gl.uniform1f(this.uniforms.kernelWeightLocation, computeKernelWeight(this.inUseKernal));

            gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
    }

};

handleLoadedTexture = function (image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function computeKernelWeight(kernel) {
   var weight = kernel.reduce(function(prev, curr) {
       return prev + curr;
   });
   return weight <= 0 ? 1 : weight;
}



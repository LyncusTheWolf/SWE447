
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
		numComponents : 3
	};
	
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

	this.initTexture = function () {
        texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function () {
            handleLoadedTexture (texImage, texture);
        }
        if(mixedTextures == 0)
            texImage.src = "monkey.png"; 
        else texImage.src = "noodles.jpg"; 
            
    }
    // positions
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );
    // indices
	this.indices.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
	this.uniforms = {
	  MV : undefined,
	  P : undefined,
	};
	this.uniforms.MV = gl.getUniformLocation(this.program, "MV");
	this.uniforms.P = gl.getUniformLocation(this.program, "P");
  	this.MV = mat4(); // or undefined
  	this.P = mat4();

	this.render = function () {
        	gl.useProgram( this.program );
        	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            		gl.FLOAT, gl.FALSE, 0, 0 );
        	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
		    gl.uniformMatrix4fv( this.uniforms.MV, gl.FALSE, flatten(this.MV) );
		    gl.uniformMatrix4fv( this.uniforms.P, gl.FALSE, flatten(this.P) );
            gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);
    }
};




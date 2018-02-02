function CubeData(){
	
	//Record the number of positions
	this.positions = { numComponents : 3 };
	
	//Record all the vertices
	//Assume these are seperate faces (flat shaded)
	var positions = {
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

		numComponents : 3
	};
	
	var indices = [
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
	];
}
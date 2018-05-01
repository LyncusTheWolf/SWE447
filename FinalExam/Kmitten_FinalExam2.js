for (int j = 0; j < image_Height; ++j) {

	for (int i = 0; i < image_Width; ++i) {

		// compute primary ray direction

		Ray primRay;

		computePrimRay(i, j, &primRay);

		// shoot prim ray in the scene and search for intersection

		Point pHit;

		Normal nHit;

		float minDist = INFINITY;

		Object object = NULL;

		for (int k = 0; k < objects.size(); ++k) { // find the object we are interested in

			//.....
			//Perform a raycast from the starting point along the ray direction
			float rayHit = rayintersect(ray, object);
			//If there are any hits then check them to see which is the closest to the initial point
			if(rayHit != null && rayHit.distance < minDist){
				//Set object to the first object hit by the ray
				object = hit.object;
				//Set point to the point where the ray first intersects that object
				pHit = hit.point;
				//Calculate a normal for that object from the point that was hit
				nHit = hit.normal;				
			}
		}	

		if (object != NULL) {

			// compute illumination

			Ray shadowRay;

			shadowRay.direction = lightPosition - pHit;

			bool isShadow = false;

			for (int k = 0; k < objects.size(); ++k){ //any object in between this object and light position ?

				//.....
				//Perform a raycast from the point towards the light to see if there are any other objects occluding the ray
				float rayHit = rayintersect(ray, object);
				//If yes, then set is in shadow to true and break
				if(rayHit == null){
					isShadow = true;
					break;
				}
			}

		}

		if (!isInShadow){

			// calcule the pixels[i][j] color here.

			//.....
			//The object can be assumed to be in shadow
			//Either perform further raycast to get better detail
			//Or cap the calculations and perform a fragment operation with only ambient lighting (No diffuse or specular)
			pixels[i][j] = ambient + tex2D(mainText, uvs);
		}
		else {

			// calcule the pixels[i][j] color here.

			//.....
			vec3 baseColor = tex2D(mainText, uvs);
			//Get the distance from the point to the light and use it for attenuation calculations
			//	(Assuming pointlight otherwise atten = 1)
			vec3 delta = lightPosition - pHit;
			//Calculate diffuse lighting based upon the angle of the normal with respect to the eye
			vec3 diffuse = dot(normal, viewDir);
			//Calculate specular lighting based upon the initial raycast with respect to the
			//	calculated vector of the light reflected across the normal
			vec3 specular = dot(reflect(lightDir, normal), viewDir);
			pixels[i][j] = ambient + diffuse + specular;
		}
	}

}
# CGRA 2020/2021

## Group T07G03

## Project Notes

### Part A

#### 1. Moving Object

- In this part we learned how to detect user input from the keyboard to affect our scene.
- We also learned how to create movable objects that change position and orientation over time.

#### 2.1. MyCubeMap

- In this part, we adapted the code from MyUnitCubeQuad (TP4) to produce a new class, MyCubeMap, as specified in the instructions.
- However, as we noticed the code from the original MyUnitCubeQuad could be vastly improved, we decided to improve that class and then adapt it into the MyCubeMap. Both classes are present in the project folder.
- The main differences between a MyCubeMap and a MyUnitCubeQuad is the material (MyCubeMap has the properties specified in the instructions of the project), the size (MyCubeMap has a scale factor of 500) and the faces of MyCubeMap pointing inwards (implemented as a 180 degrees rotation around the X or Y axis, depending on the face).
- We used a scale factor of 500 for MyCubeMap, instead of the instructed 50, so that objects weren't clipped outside the cube in certain perspectives.
- We improved the code of MyUnitCubeQuad.js from the TP4 (the improved version can be seen in the file MyUnitCubeQuad.js of the project folder) before using the code to create MyCubeMap.js.

#### 2.2. MyCylinder

- In this part we created a new class MyCylinder with the properties specified in the instructions (radius and height with value 1; the base of the cylinder is in the plane XZ and centered at the origin).
- We also added texture coordinates and used the file images/earth.jpg to debug the object.

#### 2.3. MySphere

- In this part we experimented displaying the sphere in the scene and studied its source code in order to understand how it was created. We concluded that each stack is created with all its slices before going to the next stack.
- We decided the place where it makes the most sense to add the textureCoordinates of a vertex is right after adding the respective vertex coordinates. The phi angle ranges from 0 to pi and should be associated with the y coordinate of the texture, as it represents latitude. On the other hand, theta ranges from 0 to 2*pi and should be associated with the x coordinate of the texture, as it represents the longitude. As the texture coordinates should range from 0 to 1, we can divide each angle by the maximum value in its range.

#### 3. Interface

- We renamed the textures in the folder images/test_cubemap so that they had the same name as the other cubemaps, in order to be able to use a for loop that loads all textures.
- In order to change the scaleFactor of the moving object without changing its position, we had to scale it inside the display function. As such, we created a scaleFactor parameter in the moving object that was updated when the user changes its value in the slider.

#### 4. MyFish

- To create the shader for the fish body, we based it on the 'doubletext' shader from TP5. The main differences are: distortion of the sphere in the fish_body shader, we used the aVertexPosition to split the head and body rather than gl_Position (so as not to depend on the camera position nor on the distortion), and a texture was used for the body instead of another solid color.
- Because the sphere (without distortion) has a diameter of 2, 40% of it is 0.8: this is the size we chose for the head (the body is 1.2). Because the sphere is centered at the origin, this corresponds to a split at z=0.2.
- We created the fins and tails by applying geometric transformations to a double-sided triangle and used a material with the same color as the body.
- For the eyes we used a sphere with a texture created by us (fisheye.png) and applied geometrical transformations to it.
- The whole fish is scaled by a factor of 0.5/(2*zDistortion), where zDistortion=1.6 is the amount of distortion in the z axis we applied to the unit radius sphere. This factor is used so that the length of the fish in scene is around 0.5 units.
- In order to animate fins and tail, we created the MyFish.updateAnimation() function, called in MyScene.update() to pass to the fish the current time. This time is used to calculate a rotation state based on constant parameters such as the fins/tail velocity and initial phase. We used the cossines of this rotations states to calculate the angles so that the animation is periodic. The tail moves between angles +-Math.PI/9 where angle 0 is when the tail is at the center. The fins move (each in its direction) between Math.PI/10 and (Math.PI/10+Math.PI/5), where angle 0 is when the fins are pointing downwards.

#### 5.1 Sea floor and fish nest

- In this part, we based the sea_floor shader we created in the 'texture3' shader from TP5. To represent the sea floor, we created a plane with textures and the sea_floor shader, using an image with the actual texture to display ('sand.png') and an image with the height map to create a sensation of ondulation ('sandMap.png'). The height map was also used to create shades on the parts where the sand is lower.
- We decided to use 50x50 divisions in the plane instead of the 20x20 suggested in the instructions, so that the height differences weren't so sharp. We pass uniform values to the shader (the offsetScale to scale the height of the sand, and the shadowScale to control its shade) so that they are easier to tweak. We chose the offsetScale carefuly so that it would not surpass the plane Y=1. However, because reaching Y=1 would reach heights that are too big, we decided to have a lower maximum height, which is closer to Y=0.5.
- To create the fish nest, we added an image of a shell ('shell.png') to the image of the colors ('sand.png'), keeping in mind not to surpass maximum radius asked of 5 units. We created a class MyFishNest to represent the position and radius of the nest programatically, which will be useful in section 6 even though it doesn't draw anything right now.
- For the ondulation of the floor to match the existence of the shell, we also added, in the same position, a darker zone to the height map (sandMap_with_shell.png) so as to create a hole.

#### 5.2 Water surface

- In order to create the water surface with ondulation and distorcion of the light, we based it in the 'water' shader from TP5.
- Because the vertices aren't distorted, the vertex shader (water_surface.vert) is actually very simple, only passing the texture coordinates to the fragment shader (water_surface.frag). This shader receives two uniform values: the distortionScale, which controls the amount of distortion, and the timeFactor, which is used to animate the distortion (it translates the distortion map).
- As instructed, we used the distortion map to produce the amount of distortion at each point, mapping the values of R and G (from 0 to 1) to the offset (from -0.5 to 0.5) of the coordinates of the real texture to display.

#### 5.3 Rocks

- To create MyRock, we used the code from MySphere as a starting point. We then added in the initBuffers function a random scale (limited to a parameterized range: minRadius and maxRadius) to each vertex of the sphere, in order to make it edgier.
- In MyRockSet, a number of rocks are created in random positions, orientations and dimensions. The number of rocks to create and the limit positions they may occupy are parameterized in the constructor of MyRockSet. The scale is limited to the range 0.1 to 0.2 in order to respect the instructions given (using 1.0 as the maximum radius of the base rock).
- Depending on its dimension, the rock will also suffer a translation on the y axis, to try to avoid it getting too buried in the sand.
- The screenshot screenshots/proj-t7g03-4a.png shows a single rock with radius between 0.5 and 1.0. The rest of the screenshots in that section show the rocks as generated by MyRockSet, with their "real" size (no more than 0.2 units) and in the context of the scene.

#### 5.4 MyPillar, cubemap and MySeaweed

- To create MyPillar, we used the cylinder created in part A. We added a texture that resembles a trunk (from [http://www.cadhatch.com/seamless-bark-textures/4588167786](http://www.cadhatch.com/seamless-bark-textures/4588167786)) to look more realistic, with an appearance that makes it browner as the trunk has been underwater.
- In order for the pillars to look like they belonged to the pier of the image of the surface, we had to translate them into positions below that pier and scale them to have the them reach the surface. As this scaling would otherwise make the texture very stretched out and ugly, we added a textureHeight parameter to the constructor, which scales the texture coordinates so that (with a REPEATING texture wrap) the texture would not be stretched and instead repeat all the way to the top of the cylinder. We added a total of 8 pillars.
- For the cubemap, we added the given textures ('images/underwater_cubemap/') to the list of cubemaps in MyScene and set that one as the default. Because of there being so many cubemaps to choose from, loading all textures at the beggining started to get very slow, so we changed the code so that it would only load the textures of any given cubemap after selecting it for the first time.
- So as to fill the scenery, we added groups of seaweeds. We created MySeaweed to represent a group of seaweed, with radius, height and displacement limits (how far can each element be from the center of the group) that are parameterized in the constructor. The seaweed uses MyPyramid as the base shape, each with different colors randomly generated but always close to green.
- In MySeaweedSet, groups of seaweeds are created with random positioning, number of seaweeds and parameter limits of each group. In the constructor, there are parameters to limit those values.

#### 6.1. MyMovingFish

- We created the class MyMovingFish extending MyMovingObject and passing it a MyFish as the object to display. As extending MyMovingObject functionality was needed, we overrode its methods, calling the method in the superclass and adding the new functionality to it.
- In order to add the vertical movement, we established a vertical velocity, as well as a minimum (for the fish not to appear below the floor) and maximum Y coordinate of the object's position. All those values can be parameterized in the constructor of MyMovingFish.

#### 6.2. Animation adjustments of fish behaviour

- When the fish changes velocity, its tail's velocity is also recalculated based on the new velocity. The fish's tail always has a minimum speed even when the fish is still.
- In order to prevent abrupt changes in the position of the tail when the tail velocity is changed, we had to made slight changes to the animation logic from section 4. Now, instead of calculating the rotation state of the tail based on the absolute time passed to updateAnimation(), we used a strategy similar to the one used to update the position of the fish based on its velocity: the fish now keeps track of its tail's current rotation state and everytime updateAnimation() is called, its tail's rotation state is updated based on the tail's speed.
- For the fins' animation, every time the fish turns, a call to MyFish.setStopFinState() is made, with the argument being the state of the fins: -1 to stop the left fin from moving, 1 to stop the right fin and 0 to keep both fins moving. After that, a countdown of 250ms is set so that when the fish stops rotating for that amount of time, both fins start moving again (the state goes back to 0).

#### 6.3. Rock collection

- Whenever 'C' is pressed and the fish is in its lowest position, depending on whether it has or not a rock in its mouth, it will execute one of two algorithms, respectively: try to put the rock in the nest or try to catch the nearest rock.
- When trying to catch the nearest rock, it verifies which is the closest rock within a distance of 1.5 units. If none is found, nothing happens. Otherwise, that rock and its information (position, orientation and scale) is removed from MyRockSet and added to MyMovingFish. Even though the original position is not used when displaying the rock on the fish's mouth, it is also stored so that the rock can be put back in MyRockSet if needed.
- When trying to put the rock in the nest, if the the fish location is inside the fish nest (the location's distance to the center of the nest is smaller than its radius), the rock information will be removed from MyMovingFish and added to MyFishNest, but in a predetermined position inside the nest. Otherwise, nothing happens.
- When the user resets the fish while it has a rock in its mouth, that rock is removed from the fish and added back to MyRockSet.

#### 7. Additional functionalities

We decided to implement the following items:

##### 7.1 Seaweed

- We had already implemented this feature in 5.4 where we created the seaweeds using MyPyramid as the base shape, each with different colors randomly generated but always close to green.
- So as to create groups of seaweeds, we created MySeaweedSet that created them with random positioning, number of seaweeds and parameter limits of each group.

##### 7.2 Animated Seaweeds

- To create ondulation in the seaweeds we had to change MyPyramid in order to divide the object and create "stacks". 
- We had to change the vertices, normals and indices.
- To create the ondulation, we passed the curvature and the amplitude of the ondulation as well as the phase to the shader, in order to know which phase of the ondulation the seaweed is in according to time.
- We creted an offset with a sinusoidal, scaled by the height (coordinate Y).
- Because we wanted to keep the appearence previously created for each seaweed, we modified the shader based on “lib/CGF/shaders/Gouraud/textured”.

##### 7.6 Better fish's shader

- To improve the fish's shader, we modified it so as to the fish's body and head to react to the light. We based our shader in “lib/CGF/shaders/Gouraud/textured” but with some modifications.
- We had to adjust the calculation of the lighting according to which part of the fish we were representing. For this, we created a flag to know if we wanted to use the material correspondent to the texture of the body or the material correspondent to the fish's head.

## Screenshots

### 1 - MyFish

![Screenshot 1a](screenshots/proj-t7g03-1a.png)
![Screenshot 1b](screenshots/proj-t7g03-1b.png)
![Screenshot 1c](screenshots/proj-t7g03-1c.png)
![Screenshot 1d](screenshots/proj-t7g03-1d.png)
![Screenshot 1e](screenshots/proj-t7g03-1e.png)

### 2 - MySeaFloor

![Screenshot 2a](screenshots/proj-t7g03-2a.png)
![Screenshot 2b](screenshots/proj-t7g03-2b.png)
![Screenshot 2c](screenshots/proj-t7g03-2c.png)
![Screenshot 2d](screenshots/proj-t7g03-2d.png)
![Screenshot 2e](screenshots/proj-t7g03-2e.png)

### 3 - MyWaterSurface

![Screenshot 3a](screenshots/proj-t7g03-3a.png)
![Screenshot 3b](screenshots/proj-t7g03-3b.png)
![Screenshot 3c](screenshots/proj-t7g03-3c.png)
![Screenshot 3d](screenshots/proj-t7g03-3d.png)

### 4 - MyRockSet

![Screenshot 4a](screenshots/proj-t7g03-4a.png)
![Screenshot 4b](screenshots/proj-t7g03-4b.png)
![Screenshot 4c](screenshots/proj-t7g03-4c.png)
![Screenshot 4d](screenshots/proj-t7g03-4d.png)

### 5 - MyPillar

![Screenshot 5a](screenshots/proj-t7g03-5a.png)
![Screenshot 5b](screenshots/proj-t7g03-5b.png)
![Screenshot 5c](screenshots/proj-t7g03-5c.png)

### 6 - Other Elements: MySeaweedSet

![Screenshot 6a](screenshots/proj-t7g03-6a.png)
![Screenshot 6b](screenshots/proj-t7g03-6b.png)
![Screenshot 6c](screenshots/proj-t7g03-6c.png)

### 7 - MyMovingFish: Rock Collection

![Screenshot 7a](screenshots/proj-t7g03-7a.png)
![Screenshot 7b](screenshots/proj-t7g03-7b.png)
![Screenshot 7c](screenshots/proj-t7g03-7c.png)
![Screenshot 7d](screenshots/proj-t7g03-7d.png)
![Screenshot 7e](screenshots/proj-t7g03-7e.png)
![Screenshot 7f](screenshots/proj-t7g03-7f.png)


### 8 - Additional functionalities

![Screenshot 8a](screenshots/proj-t7g03-8a.png)
![Screenshot 8b](screenshots/proj-t7g03-8b.png)
![Screenshot 8c](screenshots/proj-t7g03-8c.png)
![Screenshot 8d](screenshots/proj-t7g03-8d.png)

![Screenshot 8e](screenshots/proj-t7g03-8e.png)
![Screenshot 8f](screenshots/proj-t7g03-8f.png)
![Screenshot 8g](screenshots/proj-t7g03-8g.png)

![Screenshot 8h](screenshots/proj-t7g03-8h.png)
![Screenshot 8i](screenshots/proj-t7g03-8i.png)
![Screenshot 8j](screenshots/proj-t7g03-8j.png)
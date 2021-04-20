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

## Screenshots

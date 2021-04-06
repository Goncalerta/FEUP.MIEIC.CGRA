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
- The main differences between a MyCubeMap and a MyUnitCubeQuad is the material (MyCubeMap has the properties specified in the instructions of the project), the size (MyCubeMap has a scale factor of 50, as instructed) and the faces of MyCubeMap pointing inwards (implemented as a 180 degrees rotation around the X or Y axis, depending on the face).

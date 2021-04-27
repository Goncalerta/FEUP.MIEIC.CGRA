attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 pos;
varying vec2 vTextureCoord;

uniform float xDistortion;
uniform float zDistortion;

void main() {
    pos = vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition * vec3(xDistortion, 1.0, zDistortion), 1.0);
}
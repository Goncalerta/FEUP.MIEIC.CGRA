attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D heightMap;
uniform float offsetScale;

void main() {
	vTextureCoord = aTextureCoord;
    float offset = offsetScale * (texture2D(heightMap, vTextureCoord).b - 0.5);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + aVertexNormal * offset, 1.0);

}

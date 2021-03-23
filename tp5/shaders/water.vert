attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vTextureCoord = aTextureCoord;

    float factor = timeFactor - (200.0 * floor(timeFactor/200.0));
  
    vec3 offset_animation = aVertexNormal*0.05*texture2D(uSampler2, vTextureCoord + factor*0.005).r;
    vec3 offset = aVertexNormal*0.05*texture2D(uSampler2, vTextureCoord).r;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset + offset_animation, 1.0);
}

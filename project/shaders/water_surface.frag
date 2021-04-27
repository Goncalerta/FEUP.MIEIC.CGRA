#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D distortionMap;
varying vec2 vTextureCoord;
varying vec4 pos;

uniform float distortionScale;
uniform float timeFactor;

void main() {
    vec2 distortionMapPosition = vTextureCoord + timeFactor;
    vec4 distortion = texture2D(distortionMap, distortionMapPosition);
    vec2 offset = vec2(distortion.r - 0.5, distortion.g - 0.5)*distortionScale;
    gl_FragColor = texture2D(uSampler, vTextureCoord + offset);
}

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
/*
    float factor = timeFactor - (200.0 * floor(timeFactor/200.0));
  
    vec3 offset_animation = aVertexNormal*0.05*texture2D(uSampler2, vTextureCoord + factor*0.005).r;
    vec3 offset = aVertexNormal*0.05*texture2D(uSampler2, vTextureCoord).r;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset + offset_animation, 1.0);


    void main() {
    vec2 offset = vTextureCoord + timeFactor*0.005;

	gl_FragColor = texture2D(uSampler, vTextureCoord + offset);
}*/
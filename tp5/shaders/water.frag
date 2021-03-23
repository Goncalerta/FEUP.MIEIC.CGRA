#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform float timeFactor;

void main() {
    vec2 offset = vTextureCoord + timeFactor*0.005;

	gl_FragColor = texture2D(uSampler, vTextureCoord + offset);
}
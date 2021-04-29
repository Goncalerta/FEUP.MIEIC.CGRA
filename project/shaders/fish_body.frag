#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
varying vec2 vTextureCoord;
varying vec4 pos;

void main() {
    if (pos.z >= 0.2) {
		gl_FragColor =  vec4(0.8, 0.0, 0.0, 1.0);
    }
    else {
        gl_FragColor =  texture2D(uSampler, vTextureCoord);
    }
}
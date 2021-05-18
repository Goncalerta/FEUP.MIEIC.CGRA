#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D heightMap;
uniform float shadowScale;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    float offset = shadowScale * (0.5 - texture2D(heightMap, vTextureCoord).b);

    if (offset < 0.0)
       offset = 0.0;

    gl_FragColor = color - offset * vec4(1.0, 1.0, 1.0, 0.0);
}

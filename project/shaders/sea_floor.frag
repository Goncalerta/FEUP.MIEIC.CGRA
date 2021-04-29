#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D heightMap;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    float filter = texture2D(heightMap, vTextureCoord).b;

    if (filter < 0.48)
        color = color * vec4(0.9, 0.9, 0.9, 1);

    // gl_FragColor = color * filter;

    gl_FragColor = color;
}

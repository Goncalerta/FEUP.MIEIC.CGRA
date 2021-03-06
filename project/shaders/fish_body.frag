#version 300 es
precision highp float;

in vec4 vFinalColorHead;
in vec4 vFinalColorBody;
in vec2 vTextureCoord;
in vec4 pos;

out vec4 fragColor;

uniform sampler2D uSampler;
uniform bool uUseTexture;

void main() {
	if (uUseTexture && pos.z < 0.2) {
		vec4 textureColor = texture(uSampler, vTextureCoord);
		fragColor = textureColor * vFinalColorBody;
	} else {
        fragColor = vFinalColorHead;
    }
}

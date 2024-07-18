export const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLightDirection;

    uniform vec3 lightDirection;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vLightDirection = mat3(viewMatrix) * normalize(lightDirection);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLightDirection;

    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;

    void main() {
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);

        float intensity = dot(vNormal, vLightDirection);
		intensity = clamp(intensity * 10.0, -1.0, 1.0);

		float mixAmount = intensity * 0.5 + 0.5;
		
        // Blend between day and night textures
        vec4 color = mix(nightColor, dayColor, mixAmount);
        gl_FragColor = color;
    }
`;

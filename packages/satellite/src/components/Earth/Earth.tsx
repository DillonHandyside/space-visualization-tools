import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, ShaderMaterial, TextureLoader, Vector3 } from 'three';
import earthMap from '../../assets/earth.jpeg';
import earthDarkMap from '../../assets/earthDark.jpg';
import { useRef } from 'react';
import * as satellitejs from 'satellite.js';

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
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vLightDirection;

    void main() {
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);

        float intensity = dot(vNormal, vLightDirection);
		intensity = clamp(intensity * 5.0, -1.0, 1.0);

		float mixAmount = intensity * 0.5 + 0.5;
		
        // Blend between day and night textures
        vec4 color = mix(nightColor, dayColor, mixAmount);
        gl_FragColor = color;
    }
`;

const Earth = () => {
	const dayTexture = useLoader(TextureLoader, earthMap);
	const nightTexture = useLoader(TextureLoader, earthDarkMap);
	const earthRef = useRef<Mesh>(null);
	const shaderRef = useRef<ShaderMaterial>(null);
	const lightDirection = new Vector3(5, 3, 5).normalize(); // TODO: make this an accurate sun

	useFrame(() => {
		if (earthRef.current) {
			const now = new Date();
			const gmst = satellitejs.gstime(now);

			// set the Earth's rotation based on GMST
			earthRef.current.rotation.y = gmst;
		}
	});

	return (
		<mesh ref={earthRef} castShadow receiveShadow>
			<sphereGeometry args={[1, 64, 64]} />
			<shaderMaterial
				ref={shaderRef}
				attach="material"
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					dayTexture: { value: dayTexture },
					nightTexture: { value: nightTexture },
					lightDirection: { value: lightDirection },
				}}
			/>
		</mesh>
	);
};

export default Earth;

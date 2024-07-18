import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader, Vector3 } from 'three';
import earthMap from '../../assets/earth.jpeg';
import earthDarkMap from '../../assets/earthDark.jpg';
import { useRef } from 'react';
import * as satellitejs from 'satellite.js';
import { useSimulatedTime } from '../../hooks/useSimulatedTime';
import { fragmentShader, vertexShader } from './Earth.constants';

const Earth = () => {
	const dayTexture = useLoader(TextureLoader, earthMap);
	const nightTexture = useLoader(TextureLoader, earthDarkMap);
	const earthRef = useRef<Mesh>(null);

	const [time] = useSimulatedTime();

	useFrame(() => {
		if (earthRef.current) {
			const gmst = satellitejs.gstime(time);

			// set the Earth's rotation based on GMST
			earthRef.current.rotation.y = gmst;
		}
	});

	return (
		<mesh ref={earthRef}>
			<sphereGeometry args={[1, 64, 64]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					dayTexture: { value: dayTexture },
					nightTexture: { value: nightTexture },
					lightDirection: { value: new Vector3(5, 3, 5).normalize() }, // TODO: sun
				}}
			/>
		</mesh>
	);
};

export default Earth;

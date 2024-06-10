import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import earthMap from '../assets/earth.jpeg';

const Earth = () => {
	const texture = useLoader(TextureLoader, earthMap);
	return (
		<mesh castShadow receiveShadow>
			<sphereGeometry args={[1, 64, 64]} />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
};

export default Earth;

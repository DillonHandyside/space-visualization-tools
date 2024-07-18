import { OrbitControls } from '@react-three/drei';
import { useSatelliteContext } from '../context/useSatelliteContext';
import { Vector3 } from 'three';

const OrbitControlsWrapper = () => {
	const { selectedSatellite } = useSatelliteContext();
	return (
		<OrbitControls
			zoomSpeed={1}
			minDistance={2}
			maxDistance={100}
			enablePan={false}
			minPolarAngle={0}
			maxPolarAngle={Math.PI}
			target={
				selectedSatellite
					? selectedSatellite.positions[0]
					: new Vector3()
			}
		/>
	);
};

export default OrbitControlsWrapper;

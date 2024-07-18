import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { GEO_RADIUS, SEGMENTS } from './GeoOrbitLineRenderer.constants';

const GeoOrbitLineRenderer = () => {
	const getPoints = () => {
		const pts = [];
		for (let i = 0; i < SEGMENTS; i++) {
			console.log('TEST');
			const theta = (i / (SEGMENTS - 1)) * Math.PI * 2;
			pts.push(
				new THREE.Vector3(
					GEO_RADIUS * Math.cos(theta),
					0,
					GEO_RADIUS * Math.sin(theta),
				),
			);
		}
		return pts;
	};

	return <Line points={getPoints()} lineWidth={0.3} />;
};

export default GeoOrbitLineRenderer;

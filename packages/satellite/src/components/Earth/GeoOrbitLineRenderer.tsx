import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const EARTH_RAD = 6378.137; // earth radius in km
const GEO_ALT = 42241.6; // geostationary orbit altitude in km

const GeoOrbitLineRenderer = () => {
	const radius = GEO_ALT / EARTH_RAD;
	const segments = 128;
	const points = useMemo(() => {
		const pts = [];
		for (let i = 0; i <= segments; i++) {
			const theta = (i / segments) * Math.PI * 2;
			pts.push(
				new THREE.Vector3(
					radius * Math.cos(theta),
					0,
					radius * Math.sin(theta),
				),
			);
		}
		return pts;
	}, [radius, segments]);

	return <Line points={points} color={'white'} lineWidth={0.2} />;
};

export default GeoOrbitLineRenderer;

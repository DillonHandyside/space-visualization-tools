import { useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import starMap from '../../assets/star-map.jpg';

const Skybox = () => {
	const texture = useLoader(THREE.TextureLoader, starMap);
	const { scene } = useThree();

	useEffect(() => {
		if (texture) {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				color: new THREE.Color(0.15, 0.15, 0.15),
			});

			const skyboxGeometry = new THREE.SphereGeometry(900, 60, 40);
			skyboxGeometry.scale(1, 1, -1);
			const skybox = new THREE.Mesh(skyboxGeometry, material);
			scene.add(skybox);
		}
	}, [scene, texture]);

	return null;
};

export default Skybox;

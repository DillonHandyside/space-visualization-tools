import { extend, useThree } from '@react-three/fiber';
import { tleToSatellite } from '../../utils/satelliteUtils';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SphereGeometry, InstancedMesh, MeshStandardMaterial } from 'three';

extend({ SphereGeometry, InstancedMesh, MeshStandardMaterial });

interface SatellitesProps {
	tles: { tle: string[]; name: string }[];
	color: string;
	meshRefs: React.MutableRefObject<THREE.InstancedMesh[]>;
}

const Satellites = ({ tles, color, meshRefs }: SatellitesProps) => {
	const { camera } = useThree();

	const meshRef = useRef<THREE.InstancedMesh>(null);
	const satellites = useMemo(
		() => tles && tles.map(({ tle, name }) => tleToSatellite(tle, name)),
		[tles],
	);

	useEffect(() => {
		const currentMesh = meshRef.current;
		if (currentMesh) {
			currentMesh.geometry.computeBoundingBox();
			currentMesh.userData.satellites = satellites;
			meshRefs.current.push(currentMesh);
		}
		return () => {
			meshRefs.current = meshRefs.current.filter(
				ref => ref !== currentMesh,
			);
		};
	}, [meshRefs, satellites]);

	useEffect(() => {
		const dummy = new THREE.Object3D();
		const currentMesh = meshRef.current;

		if (currentMesh) {
			satellites.forEach((satellite, i) => {
				const positions = satellite.positions;
				if (positions.length === 0) {
					return;
				}

				dummy.position.copy(
					new THREE.Vector3(
						positions[0].x,
						positions[0].y,
						positions[0].z,
					),
				);
				dummy.updateMatrix();

				const distance = camera.position.distanceTo(dummy.position);
				const scale = 0.15 + Math.log(distance) * 0.25;
				dummy.scale.set(scale, scale, scale);
				dummy.updateMatrix();

				currentMesh.setMatrixAt(i, dummy.matrix);
			});
			currentMesh.instanceMatrix.needsUpdate = true;
		}
	}, [satellites, camera]);

	{
		/* TODO: Implement lerp logic */
	}
	// useFrame(state => {
	// 	const time = state.clock.getElapsedTime() * timeMultiplier;
	// 	const dummy = new THREE.Object3D();

	// 	satellites.forEach((satellite, i) => {
	// 		const positions = satellite.positions;
	// 		if (positions.length === 0) {
	// 			return;
	// 		}

	// 		const index = Math.floor(time % positions.length);
	// 		const nextIndex = (index + 1) % positions.length;
	// 		const lerpFactor = time % 1;

	// 		const currentPosition = new THREE.Vector3(
	// 			positions[index].x,
	// 			positions[index].y,
	// 			positions[index].z,
	// 		);

	// 		const nextPosition = new THREE.Vector3(
	// 			positions[nextIndex].x,
	// 			positions[nextIndex].y,
	// 			positions[nextIndex].z,
	// 		);

	// 		const interpolatedPosition = currentPosition.lerp(
	// 			nextPosition,
	// 			lerpFactor,
	// 		);

	// 		dummy.position.copy(interpolatedPosition);

	// 		dummy.position.copy(
	// 			new THREE.Vector3(
	// 				positions[0].x,
	// 				positions[0].y,
	// 				positions[0].z,
	// 			),
	// 		);
	// 		dummy.updateMatrix();

	// 		if (meshRef.current) {
	// 			const distance = camera.position.distanceTo(dummy.position);
	// 			const scale = 0.15 + Math.log(distance) * 0.25;
	// 			dummy.scale.set(scale, scale, scale);
	// 			dummy.updateMatrix();

	// 			meshRef.current.setMatrixAt(i, dummy.matrix);
	// 		}
	// 	});

	// 	if (meshRef.current) {
	// 		meshRef.current.instanceMatrix.needsUpdate = true;
	// 	}
	// });

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, satellites.length]}
		>
			<sphereGeometry args={[0.02, 8, 8]} />
			<meshStandardMaterial color={color} />
		</instancedMesh>
	);
};

export default Satellites;

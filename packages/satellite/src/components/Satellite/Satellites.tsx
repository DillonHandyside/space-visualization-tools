import { extend, useFrame, useThree } from '@react-three/fiber';
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
		() =>
			tles ? tles.map(({ tle, name }) => tleToSatellite(tle, name)) : [],
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

	useFrame(() => {
		const dummy = new THREE.Object3D();

		satellites.forEach((satellite, i) => {
			if (meshRef.current) {
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
				const distance = camera.position.distanceTo(dummy.position);
				const scale = 0.15 + Math.log(distance) * 0.25;
				dummy.scale.set(scale, scale, scale);

				dummy.updateMatrix();
				meshRef.current.setMatrixAt(i, dummy.matrix);
			}
		});

		if (meshRef.current) {
			meshRef.current.instanceMatrix.needsUpdate = true;
		}
	});

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

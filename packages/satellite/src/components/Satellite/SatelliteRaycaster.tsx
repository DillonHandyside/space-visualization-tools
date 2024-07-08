import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCallback, useEffect, useRef } from 'react';
import { useSatelliteContext } from './context/useSatelliteContext';

interface SatelliteRaycasterProps {
	meshRefs: React.MutableRefObject<THREE.InstancedMesh[]>;
}

const SatelliteRaycaster = ({ meshRefs }: SatelliteRaycasterProps) => {
	const { camera, mouse, raycaster, gl } = useThree();
	const { setHoveredSatellite, setSelectedSatellite } = useSatelliteContext();
	const isDragging = useRef(false);
	const mouseDownPos = useRef({ x: 0, y: 0 });

	useFrame(() => {
		raycaster.setFromCamera(mouse, camera);
		let found = false;

		for (let i = 0; i < meshRefs.current.length; i++) {
			const meshRef = meshRefs.current[i];
			if (meshRef) {
				const intersects = raycaster.intersectObject(meshRef);
				if (intersects.length > 0) {
					const intersectedId = intersects[0].instanceId!;
					const intersectedSatellite =
						meshRef.userData.satellites[intersectedId];
					setHoveredSatellite(intersectedSatellite);
					found = true;
					break;
				}
			}
		}

		if (!found) {
			setHoveredSatellite(null);
		}
	});

	const handleMouseDown = useCallback((event: MouseEvent) => {
		isDragging.current = false;
		mouseDownPos.current = { x: event.clientX, y: event.clientY };
	}, []);

	const handleMouseMove = useCallback((event: MouseEvent) => {
		const dx = event.clientX - mouseDownPos.current.x;
		const dy = event.clientY - mouseDownPos.current.y;
		if (Math.sqrt(dx * dx + dy * dy) > 5) {
			isDragging.current = true;
		}
	}, []);

	const handleMouseUp = useCallback(() => {
		if (!isDragging.current) {
			raycaster.setFromCamera(mouse, camera);
			let found = false;
			for (let i = 0; i < meshRefs.current.length; i++) {
				const meshRef = meshRefs.current[i];
				if (meshRef) {
					const intersects = raycaster.intersectObject(meshRef);
					if (intersects.length > 0) {
						const intersectedId = intersects[0].instanceId!;
						const intersectedSatellite =
							meshRef.userData.satellites[intersectedId];
						setSelectedSatellite(intersectedSatellite);
						found = true;
						break;
					}
				}
			}

			if (!found) {
				setSelectedSatellite(null);
			}
		}
	}, [camera, meshRefs, mouse, raycaster, setSelectedSatellite]);

	useEffect(() => {
		const domElement = gl.domElement;
		domElement.addEventListener('mousedown', handleMouseDown);
		domElement.addEventListener('mousemove', handleMouseMove);
		domElement.addEventListener('mouseup', handleMouseUp);
		return () => {
			domElement.removeEventListener('mousedown', handleMouseDown);
			domElement.removeEventListener('mousemove', handleMouseMove);
			domElement.removeEventListener('mouseup', handleMouseUp);
		};
	}, [gl.domElement, handleMouseDown, handleMouseMove, handleMouseUp]);

	return null;
};

export default SatelliteRaycaster;

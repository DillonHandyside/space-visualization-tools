import './App.css';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useTLEData } from './hooks/useTLEData';

import Earth from './components/Earth/Earth';
import Satellites from './components/Satellite/Satellites';
import SatelliteRaycaster from './components/Satellite/SatelliteRaycaster';
import { SatelliteProvider } from './components/Satellite/context/SatelliteContext';

import SatelliteHoverLabel from './components/HoverLabel/HoverLabel';
import SatelliteLeftPanel from './components/LeftPanel';
import GeoOrbitLineRenderer from './components/Earth/GeoOrbitLineRenderer';

const App = () => {
	const meshRefs = useRef<THREE.InstancedMesh[]>([]);
	const { heoTles, geoTles, meoTles, leoTles } = useTLEData();
	return (
		<SatelliteProvider>
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100vh',
				}}
			>
				<Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
					<ambientLight intensity={3} />
					<Earth />
					<GeoOrbitLineRenderer />
					<Satellites
						tles={heoTles!}
						color="#00FE26"
						meshRefs={meshRefs}
					/>
					<Satellites
						tles={geoTles!}
						color="#C27B80"
						meshRefs={meshRefs}
					/>
					<Satellites
						tles={meoTles!}
						color="#BF00BF"
						meshRefs={meshRefs}
					/>
					<Satellites
						tles={leoTles!}
						color="#59BFFF"
						meshRefs={meshRefs}
					/>
					<SatelliteRaycaster meshRefs={meshRefs} />
					<OrbitControls
						zoomSpeed={1}
						minDistance={2}
						maxDistance={100}
						enablePan={false}
						minPolarAngle={0}
						maxPolarAngle={Math.PI}
					/>
				</Canvas>
				<SatelliteLeftPanel />
				<SatelliteHoverLabel />
			</div>
		</SatelliteProvider>
	);
};

export default App;

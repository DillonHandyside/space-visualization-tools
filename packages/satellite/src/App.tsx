import './App.css';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useTLEData } from './hooks/useTLEData';

import Earth from './components/Earth/Earth';
import Satellites from './components/Satellite/Satellites';
import SatelliteRaycaster from './components/Satellite/SatelliteRaycaster';

import SatelliteHoverLabel from './components/HoverLabel/HoverLabel';
import SatelliteLeftPanel from './components/LeftPanel';
import GeoOrbitLineRenderer from './components/GeoOrbitLine/GeoOrbitLineRenderer';
import { TimeProvider } from './context/TimeContext';
import { SatelliteProvider } from './context/SatelliteContext';
import OrbitControlsWrapper from './components/OrbitControlsWrapper';
import Skybox from './components/Skybox/Skybox';

const App = () => {
	const meshRefs = useRef<THREE.InstancedMesh[]>([]);
	const { heoTles, geoTles, meoTles, leoTles } = useTLEData();
	return (
		<TimeProvider>
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
						<Skybox />
						<Earth />
						<GeoOrbitLineRenderer />
						<>
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
						</>
						<SatelliteRaycaster meshRefs={meshRefs} />
						<OrbitControlsWrapper />
					</Canvas>
				</div>
				<SatelliteLeftPanel />
				<SatelliteHoverLabel />
			</SatelliteProvider>
		</TimeProvider>
	);
};

export default App;

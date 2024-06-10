import './App.css';
import { Canvas } from '@react-three/fiber';
import Earth from './components/Earth';
import { OrbitControls } from '@react-three/drei';

const App = () => {
	return (
		<Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
			<ambientLight intensity={3} />
			<Earth />
			<OrbitControls
				zoomSpeed={0.5}
				minDistance={2}
				maxDistance={100}
				enablePan={false}
				minPolarAngle={0}
				maxPolarAngle={Math.PI}
			/>
		</Canvas>
	);
};

export default App;

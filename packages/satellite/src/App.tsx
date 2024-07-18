import './App.css';
import { Canvas } from '@react-three/fiber';

const App = () => {
	return (
		<Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
			<></>
		</Canvas>
	);
};

export default App;

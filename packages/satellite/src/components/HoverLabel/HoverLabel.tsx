import { useState, useEffect } from 'react';
import HoverLabel from '../../../../common-components/src/components/HoverLabel/HoverLabel';
import { useSatelliteContext } from '../../context/useSatelliteContext';

const SatelliteHoverLabel = () => {
	const { hoveredSatellite } = useSatelliteContext();
	const [mousePosition, setMousePosition] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<>
			{hoveredSatellite && (
				<HoverLabel
					x={mousePosition.x}
					y={mousePosition.y}
					name={hoveredSatellite.name}
				/>
			)}
		</>
	);
};

export default SatelliteHoverLabel;

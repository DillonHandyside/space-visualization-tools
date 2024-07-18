import { useSatelliteContext } from '../context/useSatelliteContext';
import LeftPanel from '../../../common-components/src/components/LeftPanel/LeftPanel';

const SatelliteLeftPanel = () => {
	const { selectedSatellite } = useSatelliteContext();
	return (
		selectedSatellite && (
			<LeftPanel>
				<h3>{selectedSatellite?.name}</h3>
				<p>Sat No: {selectedSatellite?.satelliteNumber}</p>
				<p>Inclination: {selectedSatellite?.inclination}</p>
				<p>Velocity: N/A</p>
				<p>Altitude: N/A</p>
				<p>Apogee: N/A</p>
				<p>Perigee: {selectedSatellite?.argumentOfPerigee}</p>
				<p>Epoch: {selectedSatellite?.epoch}</p>
			</LeftPanel>
		)
	);
};

export default SatelliteLeftPanel;

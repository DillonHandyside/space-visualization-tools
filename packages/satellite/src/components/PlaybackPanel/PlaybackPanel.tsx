import PlaybackPanel from '../../../../common-components/src/components/PlaybackPanel/PlaybackPanel';
import { useSimulatedTime, useTimeSpeed } from '../../hooks/useSimulatedTime';

const SatellitePlaybackPanel = () => {
	const [simulatedTime, setSimulatedTime] = useSimulatedTime();
	const [speed, setSpeed] = useTimeSpeed();

	return (
		<PlaybackPanel
			simulatedTime={simulatedTime.toISOString()}
			speed={speed}
			onPause={() => setSpeed(10)}
			onSet={setSimulatedTime}
			onSetToNow={() => setSimulatedTime(Date.now())}
			onSpeed1={() => setSpeed(1)}
			onSpeed60={() => setSpeed(60)}
			onSpeed3600={() => setSpeed(3600)}
			onSpeed86400={() => setSpeed(86400)}
		/>
	);
};

export default SatellitePlaybackPanel;

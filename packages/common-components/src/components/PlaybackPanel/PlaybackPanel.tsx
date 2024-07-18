import React, { useState } from 'react';
import './PlaybackPanel.css';

interface PlaybackPanelProps {
	simulatedTime: string;
	speed: number;
	onPause: () => void;
	onSet: (time: number) => void;
	onSetToNow: () => void;
	onSpeed1: () => void;
	onSpeed60: () => void;
	onSpeed3600: () => void;
	onSpeed86400: () => void;
}

const PlaybackPanel = (props: PlaybackPanelProps) => {
	const [inputTime, setInputTime] = useState(
		props.simulatedTime.substring(0, 19),
	);

	return (
		<div className="playback-panel">
			<p>{props.simulatedTime}</p>
			<p>Speed: {props.speed}x</p>
			<button onClick={props.onSpeed1}>1sec/s</button>
			<button onClick={props.onSpeed60}>1min/s</button>
			<button onClick={props.onSpeed3600}>1hr/s</button>
			<button onClick={props.onSpeed86400}>1day/s</button>
			<button onClick={props.onPause}>Pause</button>
			<button onClick={props.onSetToNow}>Set to Now</button>
			<input
				type="datetime-local"
				value={inputTime}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInputTime(e.target.value)
				}
			/>
			<button onClick={() => props.onSet(new Date(inputTime).getTime())}>
				Set Simulated Time
			</button>
		</div>
	);
};

export default PlaybackPanel;

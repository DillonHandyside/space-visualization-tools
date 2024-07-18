import { useContext } from 'react';
import { TimeContext } from '../context/TimeContext';

export const useSimulatedTime = (): [Date, (time: number) => void] => {
	const { state, dispatch } = useContext(TimeContext);
	const setSimulatedTime = (time: number) =>
		dispatch({ type: 'SET_SIMULATED_TIME', payload: time });
	return [new Date(state.simulatedTime), setSimulatedTime];
};

export const useTimeSpeed = (): [number, (speed: number) => void] => {
	const { state, dispatch } = useContext(TimeContext);
	const setSpeed = (speed: number) =>
		dispatch({ type: 'SET_SPEED', payload: speed });
	return [state.speed, setSpeed];
};

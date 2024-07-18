import React, {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useReducer,
	useRef,
} from 'react';

interface TimeState {
	simulatedTime: number;
	speed: number;
	lastRealTime: number;
}

type Action =
	| { type: 'SET_SPEED'; payload: number }
	| { type: 'TICK'; payload: number }
	| { type: 'SET_SIMULATED_TIME'; payload: number };

const initialState: TimeState = {
	simulatedTime: Date.now(),
	speed: 1,
	lastRealTime: Date.now(),
};

export const TimeContext = createContext<{
	state: TimeState;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

const timeReducer = (state: TimeState, action: Action): TimeState => {
	switch (action.type) {
		case 'SET_SPEED':
			return { ...state, speed: action.payload };
		case 'TICK':
			return state.speed === 0
				? state
				: {
						...state,
						simulatedTime:
							state.simulatedTime + action.payload * state.speed,
						lastRealTime: Date.now(),
					};
		case 'SET_SIMULATED_TIME':
			return {
				...state,
				simulatedTime: action.payload,
				lastRealTime: Date.now(),
			};
		default:
			return state;
	}
};

export const TimeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(timeReducer, initialState);
	const frameId = useRef<number | null>(null);

	const tick = useCallback(() => {
		const now = Date.now();
		dispatch({ type: 'TICK', payload: now - state.lastRealTime });
		frameId.current = requestAnimationFrame(tick);
	}, [state.lastRealTime]);

	useEffect(() => {
		frameId.current = requestAnimationFrame(tick);
		return () => {
			if (frameId.current !== null) {
				cancelAnimationFrame(frameId.current);
			}
		};
	}, [tick]);

	return (
		<TimeContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</TimeContext.Provider>
	);
};

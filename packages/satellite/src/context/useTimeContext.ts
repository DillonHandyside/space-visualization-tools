import { useContext } from 'react';
import { TimeContext } from './TimeContext';

export const useTimeContext = () => {
	const context = useContext(TimeContext);
	if (!context) {
		throw new Error('useTimeContext must be used within a TimeProvider');
	}
	return context;
};

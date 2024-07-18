import React, { createContext, useState, ReactNode } from 'react';
import { Satellite } from '../components/Satellite/types';

interface SatelliteContextProps {
	hoveredSatellite: Satellite | null;
	setHoveredSatellite: (satellite: Satellite | null) => void;
	selectedSatellite: Satellite | null;
	setSelectedSatellite: (satellite: Satellite | null) => void;
}

export const SatelliteContext = createContext<
	SatelliteContextProps | undefined
>(undefined);

export const SatelliteProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [hoveredSatellite, setHoveredSatellite] = useState<Satellite | null>(
		null,
	);
	const [selectedSatellite, setSelectedSatellite] =
		useState<Satellite | null>(null);

	return (
		<SatelliteContext.Provider
			value={{
				hoveredSatellite,
				setHoveredSatellite,
				selectedSatellite,
				setSelectedSatellite,
			}}
		>
			{children}
		</SatelliteContext.Provider>
	);
};

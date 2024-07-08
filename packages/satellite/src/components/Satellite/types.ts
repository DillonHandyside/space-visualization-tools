import { Vector3 } from 'three';

export interface Satellite {
	name: string;
	satelliteNumber: string;
	epoch: string;
	meanMotion: number;
	inclination: number;
	rightAscension: number;
	eccentricity: number;
	argumentOfPerigee: number;
	meanAnomaly: number;
	tle: string[];
	positions: Vector3[];
}

import { EciVec3, SatRec, twoline2satrec } from 'satellite.js';
import { Satellite } from '../components/Satellite/types';
import { Vector3 } from 'three';
import * as satellitejs from 'satellite.js';

const EARTH_RAD = 6378.137; // earth radius in km

export const tleToSatellite = (tle: string[], name: string): Satellite => {
	const satrec = twoline2satrec(tle[0], tle[1]);
	const positions = preCalculatePositions(satrec);
	return {
		name,
		satelliteNumber: satrec.satnum,
		epoch: satrec.jdsatepoch.toString(),
		meanMotion: satrec.no,
		inclination: satrec.inclo,
		rightAscension: satrec.nodeo,
		eccentricity: satrec.ecco,
		argumentOfPerigee: satrec.argpo,
		meanAnomaly: satrec.mo,
		tle,
		positions,
	};
};

{
	/* TODO: delete and think of a more performant way to calculate positions */
}
const preCalculatePositions = (satrec: SatRec): Vector3[] => {
	const positions = [];
	const step = 1000; // 1 second step
	const totalSteps = 60;

	for (let i = 0; i < totalSteps; i++) {
		const date = new Date(Date.now() + i * step);
		const positionAndVelocity = satellitejs.propagate(satrec, date);
		const positionEci = positionAndVelocity.position;
		if (positionEci) {
			const { x, y, z } = positionEci as EciVec3<number>;
			positions.push(
				new Vector3(x / EARTH_RAD, z / EARTH_RAD, -y / EARTH_RAD),
			);
		}
	}
	return positions;
};

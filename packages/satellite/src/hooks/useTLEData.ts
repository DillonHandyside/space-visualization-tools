import { useEffect, useState } from 'react';

interface TLEData {
	name: string;
	tle: string[];
}

export const parseTLEFile = (content: string) => {
	const lines = content.split('\n');
	const tles = [];
	for (let i = 0; i < lines.length - 1; i += 3) {
		const name = lines[i].slice(2).trim();
		const line1 = lines[i + 1].trim();
		const line2 = lines[i + 2].trim();
		tles.push({ name, tle: [line1, line2] });
	}
	return tles;
};

const fetchTLEData = async (fileName: string): Promise<TLEData[] | null> => {
	try {
		const response = await fetch(`${window.location.href}/${fileName}`);
		const fileContent = await response.text();
		const parsedData = parseTLEFile(fileContent);
		return parsedData;
	} catch (error) {
		console.error(`Error fetching TLE data from ${fileName}:`, error);
		return null;
	}
};

export const useTLEData = () => {
	const [tleData, setTleData] = useState<{
		heoTles: TLEData[] | null;
		geoTles: TLEData[] | null;
		meoTles: TLEData[] | null;
		leoTles: TLEData[] | null;
	}>({
		heoTles: null,
		geoTles: null,
		meoTles: null,
		leoTles: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const tleFiles = [
					'heoTles.txt',
					'geoTles.txt',
					'meoTles.txt',
					'leoTles.txt',
				];
				const fetchedData = await Promise.all(
					tleFiles.map(async fileName => ({
						[fileName.replace('.txt', '')]:
							await fetchTLEData(fileName),
					})),
				);

				setTleData(prevState => ({
					...prevState,
					...fetchedData.reduce(
						(acc, data) => ({ ...acc, ...data }),
						{},
					),
				}));
			} catch (error) {
				console.error('Error fetching TLE data: ', error);
			}
		};

		fetchData();
	}, []);

	return tleData;
};

import { getRandomNumber } from './getRandomNumber.js';

function Vehicle(name, team, drivers) {
	const thisVehicle = {
		name: name,
		team: team,
		drivers: drivers,
		cost: Number,
		statistics: {
			wins: [],
			podiums: [],
			fastestLaps: [],
			poles: [],
			titles: [],
			entries: [],
			points: 0
		},
		specifications: {
			frontSuspension: '',
			rearSuspension: '',
			engine: '',
			engineLayout: '',
			tires: '',
			power: 0,
			weight: 0
		},
		info: {
			lowSpeed: getRandomNumber(1, 100),
			mediumSpeed: getRandomNumber(1, 100),
			highSpeed: getRandomNumber(1, 100),
			straightLineSpeed: getRandomNumber(1, 100)
		}
	};

	return thisVehicle;
}

export { Vehicle };
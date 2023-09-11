import { getRandomNumber } from './getRandomNumber.js';

function Driver(name) {
	const thisDriver = {
		name: name,
		team: {},
		teamsOwned: [],
		age: getRandomNumber(16, 32),
		funds: 0,
		cost: getRandomNumber(1, 10),
		retirement: getRandomNumber(10, 25),
		contractLength: Number,
		skills: {
			corneringAbility: getRandomNumber(1, 10),
			faultRecovery: 0,
			wetWeather: 0
		},
		statistics: {
			wins: [],
			podiums: [],
			fastestLaps: [],
			poles: [],
			titles: [],
			entries: [],
			points: 0
		}
	};

	return thisDriver;
}

export { Driver };
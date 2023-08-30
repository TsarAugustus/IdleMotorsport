import { getRandomNumber } from './getRandomNumber.js';

function Circuit(name, day, month, grade) {
	const thisCircuit = {
		name: name,
		day: day,
		month: month,
		grade: grade,
		path: createCircuitPath(5, 5)
	};

	return thisCircuit;
}

function createCircuitPath(corners, straights) {
	const circuitPath = [];
	const pathLength = corners + straights;
	for(let i=0; i<pathLength; i++) {
		const choice = getRandomNumber(0, 1);
		const pathToAdd = {
			type: ''
		};
		pathToAdd.skill = (1, 10);
        
		if(choice === 0 && corners > 0) { 
			//Corner
			circuitPath.push(createCorner(pathToAdd));
			corners--;
		} else if(choice === 0 && corners === 0) {
			circuitPath.push(createStraight(pathToAdd));
			straights--;
		} else if(choice === 1 && straights > 0) {
			//Straight
			circuitPath.push(createStraight(pathToAdd));
			straights--;
		} else if(choice === 1 && straights === 0) {
			circuitPath.push(createCorner(pathToAdd));
			corners--;
		}
	}
    
	return circuitPath; 
}

function createCorner(pathToAdd) {
	pathToAdd.type = 'Corner';

	return pathToAdd;
}

function createStraight(pathToAdd) {
	pathToAdd.type = 'Straight';

	return pathToAdd;
}

export { Circuit };
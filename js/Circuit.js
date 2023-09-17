import { getRandomNumber } from './getRandomNumber.js';

function Circuit(name, day, month, grade) {
	const thisCircuit = {
		name: name,
		day: day,
		month: month,
		grade: grade,
		path: createCircuitPath(getRandomNumber(1, 20), getRandomNumber(1, 20))
	};
	// console.log(thisCircuit);
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
		pathToAdd.skill = getRandomNumber(1, 100);
        
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
	let cornerTypes = ['lowSpeed', 'mediumSpeed', 'highSpeed'];

	pathToAdd.cornerType = cornerTypes[Math.floor(Math.random() * cornerTypes.length)];
	return pathToAdd;
}

function createStraight(pathToAdd) {
	pathToAdd.type = 'Straight';

	return pathToAdd;
}

export { Circuit };
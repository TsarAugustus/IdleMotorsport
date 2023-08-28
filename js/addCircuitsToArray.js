import { settings } from './settings.js';
import { Circuit } from './Circuit.js';
import { getRandomNumber } from './getRandomNumber.js'; 

function addCircuitsToArray(numberOfCircuits) {
	let list = [];

	for(let i=0; i<numberOfCircuits; i++) {
		// A Circuit can have multiple Grades, 
		// Which allows multiple Races to happen on the same date
		const circuitGrade = [];
		const numberOfGrades = getRandomNumber(1, settings.numberOfGrades);
		for(let i=settings.numberOfGrades; i >= numberOfGrades; i--) circuitGrade.push(i);

		const circuit = new Circuit(
			`Circuit ${i}`,
			getRandomNumber(1, settings.daysPerMonth),
			getRandomNumber(1, settings.monthsPerYear),
			circuitGrade
		);

		list.push(circuit);
	}

	// If there are Circuits that are the exact same dates and grade, then redo the generation
	list.sort(function(a, b) {
		if(a.month === b.month && a.day === b.day && a.grade === b.grade)
			list = addCircuitsToArray(numberOfCircuits);
	});

	// Sort the Circuit dates according to month first
	// Then sort the Circuit dates to days with that month
	list.sort(function(a, b) {
		if(a.month === b.month) return a.day - b.day;
		else if(a.month > b.month) return 1;
		else if(a.month < b.month) return -1;
	});

	return list;
}

export { addCircuitsToArray };
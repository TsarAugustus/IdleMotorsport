// import { Vehicle } from './Vehicle/Vehicle.js';
// import { Circuit } from './Circuit/Circuit.js';
import { Series } from './Series/Series.js';
import { Track } from './Track/Track.js';
import { Person } from './Person/Person.js';
import { writeToHTML } from './HTML/writeToHTML.js';
import { Structure } from './data/Structure/Structure.js';

function init() {
	// console.log(Vehicle());
	// console.log(Circuit());
	
	// const regulations = {
	// 	Engine: {
	// 		configuration: undefined, 		// V...
	// 		boreDiameter: undefined, 		// Number
	// 		strokeLength: undefined,		// Number
	// 		cylinderNumber: undefined,		// Number
	// 		valvesPerCylinder: undefined,	// Number
	// 		valveEfficiency: undefined,		// Number
	// 		boreStrokeRatio: undefined,		// Number
	// 		boreStrokeType: undefined,		// Number
	// 		engineDisplacement: undefined,	// Number
	// 		RPM: undefined,					// Number
	// 		torque: undefined,				// Number
	// 		BMEP: undefined,				// Number
	// 		HP: undefined,					// Number
	// 		manufacturer: undefined,		// String
	// 		weight: undefined,				// Number
	// 		rating: undefined,				// Number
	// 		acceleration: undefined,		// Number
	// 		KMPH: undefined,				// Number
	// 		zeroToOneHundred: undefined, 	// Number
	// 		durability: undefined			// Number
	// 	}
	// };

	// writeToHTML(() => { return Vehicle();}, 'Vehicle', 10);
	// writeToHTML(() => { return Series();}, 'Series', 0);

	let People = [];

	for(let i = 0; i < 100; i++) {
		const randomAttributesBoolean = true;
		let newPerson = Person(randomAttributesBoolean, People);

		People.push(newPerson);
	}

	let Tracks = [];

	for(let i = 0; i < 100; i++) {
		Tracks.push(Track(i, People));
	}

	Tracks = shuffle(Tracks);

	console.log(Series(Tracks, People));

	// writeToHTML(() => { return Series(trackList); }, 'Series', 1);

	// console.log('Series:', Series(trackList));

	// writeToHTML(() => { return Person(); }, 'Person', 10);

	// console.log(personArray);

	// console.log(Series());

	// console.log('Initialized');
}

function shuffle (arr) {
	let j, x, index;
	for (index = arr.length - 1; index > 0; index--) {
		j = Math.floor(Math.random() * (index + 1));
		x = arr[index];
		arr[index] = arr[j];
		arr[j] = x;
	}
	return arr;
}

init();

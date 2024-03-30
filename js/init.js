import { Vehicle } from './Vehicle/Vehicle.js';
import { Circuit } from './Circuit/Circuit.js';
import { writeToHTML } from './HTML/writeToHTML.js';

function init() {
	// console.log(Vehicle());
	// console.log(Circuit());
	
	// writeToHTML(() => { return Vehicle(); }, 'Engine', vehicleDiv, 1);

	writeToHTML(() => { return Vehicle();}, 'Vehicle', 1);
	
	// console.log('Initialized');
}

init();

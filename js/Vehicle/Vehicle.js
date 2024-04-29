import { Engine } from './Engine/Engine.js';
import { Tire } from './Tire/Tire.js';
import { createManufacturer } from '../Manufacturer/createManufacturer.js';
import { sponsors } from '../data/sponsors.js';

export function Vehicle() {
	const engineManufacturer = createManufacturer('Team');
	const tireManufacturer = createManufacturer('Tire');

	let thisVehicle = {
		Engine: Engine(engineManufacturer),
		Tire: Tire(tireManufacturer),
		Sponsor: sponsors[Math.floor(Math.random() * sponsors.length)]
	};

	return thisVehicle;
}

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
		Sponsor: sponsors[Math.floor(Math.random() * sponsors.length)],
		Customers: [],
		Owner: undefined,
		Rating: 0,
		ConstructionCost: 0,
		Cost: 0,
		Stock: 100
	};

	//Need to add more things for the Rating. 
	//Tires, Suspension, etc
	thisVehicle.Rating = thisVehicle.Engine.rating;
	thisVehicle.Cost = thisVehicle.ConstructionCost + thisVehicle.Rating * 10;

	return thisVehicle;
}

// MAJOR COMPONENTS
// Engine
// Transmission
// Brakes
// Chassis
// Battery
// Axle & Differential


// As per Wikipedia, List of Auto Parts
// https://en.wikipedia.org/wiki/List_of_auto_parts

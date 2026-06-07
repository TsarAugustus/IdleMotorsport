import { Vehicle } from '../Vehicle/Vehicle.js';
import { VehicleList } from '../init.js';

export function EvaluateVehicleGoals(thisPerson, goal) {
	let goalStatus = false;
	let iterationCost = 10000;
	let iterationLimit = 10;

	
	if(goal.ExecutionName === 'Vehicle' && thisPerson.Money >= iterationCost) {
		let potentialVehicleList = [];
		for(let i = 0; (thisPerson.Money >= iterationCost && iterationLimit > i); i++) {
			let thisPotentialVehicle = Vehicle(thisPerson);
			potentialVehicleList.push(thisPotentialVehicle);

			thisPerson.Money -= iterationCost;
		}

		let bestPotentialVehicle = {
			Rating: 0,
			Vehicle: undefined
		};

		potentialVehicleList.forEach(vehicle => {
			if(vehicle.Rating > bestPotentialVehicle.Rating) bestPotentialVehicle.Vehicle = vehicle;			
		});
		
		if(bestPotentialVehicle.Vehicle !== undefined && thisPerson.Money >= bestPotentialVehicle.Vehicle.Cost) {
			bestPotentialVehicle.Vehicle.Owner = thisPerson;
			thisPerson.Money -= bestPotentialVehicle.Vehicle.Cost;
			goalStatus = true;
			VehicleList.push(bestPotentialVehicle.Vehicle);
		}
	}

	return { thisPerson, goalStatus };
}

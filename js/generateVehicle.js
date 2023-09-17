import { Vehicle } from './Vehicle.js';

function generateVehicle(team) {
	let teamStaff = [];
	
	let vehicleName = `${team.name} Vehicle ${team.vehicles.length}`;

	let thisVehicle = new Vehicle(vehicleName, team, team.drivers);

	team.departments.forEach(department => {
		department.staff.forEach(staff => {
			teamStaff.push(staff);
		});
	});

	team.currentVehicle = thisVehicle;
	team.vehicles.push(thisVehicle);
}

export { generateVehicle };
import { getRandomNumber } from './getRandomNumber.js';

function generateVehicle(team) {
	let teamStaff = [];
	
	let thisVehicle = {
		name: `${team.name} Vehicle ${team.vehicles.length}`,
		num: 0
	};

	team.departments.forEach(department => {
		department.staff.forEach(staff => {
			teamStaff.push(staff);
		});
	});
	
	teamStaff.forEach(staff => {
		staff.skills.forEach(skill => {
			thisVehicle.num += skill.number * getRandomNumber(1, 10);
		});
	});

	team.currentVehicle = thisVehicle;
	team.vehicles.push(thisVehicle);
}

export { generateVehicle };
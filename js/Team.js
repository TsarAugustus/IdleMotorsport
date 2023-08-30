import { settings } from './settings.js';
import { Departments } from './Departments.js';

function Team(name) {
	const thisTeam = {
		name: name,
		owner: {},
		drivers: [],
		departments: [],
		rank: settings.numberOfGrades,
		currentVehicle: {},
		vehicles: [],
		statistics: {
			wins: [],
			podiums: [],
			fastestLaps: [],
			poles: [],
			titles: [],
			entries: [],
			points: 0
		}
	};

	for(const department of Departments) {
		const teamDepartment = thisTeam.departments.filter(teamDepartment => {
			if(teamDepartment.name === department.name) return true;
			else return false;
		});

		if(!teamDepartment || teamDepartment.length === 0) {
			const newTeamDepartment = {
				name: department.name,
				head: {},
				staff: []
			};

			thisTeam.departments.push(newTeamDepartment);
		}
	}

	return thisTeam;
}

export { Team };
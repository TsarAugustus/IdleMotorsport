import { getRandomNumber } from './getRandomNumber.js';
import { settings } from './settings.js';

function simulateCircuit(circuit, season) {
	const eligibleTeams = [];
	const result = {
		circuit: circuit,
		season: season,
		rank: Number,
		circuitResult: []
	};

	circuit.grade.forEach(grade => {
		season.teams.forEach(team => {
			if(team.rank === grade) {
				result.rank = grade;
				eligibleTeams.push(team);
			}
		});
	});

	eligibleTeams.forEach(team => {
		team.drivers.forEach(driver => {
			result.circuitResult.push({
				driver: driver,
				// circuit: circuit,
				points: 0,
				driverResult: getRandomNumber(0, 10)
			});
		});
	});

	result.circuitResult.sort((a, b) => {
		return b.driverResult - a.driverResult;
	});

	evaluateCircuitResult(result);
	
	return result;
}

function evaluateCircuitResult(result) {

	result.circuitResult.forEach((thisResult, index) => {
		thisResult.points = settings.points[index + 1];
		if(!settings.points[index + 1]) thisResult.points = 0;

		const podiumPlacement = 3;
		const teamDriver = thisResult.driver;
		const teamEntries = teamDriver.team.statistics.entries;

		teamDriver.statistics.entries.push(result);

		// Adds entries to Teams
		const teamEntriesCheck = teamEntries.filter(thisEntry => {
			return (result.circuit.name === thisEntry.circuit.name && result.season.name === thisEntry.season.name);
		});

		if(teamEntriesCheck.length === 0) {
			teamDriver.team.statistics.entries.push(result);
		}
        
		if(index === 0) {
			teamDriver.statistics.wins.push(result);
			teamDriver.team.statistics.wins.push(result);

			teamDriver.team.departments.forEach(department => {
				department.staff.forEach(thisStaff => {
					thisStaff.statistics.wins.push(result);
				});
			});
		}
		
		if (index < podiumPlacement) {
			teamDriver.statistics.podiums.push(result);
			teamDriver.team.statistics.podiums.push(result);
            
			teamDriver.team.departments.forEach(department => {
				department.staff.forEach(thisStaff => {
					thisStaff.statistics.podiums.push(result);
				});
			});
		}
	});

	return result;
}

export { simulateCircuit };
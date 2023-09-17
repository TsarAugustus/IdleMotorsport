// import { getRandomNumber } from './getRandomNumber.js';
import { getRandomNumber } from './getRandomNumber.js';
import { settings } from './settings.js';

function simulateCircuit(circuit, season) {
	const eligibleTeams = [];
	const result = {
		circuit: circuit,
		season: season,
		rank: Number,
		weather: '',
		circuitResult: []
	};

	let weatherOptions = ['wet', 'dry'];
	result.weather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];

	circuit.grade.forEach(grade => {
		season.teams.forEach(team => {
			if(team.rank === grade) {
				result.rank = grade;
				let teamCheck = eligibleTeams.filter(thisTeam => thisTeam.name === team.name);
				if(teamCheck.length === 0) eligibleTeams.push(team);
			}
		});
	});

	eligibleTeams.forEach(team => {
		team.drivers.forEach(driver => {
			let thisResult = {
				driver: driver,
				// circuit: circuit,
				points: 0,
				driverResult: 0
			};
			//TEMP TEST
			for(let i=0; i<100; i++) {
				circuit.path.forEach(path => {
					let weatherMultiplier = 1;
					if(result.weather === 'wet') {
						weatherMultiplier = driver.skills.wetWeather;
					}
					if(path.type === 'Corner') {
						thisResult.driverResult += path.skill * driver.skills.corneringAbility / getRandomNumber(1, 10) * weatherMultiplier * driver.skills.faultRecovery;
					} 
					if(path.type === 'Straight') {
						thisResult.driverResult += path.skill * team.currentVehicle.info.straightLineSpeed * weatherMultiplier * driver.skills.faultRecovery;
					}
				});
			}

			result.circuitResult.push(thisResult);
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
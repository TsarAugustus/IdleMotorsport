import { Team } from './Team.js';
import { settings } from './settings.js';
import { getRandomNumber } from './getRandomNumber.js';

function generateSeason(array, num) {
	const { drivers, teams, vehicles, circuits, staff } = array;
    
	const thisSeason = {
		name: `Season ${num}`,
		drivers: drivers,
		teams: teams,
		vehicles: vehicles,
		circuits: circuits,
		staff: staff,
		circuitResult: [],
		tierResults: []
	};
    
	// Fill Staff ownedTeams array if Staff owns a Team
	const teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
	const initialSeasonGeneration = createSeasonTeams(drivers, teamsToGenerate, thisSeason.staff);
	if(thisSeason.teams.length < teamsToGenerate) { thisSeason.teams = thisSeason.teams.concat(initialSeasonGeneration);}

	const simulatedSeason = simulateSeason(thisSeason);

	for(const circuit of simulatedSeason.circuitResult) {
		const tierResultsCheck = thisSeason.tierResults.filter(result => { return result.rank === circuit.rank; });
		const newTier = {
			rank: circuit.rank,
			driverResult: [],
			teamResult: []
		};

		if(tierResultsCheck.length === 0) {
			newTier.driverResult = getTierDriversResults(simulatedSeason.circuitResult);
			newTier.teamResult = getTierTeamResults(simulatedSeason.circuitResult);

			thisSeason.tierResults.push(newTier);
		}
	}    

	for(const tierResult of thisSeason.tierResults) {
		const tierTeamChampion = tierResult.teamResult[0];
		const tierDriverChampion = tierResult.driverResult[0];
        
		for(const team of thisSeason.teams) {
			if(team.name === tierTeamChampion.name) {
				const thisTeamChampionship = {
					season: thisSeason.name,
					rank: tierResult.rank,
					result: tierResult
				};
                
				team.statistics.titles.push(thisTeamChampionship);
			}
		}
        
		for(const driver of thisSeason.drivers) {
			if(driver.name === tierDriverChampion.name) {
				const thisDriverChampionship = {
					season: thisSeason.name,
					rank: tierResult.rank,
					result: tierResult
				};

				driver.statistics.titles.push(thisDriverChampionship);
			}
		}
	}

	thisSeason.teams.sort((a, b) => {
		return b.statistics.titles.length - a.statistics.titles.length;
	});

	thisSeason.drivers.sort((a, b) => {
		return b.statistics.titles.length - a.statistics.titles.length;
	});
    
	return thisSeason;
}

function getTierTeamResults(results) {
	const tierTeamResults = [];

	for(const result of results) {
		for(const driverResult of result.circuitResult) {
			const tierTeamResultsCheck = tierTeamResults.filter(thisResult => { return thisResult.name === driverResult.driver.team.name;});

			determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult);
		}
	}

	tierTeamResults.sort((a, b) => {
		return b.points - a.points;
	});

	return tierTeamResults;
}

function determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult) {
	if(tierTeamResultsCheck.length === 0) {
		const tierTeam = {
			name: driverResult.driver.team.name,
			points: driverResult.points
		};

		tierTeamResults.push(tierTeam);
	} else {
		tierTeamResults.forEach(thisResult => {
			if(thisResult.name === driverResult.driver.team.name) {
				thisResult.points += driverResult.points;
			}
		});
	}

}

function getTierDriversResults(results) {
	const tierDriverResults = [];

	for(const result of results) {
		for(const driverResult of result.circuitResult) {
			const tierDriverResultsCheck = tierDriverResults.filter(thisResult => { return thisResult.name === driverResult.driver.name; });
            
			determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult);
		}
	}

	tierDriverResults.sort((a, b) => {
		return b.points - a.points;
	});

	return tierDriverResults;
}

function determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult) {
	if(tierDriverResultsCheck.length === 0) {
		const tierDriver = {
			name: driverResult.driver.name,
			points: driverResult.points
		};

		tierDriverResults.push(tierDriver);
	} else {
		tierDriverResults.forEach(thisResult => { 
			if(thisResult.name === driverResult.driver.name) {
				thisResult.points += driverResult.points;
			}
		});
	}
}

const points = {
	1: 10,
	2: 5,
	3: 2,
	4: 1
};

function simulateSeason(season) {
	season.circuits.forEach(circuit => {
		const circuitSimulation = simulateCircuit(circuit, season);

		const result = {
			circuit: circuit,
			rank: circuitSimulation.rank,
			circuitResult: circuitSimulation.circuitResult
		};

		result.circuitResult.forEach((thisResult, index) => {
			if(points[index + 1]) thisResult.points += points[index + 1];
		});
        
		if(result.circuitResult.length > 0) season.circuitResult.push(result);
	});

	return season;
}

function simulateCircuit(circuit, season) {
	const eligibconsteams = [];
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
				eligibconsteams.push(team);
			}
		});
	});

	eligibconsteams.forEach(team => {
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

	for(const thisResult in result.circuitResult) {
		const podiumPlacement = 3;
		const teamEntries = result.circuitResult[thisResult].driver.team.statistics.entries;

		result.circuitResult[thisResult].driver.statistics.entries.push(result);

		// Adds entries to Teams
		const teamEntriesCheck = teamEntries.filter(thisEntry => {
			return (result.circuit.name === thisEntry.circuit.name && result.season.name === thisEntry.season.name);
		});

		if(teamEntriesCheck.length === 0) {
			result.circuitResult[thisResult].driver.team.statistics.entries.push(result);
		}
        
		if(Number(thisResult) === 0) {
			result.circuitResult[thisResult].driver.statistics.wins.push(result);
			result.circuitResult[thisResult].driver.team.statistics.wins.push(result);

			result.circuitResult[thisResult].driver.team.departments.forEach(department => {
				department.staff.forEach(thisStaff => {
					thisStaff.statistics.wins.push(result);
				});
			});
		} else if (Number(thisResult) < podiumPlacement) {
			result.circuitResult[thisResult].driver.statistics.podiums.push(result);
			result.circuitResult[thisResult].driver.team.statistics.podiums.push(result);
            
			result.circuitResult[thisResult].driver.team.departments.forEach(department => {
				department.staff.forEach(thisStaff => {
					thisStaff.statistics.podiums.push(result);
				});
			});
		}
	}

	return result;
}

function createSeasonTeams(driverArray, teamsToGenerate, staff) {
	let potentialTeams = [];
	let teamOwnerPool = [];

	for(let i=0; i<teamsToGenerate; i++) {
		let team = new Team(`Team ${i}`);
		let potentialOwner = { funds: 0 };

		teamOwnerPool = staff.filter(member => { 
			let memberToReturn = {};

			if(member.teamEmployed.length === 0 && member.teamOwned.length === 0) memberToReturn = member;
			return memberToReturn;
		});

		if(teamOwnerPool.length > 0) potentialOwner = teamOwnerPool[Math.floor(Math.random() * teamOwnerPool.length)];
		const potentialDrivers = [];
		let ownerFunds = potentialOwner.funds;


		driverArray.forEach(driver => {
			if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team) {
				potentialDrivers.push(driver);
				ownerFunds -= driver.cost;
			}
		});
        
		for(const driver of potentialDrivers) {
			const contractCost = driver.cost;

			team.owner = potentialOwner;
			driver.team = team;
			team.drivers.push(driver);
			potentialOwner.funds -= contractCost;
			driver.funds += contractCost;
		}

		if(team.drivers.length > 0) potentialTeams.push(team);

		staff.forEach((thisStaff, index) => {
			if(team.owner.name === thisStaff.name) {
				staff[index].teamOwned.push(team);
			}
		});

		team = buyStaffForTeam(team, staff);
	}

	return potentialTeams;
}

function buyStaffForTeam(team, staff) {
	const potentialStaff = [];
	const ownerFunds = team.owner.funds;

	staff.forEach(staffMember => {
		if(ownerFunds > staffMember.cost && staffMember.teamEmployed.length === 0 && staffMember.teamOwned.length === 0) {
			potentialStaff.push(staffMember);
			ownerFunds -= staffMember.cost;
		}
	});
    
	potentialStaff.forEach(potentialMember => {
		const departmentWithLeastStaff = {};
		team.departments.forEach(department => {
			if(!departmentWithLeastStaff.staff || department.staff.length < departmentWithLeastStaff.staff.length) {
				departmentWithLeastStaff = department;
			}
		});

		team.departments.forEach((department, index) => {
			if(department.name === departmentWithLeastStaff.name) {
				const contractPrice = potentialMember.cost;

				team.owner.funds -= contractPrice;
				potentialMember.funds += contractPrice;
				potentialMember.teamEmployed.push(team);
				team.departments[index].staff.push(potentialMember);
			}
		});
	});


	return team;
}

export { generateSeason };
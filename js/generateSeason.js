import { Team } from './Team.js';
import { settings } from './settings.js';
import { buyStaffForTeam } from './buyStaffForTeam.js';
// import { simulateSeason } from './simulateSeason.js';

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

	if(num > 0) {
		teams.forEach(team => buyStaffForTeam(team, staff));
	}
    
	// Fill Staff ownedTeams array if Staff owns a Team
	const teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
	const initialSeasonGeneration = createSeasonTeams(drivers, teamsToGenerate, thisSeason.staff);
	if(thisSeason.teams.length < teamsToGenerate) { thisSeason.teams = thisSeason.teams.concat(initialSeasonGeneration);}

	//TODO: ADD SIMULATION
	// const simulatedSeason = simulateSeason(thisSeason);
	// for(const circuit of simulatedSeason.circuitResult) {
	// 	const tierResultsCheck = thisSeason.tierResults.filter(result => { return result.rank === circuit.rank; });
	// 	const newTier = {
	// 		rank: circuit.rank,
	// 		driverResult: [],
	// 		teamResult: []
	// 	};

	// 	if(tierResultsCheck.length === 0) {
	// 		newTier.driverResult = getTierDriversResults(simulatedSeason.circuitResult);
	// 		newTier.teamResult = getTierTeamResults(simulatedSeason.circuitResult);

	// 		thisSeason.tierResults.push(newTier);
	// 	}
	// }    

	// for(const tierResult of thisSeason.tierResults) {
	// 	const tierTeamChampion = tierResult.teamResult[0];
	// 	const tierDriverChampion = tierResult.driverResult[0];
        
	// 	for(const team of thisSeason.teams) {
	// 		team.owner.funds += 10;
			
	// 		if(team.name === tierTeamChampion.name) {
	// 			const thisTeamChampionship = {
	// 				season: thisSeason.name,
	// 				rank: tierResult.rank,
	// 				result: tierResult
	// 			};
                
	// 			team.statistics.titles.push(thisTeamChampionship);
	// 		}
	// 	}
        
	// 	for(const driver of thisSeason.drivers) {
	// 		if(driver.name === tierDriverChampion.name) {
	// 			const thisDriverChampionship = {
	// 				season: thisSeason.name,
	// 				rank: tierResult.rank,
	// 				result: tierResult
	// 			};

	// 			driver.statistics.titles.push(thisDriverChampionship);
	// 		}
	// 	}
	// }

	// thisSeason.teams.sort((a, b) => {
	// 	return b.statistics.titles.length - a.statistics.titles.length;
	// });

	// thisSeason.drivers.sort((a, b) => {
	// 	return b.statistics.titles.length - a.statistics.titles.length;
	// });

	return thisSeason;
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

export { generateSeason };
import { Team } from './Team.js';
import { settings } from './settings.js';
import { buyStaffForTeam } from './buyStaffForTeam.js';
import { getRandomNumber } from './getRandomNumber.js';
// import { simulateSeason } from './simulateSeason.js';

function generateSeason(array, num) {
	let drivers = array ? array.drivers : [];
	let teams = array ? array.teams : [];
	let vehicles = array ? array.vehicles : [];
	let circuits = array ? array.circuits : [];
	let staff = array ? array.staff : [];
	// const { drivers, teams, vehicles, circuits, staff } = array;
    
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
	const teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
	const initialSeasonGeneration = createSeasonTeams(drivers, teamsToGenerate, thisSeason.staff, thisSeason.drivers, thisSeason);
	
	if(num > 0) {
		teams.forEach(team => buyStaffForTeam(team, staff, drivers, thisSeason));
		
		//Removes team if they don't have any drivers
		teams.forEach(team => {
			if(team.drivers.length === 0) 
			{	
				thisSeason.staff.forEach(thisStaff => {
					if(team.owner.name === thisStaff.name) {
						// thisStaff.teamsOwned = thisStaff.teamsOwned.filter(thisTeam => thisTeam.name !== team.name);
					}
				});

				// team.owner = {};
				// if(!team.owner)
				thisSeason.teams = thisSeason.teams.filter(thisTeam => thisTeam.name === team.name);
			}
		});
	}
    
	// Fill Staff ownedTeams array if Staff owns a Team
	if(thisSeason.teams.length < teamsToGenerate) { thisSeason.teams = thisSeason.teams.concat(initialSeasonGeneration);}

	thisSeason.teams.forEach(team => {
		generateVehicle(team);
	});

	// generateVehicles(thisSeason.teams);

	return thisSeason;
}

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

function createSeasonTeams(driverArray, teamsToGenerate, staff, drivers, season) {
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
			if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team.name) {
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
			driver.contractLength = 1;
		}

		if(team.drivers.length > 0) potentialTeams.push(team);

		staff.forEach((thisStaff, index) => {
			if(team.owner.name === thisStaff.name) {
				staff[index].teamsOwned.push(team);
			}
		});
	
		team = buyStaffForTeam(team, staff, drivers, season);
	}

	return potentialTeams;
}

export { generateSeason };
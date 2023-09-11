import { settings } from './settings.js';
import { buyStaffForTeam } from './buyStaffForTeam.js';
import { createSeasonTeams } from './createSeasonTeams.js';
import { Driver } from './Driver.js';
import { retireTeams } from './retireTeams.js';
import { restartRetiredTeam } from './restartRetiredTeam.js';
import { generateVehicle } from './generateVehicle.js';

import { firstNames, lastNames } from './Names.js';

function generateSeason(array, num, retiredTeams) {
	let drivers = array ? array.drivers : [];
	let teams = array ? array.teams : [];
	let vehicles = array ? array.vehicles : [];
	let circuits = array ? array.circuits : [];
	let staff = array ? array.staff : [];
    
	let thisSeason = {
		name: `Season ${num}`,
		drivers: drivers,
		teams: teams,
		vehicles: vehicles,
		circuits: circuits,
		staff: staff,
		circuitResult: [],
		tierResults: []
	};

	for(let i=0; i<settings.initialDriverNumber - thisSeason.drivers.length; i++) {
		let driverFirstName = firstNames[Math.floor(Math.random()*firstNames.length)];
		let driverLastName = lastNames[Math.floor(Math.random()*lastNames.length)];
		thisSeason.drivers.push(new Driver(`${driverFirstName} ${driverLastName}`));
	}
	
	if(num > 0) {
		let generation = generateSeasonTeams(teams, staff, drivers, thisSeason, retiredTeams);
		thisSeason = generation.season;
		retiredTeams = generation.retiredTeams;
	}
	
	const teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
	const initialSeasonGeneration = createSeasonTeams(drivers, teamsToGenerate, thisSeason.staff, thisSeason.drivers, thisSeason, retiredTeams);

	// Fill Staff ownedTeams array if Staff owns a Team
	if(thisSeason.teams.length < teamsToGenerate) { thisSeason.teams = thisSeason.teams.concat(initialSeasonGeneration); }
	//Generate Seasonal Vehicles for each Team
	thisSeason.teams.forEach(team => generateVehicle(team) );

	return thisSeason;
}

function generateSeasonTeams(teams, staff, drivers, season, retiredTeams) {
	teams.forEach(team => buyStaffForTeam(team, staff, drivers, season));
		
	//Removes team if they don't have any drivers
	let teamsToRetire = retireTeams(teams, season, retiredTeams);
	teams = teamsToRetire.teams;
	season = teamsToRetire.season;
	retiredTeams = teamsToRetire.retiredTeams;

	for(let i=0; i<settings.teamsPerSeason - season.teams.length; i++) {
		let team = retiredTeams[Math.floor(Math.random() * retiredTeams.length)];
		let restartedTeam;
		if(retiredTeams.length > 0) restartedTeam = restartRetiredTeam(team, season.staff, season.drivers, season);
		console.log(`Team ${team.name} Restarted`);
		if(restartedTeam !== undefined) {
			season.teams.push(restartedTeam);
			retiredTeams = retiredTeams.filter(thisTeam => thisTeam.name !== restartedTeam.name);
		}
	}
	return { season, retiredTeams };
}

export { generateSeason };
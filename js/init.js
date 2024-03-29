import { settings } from './settings.js';
import { Driver } from './Driver.js';
// import { Team } from './Team.js';
// import { Vehicle } from './Vehicle.js';
import { Staff } from './Staff.js';

import { addCircuitsToArray } from './addCircuitsToArray.js';
import { generateSeason } from './generateSeason.js';
import { createTechnologyScreen } from './createTechnologyScreen.js';
import { createCircuitScreen } from './createCircuitScreen.js';

import { firstNames, lastNames } from './Names.js';

import { simulateCircuit } from './simulateCircuit.js';
import { evaluateSeason } from './evaluateSeason.js';

import { updateSeasons } from './updateSeasons.js';
import { getRandomNumber } from './getRandomNumber.js';

import { evaluateDrivers } from './evaluateDrivers.js';

const tabsFunctions = [{
	name: 'Technology',
	function: createTechnologyScreen
}, {
	name: 'Circuits',
	function: createCircuitScreen
}];

let pause = Boolean;
let day = 1;
let month = 1;
let year = 0;
let circuits = [];

let seasons = [];
let currentSeason = {};

let retiredTeams = [];

function initialization() {

	let initialArray = {
		drivers: [],
		teams: [],
		vehicles: [],
		circuits: addCircuitsToArray(settings.initialCircuitNumber),
		staff: []
	};
    
	//Loops to fill initial Arrays
	//TODO: Make this less bad
	for(let i=0; i<settings.initialDriverNumber; i++) {
		let driverFirstName = firstNames[Math.floor(Math.random()*firstNames.length)];
		let driverLastName = lastNames[Math.floor(Math.random()*lastNames.length)];
		initialArray.drivers.push(new Driver(`${driverFirstName} ${driverLastName}`));
	}
	// for(let i=0; i<settings.initialVehicleNumber; i++) initialArray.vehicles.push(new Vehicle(`Vehicle ${i}`));
	for(let i=0; i<settings.initialStaffNumber; i++) initialArray.staff.push(new Staff(`Staff ${i}`));

	circuits = initialArray.circuits;

	const gameDate = document.getElementById('date');
	const dateText = `Day ${day}/Month ${month}/Year ${year} - Paused: ${pause}`;
	gameDate.innerHTML = dateText;

	//Creates pause button
	const pauseButton = document.getElementById('pause');
	pauseButton.addEventListener('click', () => {
		pause = !pause;
		if(!pause) day++;
	});

	// const seasons = [];
	// for(let i=0; i<100; i++) {
	// 	if(i === 0) seasons.push(generateSeason(initialArray, i));
	// 	else seasons.push(generateSeason(seasons[i-1], i));
	// }

	currentSeason = generateSeason(initialArray, year, retiredTeams);

	//  (currentSeason);
    
	startInterval();
}

function addTabsToDiv() {
	//Creating tabs
	//This is hardcoded and should be changed
	const container = document.getElementById('tabbedContainer');
	const tabsToAdd = [];
	tabsFunctions.forEach(tab => tabsToAdd.push(tab.name) );
    
	// addTabsToDiv(tabbedContainer,tabsToAdd);
	const tabsDiv = document.createElement('div');
	tabsDiv.id = 'tabs';
    
	tabsToAdd.forEach(tab => {
		const newTab = document.createElement('span');
		newTab.id = tab;
		newTab.innerHTML = tab;
		newTab.addEventListener('click', () => {
			tabsFunctions.forEach(thisTabFunction => { if(thisTabFunction.name === tab) thisTabFunction.function(container, circuits); });
		});
        
		tabsDiv.appendChild(newTab);
	});

	container.insertBefore(tabsDiv, container.firstChild);
}

function startInterval() {
	addTabsToDiv();
	pause = false;
	const gameDate = document.getElementById('date');
    
	setInterval(function() {
		const dateText = `Day ${day}/Month ${month}/Year ${year} - Paused: ${pause}`;
		gameDate.innerHTML = dateText;
        
        
		if(!pause) {
			circuits.forEach(circuit => {
				if(month === circuit.month && day === circuit.day) {
					if(!currentSeason.circuitResult) currentSeason.circuitResult = [];
					currentSeason.circuitResult.push(simulateCircuit(circuit, currentSeason));
				}
			});
			calculateDate();
		} else if(pause) {
			// When the game is paused  
		}    
	}, 0);
}

function calculateDate() {
	if(month >= settings.monthsPerYear && day >= settings.daysPerMonth) {
		currentSeason = evaluateSeason(currentSeason);
		updateSeasons(currentSeason);
		seasons.push(currentSeason);
		month = 0;
		year++;

	}
	
	if(day === 1 && month === 1 && year > 0) {
		currentSeason = evaluateTeams(currentSeason);
		currentSeason = evaluateDrivers(currentSeason);

		currentSeason = generateSeason(seasons[year - 1], year, retiredTeams);
	}

	if(day >= settings.daysPerMonth) {
		day = 0;
		month++;
	}
	
	if(!pause) {
		day++;
	}

	if(year === 100) pause = true;
}

function evaluateTeams(season) {
	season.staff.forEach(staff => {
		if(staff.teamEmployed.name && staff.contractLength > 0 && staff.teamsOwned.length === 0) {
			staff.contractLength--;
			staff.cost++;
		}
		if(staff.contractLength === 0) {
			staff = attemptStaffRehire(staff, staff.team);
		}
	});

	season.drivers.forEach(driver => {
		if(driver.team.name && driver.contractLength > 0) {
		// 	driver.contractLength--;
		// 	driver.cost++;
		}
		if(driver.contractLength === 0) {	
			driver = attemptStaffRehire(driver, driver.team);	
			season.teams.forEach(team => {
				team.drivers.forEach(thisDriver => {
					if(thisDriver.name === driver.name) {
						team.drivers = team.drivers.filter(teamDriver => teamDriver.name !== driver.name);
					}
				});
			});

			// driver.team = {};
		}
	});

	return season;
}

function attemptStaffRehire(staff, team) {
	if(team.owner && team.owner.funds > staff.cost) {
		staff.contractLength = getRandomNumber(1, 5);
	}
	else staff.team = {};

	return staff;
}

initialization();
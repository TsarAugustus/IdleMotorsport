import { settings } from './settings.js';
import { Driver } from './Driver.js';
import { Team } from './Team.js';
import { Vehicle } from './Vehicle.js';
import { Staff } from './Staff.js';

import { getRandomNumber } from './getRandomNumber.js';
import { addCircuitsToArray } from './addCircuitsToArray.js';
import { generateSeason } from './generateSeason.js';
import { createTechnologyScreen } from './createTechnologyScreen.js';
import { createCircuitScreen } from './createCircuitScreen.js';

import { firstNames, lastNames } from './Names.js';

import { simulateCircuit } from './simulateCircuit.js';
import { evaluateSeason } from './evaluateSeason.js';

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
	for(let i=0; i<settings.initialVehicleNumber; i++) initialArray.vehicles.push(new Vehicle(`Vehicle ${i}`));
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

	currentSeason = generateSeason(initialArray, year);

	// console.log(currentSeason);
    
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
					currentSeason.circuitResult.push(simulateCircuit(circuit, currentSeason));
					// pause = true;
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
		pause = true;
		month = 0;
		year++;

		currentSeason = evaluateSeason(currentSeason);
		seasons.push(currentSeason);
		currentSeason = generateSeason(seasons[year - 1], year);

		updateSeasons();
	}

	if(day >= settings.daysPerMonth) {
		day = 0;
		month++;
	}

	if(!pause) {
		day++;
	}
}

function updateSeasons() {
	let infoDiv = document.getElementById('info');
	infoDiv.innerHTML = '';

	seasons.forEach(season => {
		let thisSeasonDiv = document.createElement('div');
		thisSeasonDiv.id = season.name;
		thisSeasonDiv.classList.add('season');

		let seasonHeader = document.createElement('span');
		seasonHeader.innerHTML = season.name;
		thisSeasonDiv.appendChild(seasonHeader);

		season.tierResults.forEach(tier => {
			let thisTierDiv = document.createElement('div');
			thisTierDiv.id = tier.rank;
			
			let tierHeader = document.createElement('span');
			tierHeader.innerHTML = tier.rank;
			thisTierDiv.appendChild(tierHeader);

			tier.driverResult.forEach(driver => {
				// console.log(driver)
				let thisDriverDiv = document.createElement('div');
				thisDriverDiv.id = driver.name;

				let driverInfo = document.createElement('span');
				driverInfo.innerHTML = `${driver.name} - ${driver.points}`;
				thisDriverDiv.appendChild(driverInfo);

				thisTierDiv.appendChild(thisDriverDiv);
			})

			thisSeasonDiv.appendChild(thisTierDiv);
		})


		document.getElementById('info').appendChild(thisSeasonDiv);
	})
}

initialization();
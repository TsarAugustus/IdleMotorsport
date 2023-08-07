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

let tabsFunctions = [{
    name: 'Technology',
    function: createTechnologyScreen
}, {
    name: 'Circuits',
    function: createCircuitScreen
}];

let pause = Boolean;
let day = 1;
let month = 1;
let year = 1;

let circuits = [];

function initialization() {

    let initialArray = {
        drivers: [],
        teams: [],
        vehicles: [],
        circuits: addCircuitsToArray(settings.initialCircuitNumber),
        staff: []
    }
    
    //Loops to fill initial Arrays
    //TODO: Make this less bad
    for(let i=0; i<settings.initialDriverNumber; i++) initialArray.drivers.push(new Driver(`Driver ${i}`));
    for(let i=0; i<settings.initialVehicleNumber; i++) initialArray.vehicles.push(new Vehicle(`Vehicle ${i}`));
    for(let i=0; i<settings.initialStaffNumber; i++) initialArray.staff.push(new Staff(`Staff ${i}`));

    circuits = initialArray.circuits;

    let gameDate = document.getElementById('date');
    let dateText = `Day ${day}/Month ${month}/Year ${year} - Paused: ${pause}`;
    gameDate.innerHTML = dateText;

    //Creates pause button
    let pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', () => {
        pause = !pause;
        if(!pause) day++;
    });

    let seasons = [];
    for(let i=0; i<2; i++) {
        if(i === 0) seasons.push(generateSeason(initialArray, i));
        else seasons.push(generateSeason(seasons[i-1], i));
    }

    console.log(seasons);
    // console.log(generateSeason(initialArray));
    
    startInterval();
}

function addTabsToDiv() {
    //Creating tabs
    //This is hardcoded and should be changed
    let container = document.getElementById('tabbedContainer');
    let tabsToAdd = [];
    tabsFunctions.forEach(tab => tabsToAdd.push(tab.name) )
    
    // addTabsToDiv(tabbedContainer,tabsToAdd);
    let tabsDiv = document.createElement('div');
    tabsDiv.id = 'tabs';
    
    tabsToAdd.forEach(tab => {
        let newTab = document.createElement('span');
        newTab.id = tab;
        newTab.innerHTML = tab;
        newTab.addEventListener('click', () => {
            tabsFunctions.forEach(thisTabFunction => { if(thisTabFunction.name === tab) thisTabFunction.function(container, circuits) });
        })
        
        tabsDiv.appendChild(newTab);
    })

    container.insertBefore(tabsDiv, container.firstChild);
}

function startInterval() {
    addTabsToDiv();
    pause = false;
    let gameDate = document.getElementById('date');
    
    setInterval(function() {
        let dateText = `Day ${day}/Month ${month}/Year ${year} - Paused: ${pause}`;
        gameDate.innerHTML = dateText;
        
        
        if(!pause) {
            circuits.forEach(circuit => {
                if(month === circuit.month && day === circuit.day) pause = true;
            });
            calculateDate();
        } else if(pause) {
            // When the game is paused  
        }    
    }, 1000)
}

function calculateDate() {
    if(month >= settings.monthsPerYear && day >= settings.daysPerMonth) {
        month = 0;
        year++;
    }

    if(day >= settings.daysPerMonth) {
        day = 0;
        month++;
    }

    if(!pause) {
        day++;
    }
}

initialization();
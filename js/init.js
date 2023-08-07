import { settings } from './settings.js';
import { Driver } from './Driver.js';
import { Team } from './Team.js';
import { Vehicle } from './Vehicle.js';
import { Staff } from './Staff.js';

import { getRandomNumber } from './getRandomNumber.js';
import { addCircuitsToArray } from './addCircuitsToArray.js';
import { generateSeason } from './generateSeason.js';
import { createTechnologyScreen } from './createTechnologyScreen.js';

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
        driverArray: [],
        teamArray: [],
        vehicleArray: [],
        circuitArray: addCircuitsToArray(settings.initialCircuitNumber),
        staffArray: []
    }
    
    //Loops to fill initial Arrays
    //TODO: Make this less bad
    for(let i=0; i<settings.initialDriverNumber; i++) initialArray.driverArray.push(new Driver(`Driver ${i}`));
    for(let i=0; i<settings.initialVehicleNumber; i++) initialArray.vehicleArray.push(new Vehicle(`Vehicle ${i}`));
    for(let i=0; i<settings.initialStaffNumber; i++) initialArray.staffArray.push(new Staff(`Staff ${i}`));

    circuits = initialArray.circuitArray;

    // createTechnologyScreen();

    let gameDate = document.getElementById('date');
    let dateText = `Day ${day}/Month ${month}/Year ${year} - Paused: ${pause}`;
    gameDate.innerHTML = dateText;

    //Creates pause button
    let pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', () => {
        pause = !pause;
        if(!pause) day++;
    });

    //Creating tabs
    //This is hardcoded and should be changed
    let tabbedContainer = document.getElementById('tabbedContainer');
    let tabsToAdd = [];
    tabsFunctions.forEach(tab => tabsToAdd.push(tab.name) )

    addTabsToDiv(tabbedContainer,tabsToAdd);

    generateSeason(initialArray);

    startInterval();
}

function addTabsToDiv(div, tabs) {
    let tabsDiv = document.createElement('div');
    tabsDiv.id = 'tabs';
    
    tabs.forEach(tab => {
        let newTab = document.createElement('span');
        newTab.id = tab;
        newTab.innerHTML = tab;
        newTab.addEventListener('click', () => {
            tabsFunctions.forEach(thisTabFunction => { if(thisTabFunction.name === tab) thisTabFunction.function(div, circuits) });
        })

        tabsDiv.appendChild(newTab);
    })

    div.insertBefore(tabsDiv, div.firstChild);
}

function createCircuitScreen(div, circuitArray) {    
    let containerDivChildren = div.children;
    let displayContainer;

    for(let child in containerDivChildren) {
        let thisChild = containerDivChildren[child];
        if(thisChild.id === `${div.id}Display`) {
            
            if(thisChild.children.length > 0) thisChild.innerHTML = '';
            displayContainer = thisChild;
        }
    }

    circuitArray.forEach(circuit => {
        let thisCircuitDiv = document.createElement('p');
        thisCircuitDiv.innerHTML = `Name: ${circuit.name} | Date: ${circuit.day}-${circuit.month} | Grade: ${circuit.grade}`;
        displayContainer.appendChild(thisCircuitDiv)
    })
}

function startInterval() {
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
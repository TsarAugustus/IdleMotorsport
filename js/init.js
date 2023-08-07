import { settings } from './settings.js';
import { Driver } from './Driver.js';
import { Team } from './Team.js';
import { Vehicle } from './Vehicle.js';
import { Staff } from './Staff.js';

import { getRandomNumber } from './getRandomNumber.js';
import { addCircuitsToArray } from './addCircuitsToArray.js';
import { generateSeason } from './generateSeason.js';
import { createTechnologyScreen } from './createTechnologyScreen.js';

let pause = Boolean;
let day = 1;
let month = 1;
let year = 1;

let circuits = [];

function initialization() {
    // const initialDriverArray = [];
    // const initialTeamArray = [];
    // const initialVehicleArray = [];
    // const initialCircuitArray = addCircuitsToArray(settings.initialCircuitNumber);
    // const initialStaffArray = [];

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
    // for(let i=0; i<settings.initialTeamNumber; i++) initialArray.teamArray.push(new Team(`Team ${i}`));
    for(let i=0; i<settings.initialVehicleNumber; i++) initialArray.vehicleArray.push(new Vehicle(`Vehicle ${i}`));
    for(let i=0; i<settings.initialStaffNumber; i++) initialArray.staffArray.push(new Staff(`Staff ${i}`));

    circuits = initialArray.circuitArray;

    // createTechnologyScreen();

    generateSeason(initialArray);
    
    createGameArea(initialArray);

    startInterval();
}

function createGameArea(array) {
    let { driverArray, teamArray, vehicleArray, circuitArray, staffArray } = array;
    let circuitListDiv = document.getElementById('circuitList');


    circuitArray.forEach(circuit => {
        let thisCircuitDiv = document.createElement('p');
        thisCircuitDiv.innerHTML = `Name: ${circuit.name} | Date: ${circuit.day}-${circuit.month} | Grade: ${circuit.grade}`;
        // let thisCircuit = '';


        circuitListDiv.appendChild(thisCircuitDiv);
    })
}

function startInterval() {
    let ticker = 0;
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
        } else {
            // When the game is paused
            ticker++;

            if(ticker === 5) {
                ticker = 0;
                pause = false;
                calculateDate();
            }
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
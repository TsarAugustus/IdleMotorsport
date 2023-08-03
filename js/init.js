import { settings } from './settings.js';
import { Driver } from './Driver.js';
import { Team } from './Team.js';
import { Vehicle } from './Vehicle.js';
import { Circuit } from './Circuit.js';
import { Staff } from './Staff.js';

let pause = Boolean;
let day = 1;
let month = 1;
let year = 1;

let circuitArray = [];

function initialization() {
    const initialDriverArray = [];
    const initialTeamArray = [];
    const initialVehicleArray = [];
    const initialCircuitArray = addCircuitsToArray(settings.initialCircuitNumber);
    circuitArray = initialCircuitArray;
    const initialStaffArray = [];
    
    //Loops to fill initial Arrays
    //TODO: Make this less bad
    for(let i=0; i<settings.initialDriverNumber; i++) initialDriverArray.push(new Driver(`Driver ${i}`));
    for(let i=0; i<settings.initialTeamNumber; i++) initialTeamArray.push(new Team(`Team ${i}`));
    for(let i=0; i<settings.initialVehicleNumber; i++) initialVehicleArray.push(new Vehicle(`Vehicle ${i}`));
    // for(let i=0; i<settings.initialCircuitNumber; i++) initialCircuitArray.push(new Circuit(`Circuit ${i}`));
    // initialCircuitArray.push(addCircuitsToArray(settings.initialCircuitNumber))
    for(let i=0; i<settings.initialStaffNumber; i++) initialStaffArray.push(new Staff(`Staff ${i}`));

    generateSeason(
        initialDriverArray,
        initialTeamArray,
        initialVehicleArray,
        initialCircuitArray,
        initialStaffArray
    )
    
    pause = false;
    startInterval()
    console.log(circuitArray)
}

function addCircuitsToArray(numberOfCircuits) {
    let list = [];

    for(let i=0; i<numberOfCircuits; i++) {
        let circuit = new Circuit(
            `Circuit ${i}`,
            getRandomNumber(1, settings.daysPerMonth),
            getRandomNumber(1, settings.monthsPerYear),
            getRandomNumber(1, 3)
        );

        list.push(circuit)
    }
    
    // If there are Circuits that are the exact same dates and grade, then redo the generation
    list.sort(function(a, b) {
        if(a.month === b.month && a.day === b.day && a.grade === b.grade)
            list = addCircuitsToArray(numberOfCircuits);
    });

    // Sort the Circuit dates according to month first
    // Then sort the Circuit dates to days with that month
    list.sort(function(a, b) {
        if(a.month === b.month) 
            return a.day - b.day;
        else if(a.month > b.month) 
            return 1
        else if(a.month < b.month) 
            return -1
    })

    return list
}

function startInterval() {
    let ticker = 0;
    setInterval(function() {
        if(!pause) {
            console.log(`Day ${day}/Month ${month}/Year ${year}`, pause);
            
            circuitArray.forEach((circuit, index) => {
                if(month === circuit.month && day === circuit.day) pause = true;
            });
            calculateDate();
        }  else {
            ticker++
            if(ticker === 1) {
                ticker = 0;
                pause = false
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

function generateSeason(drivers, teams, vehicles, circuits, staff) {
    let thisSeason = {

    }
    // console.log('Season Circuits: ', circuits)
    return thisSeason;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

initialization();
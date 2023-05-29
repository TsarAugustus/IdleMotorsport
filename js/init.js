import { mapHTML } from './mapHTML.js';
import { createMap } from "./createMap.js";
import { generate } from './generate.js';
import { generateGrid } from './generateGrid.js';
import { createCircuitMap } from './createCircuitMap.js';
// import { initializeHTML } from './initializeHTML.js';

let paddock = {
    
};

let setup = {
    circuitsToGenerate: 100,
    regionCount: 5,
    minX: 0,
    maxX: 30,
    minY: 0,
    maxY: 30,
    tiers: 5,
    totalDrivers: 50,
    totalTeams: 10,
    driversPerTeam: 1,
    totalFaculty: 50,
    totalFacultyType: 1,
    seasons: 1
}

function init() {
    // initializeHTML();
    let worldMap = createMap(setup);
    start(worldMap, setup);
    mapHTML(worldMap, setup, paddock);
}

function start(worldMap, setup) {
    // let state = document.getElementById('gameEnabledButton').checked;
    // if(state) console.log('Start with Player')
    paddock.circuits = createCircuitMap(worldMap, setup);
    paddock.grid = generateGrid(worldMap, setup);
    paddock.result = generate(worldMap, setup, paddock);

    return paddock
}

window.onload = (e) => init();
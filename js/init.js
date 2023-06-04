import { mapHTML } from './mapHTML.js';
import { createMap } from "./createMap.js";
import { generate } from './generate.js';
import { generateGrid } from './generateGrid.js';
import { createCircuitMap } from './createCircuitMap.js';
// import { initializeHTML } from './initializeHTML.js';

let paddock = {
    
};

let setup = {
    circuitsToGenerate: 20,
    regionCount: 4,
    minX: 0,
    maxX: 0, 
    minY: 0,
    maxY: 0, 
    tiers: 5,
    totalDrivers: 0,
    totalTeams: 0,
    driversPerTeam: 1,
    totalFaculty: 0,
    totalFacultyType: 1,
    seasons: 1
}

//Test
// For now, the best way to generate is if the world length is
// double the amount of regions. Lots of call stacks happen and 
// crashed otherwise.
// TODO: FIX MAP GENERATION
setup.maxX          = setup.regionCount * 2;
setup.maxY          = setup.regionCount * 2;
setup.totalTeams    = setup.regionCount * 25;
setup.totalDrivers  = setup.regionCount * 25;
setup.totalFaculty  = setup.regionCount * 25;
function init() {
    // initializeHTML();
    let worldMap = createMap(setup);
    if(worldMap === undefined) {
        init();
    }
    if(worldMap !== undefined)  {
        start(worldMap, setup);
        mapHTML(worldMap, setup, paddock);
    }
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
import { initializeHTML } from './initializeHTML.js';
import { createCircuitMap } from './createCircuitMap.js';
import { generate } from './generate.js';
import { mapHTML } from './mapHTML.js';

let paddock = {
    
};

let setup = {
    circuitsToGenerate: 100,
    regionCount: 5,
    minX: 0,
    maxX: 30,
    minY: 0,
    maxY: 30,
    tiers: 6,
    totalDrivers: 100,
    totalTeams: 20,
    seasons: 2
}

function init() {
    // initializeHTML();
    let map = createCircuitMap(setup);
    start(paddock, setup, map);
    mapHTML(map, setup, paddock);
}

function start(paddock, setup, map) {
    // let state = document.getElementById('gameEnabledButton').checked;
    // if(state) console.log('Start with Player')
    paddock.result = generate(paddock, setup, map);

    return paddock
}

window.onload = (e) => init();
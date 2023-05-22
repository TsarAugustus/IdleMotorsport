import { initializeHTML } from "./initializeHTML.js";
import { createCircuitMap } from "./createCircuitMap.js";
import { generate } from "./generate.js";
import { mapHTML } from "./mapHTML.js";
import { createChampionshipTiers } from "./createChanmpionshipTiers.js";

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
    totalFreeDrivers: 100,
    totalTeams: 100
}

function init() {
    // initializeHTML();
    let map = createCircuitMap(setup);
    let championshipTiers = createChampionshipTiers(map, setup);
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
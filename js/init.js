import { initializeHTML } from "./initializeHTML.js";
import { createCircuitMap } from "./createCircuitMap.js";
import { generate } from "./generate.js";
import { mapHTML } from "./mapHTML.js";

let paddock = {
    teamLimit: 10,
    driverLimit: 2,
    seasons: 1
};

let setup = {
    circuitsToGenerate: 100,
    regionCount: 5,
    minX: 0,
    maxX: 30,
    minY: 0,
    maxY: 30,
    tiers: 5
}

function init() {
    // initializeHTML();
    let map = createCircuitMap(setup);
    let championshipTiers = createChampionshipTiers(map, setup);
    start(paddock, setup);
    mapHTML(map, setup, paddock);
}

function start(paddock) {
    // let state = document.getElementById('gameEnabledButton').checked;
    // if(state) console.log('Start with Player')

    paddock.result = generate(paddock, setup);

    return paddock
}

function createChampionshipTiers(map, setup) {
    let tiers = setup.tiers;
}

window.onload = (e) => init();
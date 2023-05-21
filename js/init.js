import { initializeHTML } from "./initializeHTML.js";
import { createCircuitMap } from "./createCircuitMap.js";
import { generate } from "./generate.js";

let paddock = {
    teamLimit: 10,
    driverLimit: 2,
    seasons: 1,
    tiers: 5
};

let setup = {
    circuitsToGenerate: 20,
    regionCount: 7,
    minX: 0,
    maxX: 100,
    minY: 0,
    maxY: 100
}

function init() {
    // initializeHTML();
    start(paddock)
    let map = createCircuitMap(setup);
    console.log(map)
}

function start(paddock) {
    // let state = document.getElementById('gameEnabledButton').checked;
    // if(state) console.log('Start with Player')

    paddock.result = generate(paddock);

    return paddock
}

window.onload = (e) => init();
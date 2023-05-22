import { createMap } from "./createMap.js";
import { createCircuit } from "./createCircuit.js";

function createCircuitMap(setup) {
    let circuitArray = [];
    let map = createMap(setup);
    for(let i=0; i<setup.circuitsToGenerate; i++) circuitArray.push(createCircuit(i, map, setup));

    let trackTiers = {};
    circuitArray.forEach(track => {
        if(!trackTiers[track.tier]) trackTiers[track.tier] = [];
        trackTiers[track.tier].push(track);
    });

    let trackTiersValues = Object.values(trackTiers);

    return {tracks: circuitArray, regions: map, tiers: trackTiers};
}

export { createCircuitMap }
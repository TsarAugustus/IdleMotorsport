import { createMap } from "./createMap.js";
import { createCircuit } from "./createCircuit.js";

function createCircuitMap(setup) {
    let circuitArray = [];
    let map = createMap(setup);
    for(let i=0; i<setup.circuitsToGenerate; i++) circuitArray.push(createCircuit(i, map, setup));

    let circuitTiers = {};
    circuitArray.forEach(circuit => {
        if(!circuitTiers[circuit.tier]) circuitTiers[circuit.tier] = [];
        circuitTiers[circuit.tier].push(circuit);
    });

    let circuitTiersValues = Object.values(circuitTiers);

    return {circuits: circuitArray, regions: map, trackTiers: circuitTiers};
}

export { createCircuitMap }
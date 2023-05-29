import { createCircuit } from "./createCircuit.js";

function createCircuitMap(worldMap, setup) {
    let circuitArray = [];
    for(let i=0; i<setup.circuitsToGenerate; i++) circuitArray.push(createCircuit(i, worldMap, setup));

    let circuitTiers = {};
    circuitArray.forEach(circuit => {
        if(!circuitTiers[circuit.tier]) circuitTiers[circuit.tier] = [];
        circuitTiers[circuit.tier].push(circuit);
    });
    
    return {circuits: circuitArray, circuitTiers: circuitTiers};
}

export { createCircuitMap }
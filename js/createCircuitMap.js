import { createMap } from "./createMap.js";
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

function createCircuit(circuitNumber, map, setup) {
    let circuit = {
        name: circuitNumber,    
        tier: randomNumber(1, setup.tiers),
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1)
    }

    map.forEach((region, index) => {
        let xConditions = circuit.xPosition >= region.xStart && circuit.xPosition <= region.xEnd;
        let yConditions = circuit.yPosition >= region.yStart && circuit.yPosition <= region.yEnd;
        if(xConditions && yConditions) {
            circuit.region = region;
            map[index].tracks.push(circuit)
        }
    })

    return circuit;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createCircuitMap }
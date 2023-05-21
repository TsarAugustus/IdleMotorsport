import { createMap } from "./createMap.js";
function createCircuitMap(setup) {
    let circuitArray = [];
    let map = createMap(setup);
    for(let i=0; i<setup.circuitsToGenerate; i++) circuitArray.push(createCircuit(i, map, setup));

    circuitArray.forEach((circuit, circuitIndex) => {
        let nextCircuit = circuitArray[circuitIndex + 1];
        
        if(nextCircuit) circuitArray[circuitIndex].distance = getDistance(circuit, nextCircuit);
    });

    return {tracks: circuitArray, regions: map};
}

function getDistance(thisCircuit, nextCircuit) {
    let xDistance = Math.abs(nextCircuit.xPosition - thisCircuit.xPosition);
    let yDistance = Math.abs(nextCircuit.yPosition - thisCircuit.yPosition);

    return xDistance + yDistance;
}

function createCircuit(circuitNumber, map, setup) {
    let circuit = {
        name: circuitNumber,    
        xPosition: randomNumber(setup.minX, setup.maxX),
        yPosition: randomNumber(setup.minY, setup.maxY)
    }

    map.forEach((region, index) => {
        let xConditions = circuit.xPosition > region.xStart && circuit.xPosition < region.xEnd;
        let yConditions = circuit.yPosition > region.yStart && circuit.yPosition < region.yEnd;
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
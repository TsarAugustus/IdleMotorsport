function createCircuit(circuitNumber, map, setup) {
    let circuit = {
        name: `Circuit ${circuitNumber}`,    
        tier: randomNumber(1, setup.tiers),
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1)
    }

    map.forEach((region, index) => getCircuitRegion(map, circuit, region, index));

    return circuit;
}

function getCircuitRegion(map, circuit, region, index){
    let xConditions = circuit.xPosition >= region.xStart && circuit.xPosition <= region.xEnd;
    let yConditions = circuit.yPosition >= region.yStart && circuit.yPosition <= region.yEnd;
    if(xConditions && yConditions) {
        circuit.region = region;
        map[index].circuits.push(circuit)
    }
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createCircuit }
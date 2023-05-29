function createCircuit(circuitNumber, worldMap, setup) {
    let circuit = {
        name: `Circuit ${circuitNumber}`,    
        tier: randomNumber(1, setup.tiers),
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1)
    }

    worldMap.forEach(area => getCircuitRegion(circuit, area));

    return circuit;
}

function getCircuitRegion(circuit, area) {
    if(area.xPosition === circuit.xPosition && area.yPosition === circuit.yPosition) circuit.region = area.region
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createCircuit }
function createMap(setup) {
    let regionArray = [];

    let regionCount = setup.regionCount;
    let xLength = setup.minX + setup.maxX;
    let yLength = setup.minY + setup.maxY;
    let northHemisphereRegions = Math.round(regionCount / 2) - (randomNumber(0, 1));
    let southHemisphereRegions = regionCount - northHemisphereRegions;
    let xLengthPerNorthRegion = xLength / northHemisphereRegions;
    let xLengthPerSouthRegion = xLength / southHemisphereRegions;
    
    //TODO: Condense into a single loop, or function
    for(let i=0; i<northHemisphereRegions; i++) regionArray.push({
        region: i, 
        xStart: Math.round(i * xLengthPerNorthRegion),
        xEnd: Math.round(i * xLengthPerNorthRegion + xLengthPerNorthRegion) - 1,
        yStart: setup.minY,
        yEnd: (setup.maxY / 2) - 1,
        circuits: []
    });

    for(let i=0; i<southHemisphereRegions; i++) regionArray.push({
        region: regionArray.length + 1,
        xStart: Math.round(i * xLengthPerSouthRegion),
        xEnd: Math.round(i * xLengthPerSouthRegion + xLengthPerSouthRegion) - 1,
        yStart: setup.maxY / 2,
        yEnd: setup.maxY - 1,
        circuits: []
    });
    
    return regionArray
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createMap }
function createMap(setup) {
    let regionArray = [];

    let regionCount = setup.regionCount;
    let xLength = setup.minX + setup.maxX;
    let yLength = setup.minY + setup.maxY;
    let maxRegionArea = Math.round((xLength * yLength) / regionCount);
    let mapArea = createMapArea(xLength, yLength);

    for(let i=0; i<regionCount; i++){
        let capital = getCapital(mapArea, i);

        let newRegion = createRegion(capital, mapArea, i, maxRegionArea);
        newRegion.capital = capital;

        regionArray.push(newRegion);
    }
    
    return mapArea
}

function createRegion(capital, mapArea, num, maxRegionArea) {
    let thisRegion = [];
    let lastRegion = {};

    if(!lastRegion.region) lastRegion = capital;
    for(let i=0; i<maxRegionArea; i++) {
        let availableRegion = checkRegion(lastRegion, mapArea, num);
        if(availableRegion.circuits) {
            availableRegion.region = `Region ${num}`;
            lastRegion = availableRegion;
            thisRegion.push(availableRegion);
        }
    }

    return thisRegion;
}

function checkRegion(lastRegion, mapArea, num) {
    let thisArea = {};

    mapArea.forEach(area => {
        if      (!area.region && lastRegion.xPosition + 1 === area.xPosition && lastRegion.yPostion === area.yPostion) { thisArea = area; }
        else if (!area.region && lastRegion.xPosition - 1 === area.xPosition && lastRegion.yPostion === area.yPostion) { thisArea = area; }
        else if (!area.region && lastRegion.xPosition + 1 === area.yPosition && lastRegion.xPostion === area.xPostion) { thisArea = area; }
        else if (!area.region && lastRegion.yPosition - 1 === area.yPosition && lastRegion.xPostion === area.xPostion) { thisArea = area; }
        else if(!area.region) { thisArea = area; }
    });

    return thisArea;
}

function getCapital(mapArea, num) {
    let randomRegion = mapArea[randomNumber(0, mapArea.length)];
    if(randomRegion && !randomRegion.region) randomRegion.region = `Region ${num}`;
    else randomRegion = getCapital(mapArea, num)

    return randomRegion
}

function createMapArea(xLength, yLength) {
    let mapArray = [];
    for(let i=0; i<yLength; i++) for(let ii=0; ii<xLength; ii++) mapArray.push({
        xPosition: i,
        yPosition: ii,
        circuits: [],
        region: undefined
    })

    return mapArray;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createMap }
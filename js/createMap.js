function createMap(setup) {
    // console.log('Create Map')
    let regionArray = [];
    let regionCount = setup.regionCount;
    let xLength = setup.minX + setup.maxX;
    let yLength = setup.minY + setup.maxY;
    let maxRegionArea = Math.round((xLength * yLength) / regionCount);
    let mapArea = createMapArea(xLength, yLength);
    
    for(let i=0; i<regionCount; i++) { regionArray.push(createRegion(mapArea, maxRegionArea, i)) }
    
    if(checkMapArea(mapArea) === false) createMap(setup);
    else return mapArea  
}

function checkMapArea(mapArea) {
    let bool = true;
    mapArea.forEach(area => { if(area.region === undefined && area.capital === undefined) bool = false })
    return bool;
}

function createRegion(mapArea, maxRegionArea, num) {
    let regionCapital = getCapital(mapArea, num);
    regionCapital.capital = true;
    let thisRegion = [regionCapital];

    for(let i=thisRegion.length; i<maxRegionArea; i++) { thisRegion.push(findArea(mapArea, thisRegion, num))}
    return thisRegion;
}

function findArea(mapArea, thisRegion, num) {
    let thisArea = {};

    thisRegion.forEach(regionArea => mapArea.forEach(area => {
        let xCheck = ((regionArea.xPosition + 1 === area.xPosition || regionArea.xPosition - 1 === area.xPosition) && regionArea.yPosition === area.yPosition);
        let yCheck = ((regionArea.yPosition + 1 === area.yPosition || regionArea.yPosition - 1 === area.yPosition) && regionArea.xPosition === area.xPosition);
        if(area.region === undefined && (xCheck || yCheck)) thisArea = area
    }));
    
    thisArea.region = num;
    return thisArea;
}

function getCapital(mapArea, num) {
    let randomRegion = mapArea[randomNumber(0, mapArea.length - 1)];

    if(randomRegion.region !== undefined) getCapital(mapArea, num);

    randomRegion.region = num;
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
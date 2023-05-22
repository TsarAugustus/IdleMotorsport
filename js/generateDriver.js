function generateDriver(num, setup, map) {
    let driver = {
        name: `Driver ${num + 1}`,
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1),
        region: {}
    };

    map.regions.forEach(region => getDriverRegion(region, driver));
    
    return driver;
}

function getDriverRegion(region, driver) {
    let xConditions = region.xStart <= driver.xPosition && region.xEnd >= driver.xPosition;
    let yConditions = region.yStart <= driver.yPosition && region.yEnd >= driver.yPosition
    if(xConditions && yConditions) driver.region = region
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generateDriver }
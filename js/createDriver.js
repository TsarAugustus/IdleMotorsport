function createDriver(worldMap, setup, num) {
    let driver = {
        name: `Driver ${num + 1}`,
        tier: setup.tiers,
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1),
        seasons: [],
        region: {},
        team: {},
        active: false
    };

    worldMap.forEach(area => getDriverRegion(area, driver));
    return driver;
}

function getDriverRegion(area, driver) {
    if(area.xPosition === driver.xPosition && area.yPosition === driver.yPosition) driver.region = area.region
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createDriver }
function attemptDriverBuy(team, tier) {
    let driver = {};
    let potentialDriver = {};

    tier.availableDrivers.forEach(thisDriver => potentialDriver = driverCheck(potentialDriver, thisDriver));
    
    driver = potentialDriver;

    if(driver.name) tier.availableDrivers.forEach((thisDriver, index) => thisDriver.name === driver.name ? tier.availableDrivers.splice(index, 1)  : '');
    return driver;
}

function driverCheck(potentialDriver, thisDriver) {
    let newDriver = {}

    let affordable = true;
    if(!potentialDriver.name) newDriver = thisDriver;
    else if(affordable) newDriver = thisDriver;

    return newDriver;
}

export { attemptDriverBuy }
function attemptDriverBuy(driverArray) {
    let driver = {};
    let potentialDriver = {};

    driverArray.forEach(thisDriver => potentialDriver = driverCheck(potentialDriver, thisDriver));
    
    driver = potentialDriver;
    
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
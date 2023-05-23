function attemptDriverBuy(driverArray) {
    let driver = {};
    let potentialDriver = {};

    driverArray.forEach(thisDriver => {
        let affordable = true;
        if(!potentialDriver.name) potentialDriver = thisDriver;
        else if(affordable) potentialDriver = thisDriver
    });

    driver = potentialDriver;

    return driver;
}

export { attemptDriverBuy }
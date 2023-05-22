function generateDriver(num, setup) {
    let driver = {
        name: `Driver ${num + 1}`,
        xPos: randomNumber(setup.minX, setup.maxX),
        yPos: randomNumber(setup.minY, setup.maxY)
    };
    
    return driver;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generateDriver }
function stepCircuit(circuits, driver) {
    let result = {
        driver,
        value: randomNumber(1, 1000)
    }

    return result;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { stepCircuit }
import { generateDriver } from "./generateDriver.js";

function generateGrid(paddock, setup) {
    let grid = {};
    let driversToGenerate = paddock.teamLimit * paddock.driverLimit;

    let freeDrivers = [];
    for(let i=0; i<driversToGenerate; i++) freeDrivers.push(generateDriver(i, setup));
    grid.freeDrivers = freeDrivers;

    return grid;
}

export { generateGrid }
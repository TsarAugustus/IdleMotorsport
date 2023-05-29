import { createDriver } from "./createDriver.js";
import { generateTeams } from "./generateTeams.js";
import { createFaculty } from './createFaculty.js';

function generateGrid(worldMap, setup) {
    let grid = {
        teams: [],
        drivers: [],
        faculty: []
    };
    
    for(let i=0; i<setup.totalDrivers; i++) grid.drivers.push(createDriver(worldMap, setup, i));
    for(let i=0; i<setup.totalTeams; i++) grid.teams.push(generateTeams(worldMap, setup, i));
    for(let i=0; i<setup.totalFaculty; i++) grid.faculty.push(createFaculty(i, setup));
    return grid;
}

export { generateGrid }
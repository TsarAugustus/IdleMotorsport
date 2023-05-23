import { createDriver } from "./createDriver.js";
import { generateTeams } from "./generateTeams.js";
import { createFaculty } from './createFaculty.js';

function generateGrid(paddock, setup, map) {
    let grid = {
        teams: [],
        drivers: [],
        faculty: []
    };
    
    for(let i=0; i<setup.totalDrivers; i++) grid.drivers.push(createDriver(i, setup, map));
    for(let i=0; i<setup.totalTeams; i++) grid.teams.push(generateTeams(i, setup, map));
    for(let i=0; i<setup.totalFaculty; i++) grid.faculty.push(createFaculty(i, setup));

    return grid;
}

export { generateGrid }
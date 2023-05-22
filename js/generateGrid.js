import { generateDriver } from "./generateDriver.js";
import { generateTeams } from "./generateTeams.js";

function generateGrid(paddock, setup, map) {
    let grid = {
        teams: [],
        drivers: []
    };
    
    for(let i=0; i<setup.totalDrivers; i++) grid.drivers.push(generateDriver(i, setup, map));
    for(let i=0; i<setup.totalTeams; i++) grid.teams.push(generateTeams(i, setup, map));

    return grid;
}

export { generateGrid }
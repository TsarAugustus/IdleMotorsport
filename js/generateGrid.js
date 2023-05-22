import { generateDriver } from "./generateDriver.js";
import { generateTeams } from "./generateTeams.js";

function generateGrid(paddock, setup, map) {
    let grid = {};

    let drivers = [];
    let teams = [];
    for(let i=0; i<setup.totaldrivers; i++) drivers.push(generateDriver(i, setup, map));
    for(let i=0; i<setup.totalTeams; i++) teams.push(generateTeams(i, setup, map));
    
    grid.drivers = drivers;
    grid.teams = teams;
    
    return grid;
}

export { generateGrid }
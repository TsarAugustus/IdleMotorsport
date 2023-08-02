import { settings } from './settings.js';
import { Driver } from './Driver.js';
import { Team } from './Team.js';
import { Vehicle } from './Vehicle.js';
import { Circuit } from './Circuit.js';
import { Staff } from './Staff.js';

function initialization() {
    const initialDriverArray = [];
    const initialTeamArray = [];
    const initialVehicleArray = [];
    const initialCircuitArray = [];
    const initialStaffArray = [];
    
    //Loops to fill initial Arrays
    //TODO: Make this less bad
    for(let i=0; i<settings.initialDriverNumber; i++) initialDriverArray.push(new Driver(`Driver ${i}`));
    for(let i=0; i<settings.initialTeamNumber; i++) initialTeamArray.push(new Team(`Team ${i}`));
    for(let i=0; i<settings.initialVehicleNumber; i++) initialVehicleArray.push(new Vehicle(`Vehicle ${i}`));
    for(let i=0; i<settings.initialCircuitNumber; i++) initialCircuitArray.push(new Circuit(`Circuit ${i}`));
    for(let i=0; i<settings.initialStaffNumber; i++) initialStaffArray.push(new Staff(`Staff ${i}`));

    generateSeason(
        initialDriverArray,
        initialTeamArray,
        initialVehicleArray,
        initialCircuitArray,
        initialStaffArray
    )
}

function generateSeason(drivers, teams, vehicles, circuits, staff) {
    let thisSeason = {

    }

    return thisSeason;
}

initialization()
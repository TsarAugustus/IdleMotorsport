import { Team } from './Team.js';
import { settings } from './settings.js';

function generateSeason(array) {
    let { driverArray, teamArray, vehicleArray, circuitArray, staffArray } = array;
    
    let thisSeason = {
        drivers: driverArray,
        teams: teamArray,
        vehicles: vehicleArray,
        circuits: circuitArray,
        staff: staffArray
    }

    let teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
    
    let teamOwnerPool = [];
    teamOwnerPool = staffArray;
    
    // Fill Staff ownedTeams array if Staff owns a Team
    thisSeason.teams = createSeasonTeams(driverArray, teamOwnerPool, teamsToGenerate);
    thisSeason.staff.forEach(staff => {
        thisSeason.teams.forEach(team => {
            if(team.owner.name === staff.name) staff.teamOwned.push(team);
        })
    });

    return thisSeason;
}

function createSeasonTeams(driverArray, teamOwnerPool, teamsToGenerate) {
    let potentialTeams = [];

    for(let i=0; i<teamsToGenerate; i++) {
        let team = new Team(`Team ${i}`);
        let potentialOwner = teamOwnerPool[Math.floor(Math.random() * teamOwnerPool.length)];
        teamOwnerPool = teamOwnerPool.filter(poolItem => poolItem.name !== potentialOwner.name);
        let potentialDrivers = [];
        let ownerFunds = potentialOwner.funds;


        driverArray.forEach(driver => {
            if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team) {
                potentialDrivers.push(driver);
                ownerFunds -= driver.cost;
            }

        });
        
        for(let driver of potentialDrivers) {
            let contractCost = driver.cost;

            team.owner = potentialOwner;
            // staff.teamOwned.push(potentialOwner);
            driver.team = team;
            team.drivers.push(driver);
            potentialOwner.funds -= contractCost;
            driver.funds += contractCost;
        }

        if(team.drivers.length > 0) potentialTeams.push(team);
    }

    return potentialTeams;
}

export { generateSeason }
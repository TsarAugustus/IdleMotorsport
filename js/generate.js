import { stepTier } from './stepTier.js';
import { attemptCEOTeamBuy } from './attemptCEOTeamBuy.js';
import { attemptFacultyBuy } from './attemptFacultyBuy.js';
import { attemptDriverBuy } from './attemptDriverBuy.js'

function generate(worldMap, setup, paddock) {
    let seasonArray = [];

    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(i, worldMap, setup, paddock));
    console.log(seasonArray)
    return seasonArray
}

function generateSeason(num, worldMap, setup, paddock) {
    let season = {
        name: `Season ${num}`,
        tiers: generateTiers(setup, paddock)
    }
    season.tiers.forEach(tier => tier.result.push(stepTier(tier)));
    
    return season;
}

function generateTiers(setup, paddock) {
    let tierArray = [];
    for(let i=0; i<setup.tiers; i++) {
        tierArray.push(createTier(setup, paddock, i))
    }
    
    tierArray.forEach(tier => evaluateTier(setup, tier));

    tierArray.forEach(tier => tier.teams.forEach(team => team.drivers.forEach(driver => { tier.ranking.push({ name: driver.name, points: 0 }); tier.drivers.push(driver) })));

    return tierArray;
}

function evaluateTier(setup, tier) {
    let teamsToCreate = tier.totalTeams - tier.teams.length;
    
    for(let i=0; i<teamsToCreate; i++) {
        let ceoArray = tier.availableFaculty.filter(member => member.type === 'CEO');
        let thisCEO = ceoArray[randomNumber(0, ceoArray.length - 1)];
        let teamAttempt = {};
        if(thisCEO) teamAttempt = attemptCEOTeamBuy(thisCEO, tier.availableTeams);
        if(teamAttempt.name) {
            ceoArray = ceoArray.filter(ceo => ceo.name !== thisCEO.name)
            // thisCEO.active = true;
            // teamAttempt.active = true;
            teamAttempt.CEO = thisCEO;
            tier.availableFaculty = tier.availableFaculty.filter(member => member.name !== thisCEO.name);
            tier.teams.push(teamAttempt);
            tier.availableTeams = tier.availableTeams.filter(team => team.name !== teamAttempt.name);
        }
    }
    tier.teams.forEach(team => { 
        for(let i=0; i<tier.driversPerTeam; i++) { 
            let driverAttempt = attemptDriverBuy(team, tier);
            if(driverAttempt.name) tier.availableDrivers.filter(driver => driver.name !== driverAttempt.name)
            team.drivers.push(attemptDriverBuy(team, tier)) 
        }
    })
    tier.teams.forEach(team => evaluateFaculty(team, tier));
}

function evaluateFaculty(team, tier) {
    let thisTypes = tier.facultyTypes
    if(team.CEO) thisTypes = thisTypes.filter(type => type !== 'CEO')

    thisTypes.forEach(type => {
       let facultyKey = Object.keys(team).find(key => key === type);
       let newFaculty = {};
       if(!facultyKey) newFaculty = attemptFacultyBuy(type, tier.availableFaculty);
       //newFaculty.active = true;
       tier.availableFaculty = tier.availableFaculty.filter(member => member.name !== newFaculty.name)
       team[type] = newFaculty
    });

    Object.keys(team).forEach((key, index) => {
        let value = Object.values(team)[index];
        let facultyType = tier.facultyTypes.find(type => type === key)
        if(facultyType && !value.name || team.drivers.length === 0) { removeTeamMembers(team, tier); tier.teams.splice(tier.teams.indexOf(team), 1) }
    })
}

function removeTeamMembers(team, tier) {
    tier.facultyTypes.forEach(type => {
        if(team[type].name) tier.availableFaculty.push(team[type]);
        team[type] = {}
    })

    team.drivers.forEach((driver, index) => {
        tier.availableDrivers.push(driver);
        team.drivers.splice(index, 1);
    })
}

function createTier(setup, paddock, num) {
    let tier = {
        name: `Tier ${num}`,
        driversPerTeam: setup.driversPerTeam,
        totalDrivers: setup.totalTeams * setup.driversPerTeam,
        totalTeams: setup.totalTeams,
        totalFaculty: setup.tiers - num,
        availableDrivers: findTierItems(paddock.grid.drivers, num),
        availableTeams: findTierItems(paddock.grid.teams, num),
        availableFaculty: findTierItems(paddock.grid.faculty, num),
        availableCircuits: findTierItems(paddock.circuits.circuits, num),
        facultyTypes: [],
        drivers: [],
        teams: [],
        faculty: [],
        result: [],
        ranking: []
    }

    let types = [];
    paddock.grid.faculty.forEach(member => !types.find(type => member.type === type) ? types.push(member.type) : '');
    tier.facultyTypes = types

    return tier;
}

function findTierItems(itemArray, num) {
    return itemArray.filter(item => item.tier === num + 1)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generate }
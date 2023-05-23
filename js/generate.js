import { generateGrid } from './generateGrid.js';
import { createChampionshipTiers } from './createChampionshipTiers.js';

function generate(paddock, setup, map) {
    let seasonArray = [];
    
    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map);
    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(paddock, map, setup, i));
    
    // console.log(seasonArray);
    return seasonArray;
}

function activeOrNot(array, bool) { return array.filter(arrayItem => arrayItem.active === bool)}

function generateSeason(paddock, map, setup, seasonNum) {
    let championshipTiers = createChampionshipTiers(map, setup, paddock);
    let season = {
        name: `Season ${seasonNum + 1}`,
        paddock,
        map,
        championshipTiers
    };

    let result = [];
    championshipTiers.forEach(tier => result.push(tierSimulation(tier, setup)));
    
    console.log('result', result);
    console.log('champTiers', championshipTiers)
        
    return season;
}
    
function tierSimulation(tier, setup) {
    let facultyTypes = getFacultyTypes(tier);
    
    let tierResult = {
        tier: tier.tier
    }
    
    let ceoArray = tier.faculty.filter(member => member.type === 'CEO');

    let teamsNeeded = setup.totalTeams - activeOrNot(tier.teams, true).length;

    for(let i=0; i<teamsNeeded; i++) activeOrNot(ceoArray, false).forEach(ceo => attemptTeamConstruction(ceo, tier, setup, facultyTypes));

    return tierResult;
}

function attemptTeamConstruction(ceo, tier, setup, facultyTypes) {
    let team = {};
    let potentialTeam = attemptCEOTeamBuy(ceo, activeOrNot(tier.teams, false));
    let faculty = [];
    let drivers = [];
    
    if(potentialTeam.name) facultyTypes.forEach(type => faculty.push(attemptFacultyBuy(type, activeOrNot(tier.faculty, false))));

    let teamEngineer = faculty.find(member => member.type === 'ENGINEER');
    if(undefined !== teamEngineer) {
        for(let i=0; i<setup.driversPerTeam; i++) drivers.push(attemptDriverBuy(activeOrNot(tier.drivers, false)))
    }

    //Should be cleaned up
    //Works for now
    if(potentialTeam.name && faculty.length === facultyTypes.length && drivers.length > 0 && drivers.length) {
        team = potentialTeam
        potentialTeam.active = true;
        
        team.ceo = ceo;
        team.faculty = faculty;
        team.drivers = drivers

        ceo.active = true;
        faculty.forEach(member => member.active = true);
        drivers.forEach(driver => driver.active = true);

        ceo.xPosition = team.xPosition;
        ceo.yPosition = team.yPosition;
        faculty.forEach(member => { member.xPosition = team.xPosition; member.yPosition = team.yPosition });
        drivers.forEach(driver => { driver.xPosition = team.xPosition; driver.yPosition = team.yPosition});
    }

    return team;
}

function attemptDriverBuy(driverArray) {
    let driver = {};
    let potentialDriver = {};

    driverArray.forEach(thisDriver => {
        let affordable = true;
        if(!potentialDriver.name) potentialDriver = thisDriver;
        else if(affordable) potentialDriver = thisDriver
    });

    driver = potentialDriver;

    return driver;
}

function attemptFacultyBuy(type, facultyArray) {
    let facultyOfType = facultyArray.filter(member => member.type === type);

    let member = {};
    let potentialMember = {};

    //MAKE SURE FACULTY HAVE AN ORIGINAL X/Y POSITION TO REFER TO
    //MAKE FACULTY MOVE TO TEAM X/Y POSITION
    facultyOfType.forEach(member => {
        let affordable = true;

        if(!potentialMember.name) potentialMember = member;
        else if(affordable) potentialMember = member
    });

    member = potentialMember;

    return member;
}

function attemptCEOTeamBuy(ceo, freeTeams) {
    let team = {};
    let potentialTeam = {};
    
    freeTeams.forEach(thisTeam => {
        let affordable = true;
        let potentialTeamDistance = getDistance(potentialTeam.xPosition, ceo.xPosition) + getDistance(potentialTeam.yPosition, ceo.yPosition);
        let thisTeamDistance = getDistance(thisTeam.xPosition, ceo.xPosition) + getDistance(thisTeam.yPosition, ceo.yPosition);

        if(!potentialTeam.name && affordable) potentialTeam = thisTeam;
        else if(affordable && potentialTeamDistance < thisTeamDistance) potentialTeam = thisTeam
        
    });
    
    team = potentialTeam;

    return team;
}

function getDistance(a, b) {
    return Math.abs(a - b);
}

function getFacultyTypes(tier) {
    let types = [];
    tier.faculty.forEach(member => {
        if(!types.find(item => item === member.type)) types.push(member.type);
    })

    return types;
}

export { generate }
import { attemptCEOTeamBuy } from "./attemptCEOTeamBuy.js";
import { attemptFacultyBuy } from "./attemptFacultyBuy.js";
import { attemptDriverBuy } from "./attemptDriverBuy.js";

function activeOrNot(array, bool) { return array.filter(arrayItem => arrayItem.active === bool)}


function attemptTeamConstruction(ceo, tier, setup, facultyTypes) {
    let team = {};
    let potentialTeam = attemptCEOTeamBuy(ceo, activeOrNot(tier.teams, false));
    let faculty = [];
    let drivers = [];
    
    if(potentialTeam.name) facultyTypes.forEach(type => faculty.push(attemptFacultyBuy(type, activeOrNot(tier.faculty, false))));

    let teamEngineer = faculty.find(member => member.type === 'ENGINEER');
    if(teamEngineer) {
        let attempt = attemptDriverBuy(activeOrNot(tier.drivers, false))
        for(let i=0; i<setup.driversPerTeam; i++) attempt.name ? drivers.push(attempt) : ''
    }

    //Should be cleaned up
    //Works for now
    if(potentialTeam.name && faculty.length === facultyTypes.length && drivers.length > 0 && drivers.length > 0) {
        team = potentialTeam
        potentialTeam.active = true;
        team.ceo = ceo;
        team.faculty = faculty;
        team.drivers = drivers

        ceo.active = true;
        ceo.region = team.region;
        ceo.xPosition = team.xPosition;
        ceo.yPosition = team.yPosition;

        faculty.forEach(member => { member.active = true; member.xPosition = team.xPosition; member.yPosition = team.yPosition; member.region = team.region; });
        drivers.forEach(driver => { if(driver.name) driver.active = true; driver.xPosition = team.xPosition; driver.yPosition = team.yPosition; driver.region = team.region; driver.team = team});

    }
    
    return team;
}

export { attemptTeamConstruction };
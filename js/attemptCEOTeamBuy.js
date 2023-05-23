function attemptCEOTeamBuy(ceo, freeTeams) {
    let team = {};
    let potentialTeam = {};
    
    freeTeams.forEach(thisTeam => potentialTeam = evaluateTeam(potentialTeam, thisTeam, ceo))
    
    team = potentialTeam;

    return team;
}

function evaluateTeam(potentialTeam, thisTeam, ceo) {
    let newTeam = {}
    let affordable = true;
    let potentialTeamDistance = getDistance(potentialTeam.xPosition, ceo.xPosition) + getDistance(potentialTeam.yPosition, ceo.yPosition);
    let thisTeamDistance = getDistance(thisTeam.xPosition, ceo.xPosition) + getDistance(thisTeam.yPosition, ceo.yPosition);

    if(!potentialTeam.name && affordable) newTeam = thisTeam;
    else if(affordable && potentialTeamDistance < thisTeamDistance) newTeam = thisTeam
    
    return newTeam;
}

function getDistance(a, b) {
    return Math.abs(a - b);
}

export { attemptCEOTeamBuy }
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

export { attemptCEOTeamBuy }
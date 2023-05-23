function generateTeams(i, setup, map) {
    let team = {
        name: `Team ${i + 1}`,
        // tier: randomNumber(1, setup.tiers),
        tier: setup.tiers,
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1),
        region: {},
        drivers: [],
        active: false
    }

    map.regions.forEach(region => getTeamRegion(region, team));

    return team;
}

function getTeamRegion(region, team) {
    let xConditions = region.xStart <= team.xPosition && region.xEnd >= team.xPosition;
    let yConditions = region.yStart <= team.yPosition && region.yEnd >= team.yPosition;

    if(xConditions && yConditions) { 
        team.region = region; 
        if(!region.teams) region.teams = [];
        region.teams.push(team);
    }
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generateTeams }
function generateTeams(worldMap, setup, num) {
    let team = {
        name: `Team ${num + 1}`,
        // tier: randomNumber(1, setup.tiers),
        tier: setup.tiers,
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1),
        region: {},
        drivers: [],
        active: false
    }

    worldMap.forEach(area => getTeamRegion(area, team));
    
    return team;
}

function getTeamRegion(area, team) {
    if(area.xPosition === team.xPosition && area.yPosition === team.yPosition) team.region = area.region
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generateTeams }
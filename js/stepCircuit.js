let pointsTable = {
    1: 8,
    2: 6,
    3: 4,
    4: 3,
    5: 2
}

function stepCircuit(circuit, tier) {
    let result = {
        circuit,
        teamResult: [],
        ranking: []
    };

    
    tier.teams.forEach(team => result.teamResult.push(stepTeam(circuit, team)));
    
    result.teamResult.forEach(team => team.drivers.forEach(driver => {
        result.ranking.push({ name: driver.name, points: 0, circuitResult: driver.circuitResult })
    }))
    result.ranking.sort((a,b) => b.circuitResult - a.circuitResult);
    result.ranking.forEach((driver, index) => pointsTable[index + 1] ? driver.points += pointsTable[index + 1] : '')
    
    tier.ranking.forEach((tierDriver, index) => {
        let driverRank = result.ranking.find(circuitDriver => circuitDriver.name === tierDriver.name )
        tierDriver.points += driverRank.points;
    })
    
    return result;
}

function stepTeam(circuit, team) { 
    let teamResult = {
        name: team.name,
        circuit,
        drivers: []
    };

    team.drivers.forEach(driver => teamResult.drivers.push(stepDriver(circuit, driver)));

    return teamResult;
}

function stepDriver(circuit, driver) {
    let driverResult = {
        name: driver.name,
        circuit,
        circuitResult: randomNumber(0, 100)
    }

    return driverResult;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { stepCircuit }
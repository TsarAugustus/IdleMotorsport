function evaluateTiers(season, setup) {
    let maxTiers = setup.tiers;
    season.tiers.forEach(tier => {
        if(tier.name !== maxTiers -1) relegation(tier, maxTiers, season);
        if(tier.name !== maxTiers-maxTiers) promotion(tier, maxTiers, season);
    })
}

let systemAmount = 2;

function relegation(tier, maxTiers, season) {
    // for(let i=0; i<systemAmount; i++) tier.drivers[i]
}

function promotion(tier, maxTiers, season) {
    // tier.teams.forEach((team, index) => {
    //     if(index < systemAmount) promoteTeam(team)
    // })
    tier.ranking.forEach((driverRank, index) => {
        if(index < systemAmount) tier.drivers.forEach(tierDriver => { if(driverRank.name === tierDriver.name) promoteDriver(tierDriver, season)})
    })

    tier.teams.forEach((team, index) => {
        if(index < systemAmount) promoteTeam(team)
    })
}

function promoteTeam(team) {
    team.tier--;
    let keys = Object.keys(team);

    keys.forEach(key =>{
        if(team[key].name && team[key].type !== 'CEO') { team[key].tier--; team[key] = {}}
    })
}

function promoteDriver(tierDriver, season) {
    // let thisDriver = {
    //     tierDriver,
    //     season
    // }
    // tierDriver.seasons.push(thisDriver)
    tierDriver.tier--;
    console.log(tierDriver)
    tierDriver.team.drivers.forEach((driver, index) => { if(driver.name === tierDriver.name) tierDriver.team.drivers.splice(index, 1) });
    tierDriver.team = {};
}

export { evaluateTiers }
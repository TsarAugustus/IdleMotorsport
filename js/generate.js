import { stepTier } from './stepTier.js'

function generate(worldMap, setup, paddock) {
    let seasonArray = [];

    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(i, worldMap, setup, paddock));

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
        tierArray.push(createTier(paddock, i))
    }

    return tierArray;
}

function createTier(paddock, num) {
    return {
        name: `Tier ${num}`,
        drivers: findTierItems(paddock.grid.drivers, num),
        teams: findTierItems(paddock.grid.teams, num),
        faculty: findTierItems(paddock.grid.faculty, num),
        circuits: findTierItems(paddock.circuits.circuits, num),
        result: []
    }
}

function findTierItems(itemArray, num) {
    return itemArray.filter(item => item.tier === num + 1)
}

export { generate }
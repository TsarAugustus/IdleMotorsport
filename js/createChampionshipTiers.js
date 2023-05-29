// function createChampionshipTiers(worldMap, setup, paddock) {
//     let tiers = [];

//     for(let i=0; i<setup.tiers; i++) {
//         let thisTier = {
//             tier: i + 1,
//             // circuits: worldMap.circuitTiers[i + 1],
//             drivers: [],
//             teams: [],
//             faculty: [],
//             regulations: {}
//         }
        
//         //Very redundant
//         paddock.grid.drivers.forEach(driver => driver.tier === thisTier.tier ? thisTier.drivers.push(driver) : '');
//         paddock.grid.teams.forEach(team => team.tier === thisTier.tier ? thisTier.teams.push(team) : '');
//         paddock.grid.faculty.forEach(member => member.tier === thisTier.tier ? thisTier.faculty.push(member) : '')

//         thisTier.regulations = createTierRegulations(thisTier);
        
//         tiers.push(thisTier)
//     }

//     return tiers
// }

// function createTierRegulations(tier) {
//     let regulations = {};

//     return regulations;
// }

// export { createChampionshipTiers }
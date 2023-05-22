function createChampionshipTiers(map, setup, paddock) {
    let tiers = [];

    for(let i=0; i<setup.tiers; i++) {
        let thisTier = {
            tier: i + 1,
            tracks: map.trackTiers[i + 1],
            drivers: []
        }
        
        paddock.grid.freeDrivers.forEach(driver => {
            if(driver.tier === thisTier.tier) {
                thisTier.drivers.push(driver);
                paddock.grid.freeDrivers = paddock.grid.freeDrivers.filter(freeDriver => freeDriver.name !== driver.name)
            }
        });
        
        tiers.push(thisTier)
    }

    return tiers
}

export { createChampionshipTiers }
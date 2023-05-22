function createChampionshipTiers(map, setup, paddock) {
    let tiers = [];

    for(let i=0; i<setup.tiers; i++) {
        let thisTier = {
            tier: i + 1,
            circuits: map.circuitTiers[i + 1],
            drivers: []
        }
        
        paddock.grid.drivers.forEach(driver => {
            if(driver.tier === thisTier.tier) {
                thisTier.drivers.push(driver);
                // paddock.grid.drivers = paddock.grid.drivers.filter(thisDriver => thisDriver.name !== driver.name)
            }
        });
        
        tiers.push(thisTier)
    }

    return tiers
}

export { createChampionshipTiers }
// import { generateGrid } from './generateGrid.js';
// import { createChampionshipTiers } from './createChampionshipTiers.js';
// import { tierSimulation } from './tierSimulation.js';

// function generate(paddock, setup, worldMap, circuitMap) {
//     let seasonArray = [];
    
//     if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, worldMap, circuitMap);
//     for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(paddock, worldMap, setup, i, circuitMap));
//     return seasonArray;
// }

// function generateSeason(paddock, worldMap, setup, seasonNum, circuitMap) {
//     let championshipTiers = createChampionshipTiers(worldMap, setup, paddock);
//     let season = {
//         name: `Season ${seasonNum + 1}`,
//         paddock,
//         worldMap,
//         championshipTiers
//     };

//     let result = [];
//     championshipTiers.forEach(tier => result.push(tierSimulation(tier, setup)));
        
//     return season;
// }

function generate(worldMap, setup) {
    
}

export { generate }
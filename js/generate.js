import { generateGrid } from './generateGrid.js';
import { createChampionshipTiers } from './createChampionshipTiers.js';
import { tierSimulation } from './tierSimulation.js';

function generate(paddock, setup, map) {
    let seasonArray = [];
    
    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map);
    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(paddock, map, setup, i));
    console.log(seasonArray)
    return seasonArray;
}

function generateSeason(paddock, map, setup, seasonNum) {
    let championshipTiers = createChampionshipTiers(map, setup, paddock);
    let season = {
        name: `Season ${seasonNum + 1}`,
        paddock,
        map,
        championshipTiers
    };

    let result = [];
    championshipTiers.forEach(tier => result.push(tierSimulation(tier, setup)));
        
    return season;
}

export { generate }
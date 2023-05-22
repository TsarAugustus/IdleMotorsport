import { generateGrid } from './generateGrid.js';
import { createChampionshipTiers } from './createChampionshipTiers.js';

function generate(paddock, setup, map) {
    let seasonArray = [];

    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map); 

    
    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(paddock, map, setup));

    return seasonArray;
}

function generateSeason(paddock, map, setup) {
    let season = {};
    let championshipTiers = createChampionshipTiers(map, setup, paddock);
    
    return season;
}

export { generate }
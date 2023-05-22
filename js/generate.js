import { generateGrid } from './generateGrid.js';
import { createChampionshipTiers } from './createChanmpionshipTiers.js';

function generate(paddock, setup, map) {
    let seasonArray = [];

    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map); 

    let championshipTiers = createChampionshipTiers(map, setup, paddock);

    for(let i=0; i<paddock.seasons; i++) seasonArray.push(generateSeason(paddock));

    return seasonArray;
}

function generateSeason(paddock) {
    let season = {};

    return season;
}

export { generate }
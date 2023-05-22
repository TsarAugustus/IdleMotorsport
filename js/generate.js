import { generateGrid } from "./generateGrid.js";

function generate(paddock, setup, map) {
    let seasonArray = [];

    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map); 

    for(let i=0; i<paddock.seasons; i++) seasonArray.push(generateSeason(paddock));

    return seasonArray;
}

function generateSeason(paddock) {
    let season = {};

    return season;
}

export { generate }
function generate(worldMap, setup, paddock) {
    let seasonArray = [];

    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(i, worldMap, setup, paddock));

    return seasonArray
}

function generateSeason(num, worldMap, setup, paddock) {
    let result = [];

    let season = {
        name: `Season ${num}`
    }

    return result;
}

export { generate }
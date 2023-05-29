function mapHTML(worldMap, setup, paddock) {
    let mapElement = createMapElement(setup);
    document.body.appendChild(mapElement);
    
    paddock.grid.teams.forEach(team => addTeamsToMap(team));
    paddock.grid.drivers.forEach(driver => addDriversToMap(driver));
    paddock.circuits.circuits.forEach(circuit => addcircuitsToMap(circuit));
    let regionColorList = createColorList(setup);
    worldMap.forEach((area, index) => applyRegionColors(area, regionColorList));
    
    // let regionList = document.createElement('div');
    // regionList.id = 'regionList';
    // document.body.appendChild(regionList)

    // map.regions.forEach(region => createRegionList(region));

    // document.body.appendChild(regionList);

}

function addTeamsToMap(team) {
    let item = document.getElementById(`${team.xPosition}-${team.yPosition}`);
    item.classList.add('team');
    item.innerHTML = 'T'
}

function addDriversToMap(driver) {
    let item = document.getElementById(`${driver.xPosition}-${driver.yPosition}`);
    item.classList.add('driver');
    item.innerHTML = 'D';
}

function addcircuitsToMap(circuit) {
    let item = document.getElementById(`${circuit.xPosition}-${circuit.yPosition}`);
    item.classList.add('circuit')
    item.innerHTML = circuit.tier;
}

function createColorList(setup) {
    let palette = {};
    for(let i=0; i<setup.regionCount; i++) {
        let regionColor = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
        palette[`Region ${i}`] = regionColor
    }
    
    return palette;
}

function createMapElement(setup) {
    let columns = '';
    for(let x=0; x<setup.maxX; x++) columns += '1fr '
    
    let mapElement = document.createElement('div');
    mapElement.id = 'mapElement';
    mapElement.style.display = 'grid';
    mapElement.style.width = `${(setup.maxX * 10) * 2}px`;
    mapElement.style['text-align'] = 'center';
    mapElement.style.border = '1px solid black';
    mapElement.style['grid-template-columns'] = columns;
    applyMapMarkings(setup, mapElement);
    
    return mapElement
}

function applyMapMarkings(setup, mapElement) {
    let maxY = setup.maxY;
    let maxX = setup.maxX;

    for(let y=0; y<maxY; y++) {
        for(let x=0; x<maxX; x++) {
            let item = document.createElement('span');
            item.id = `${x}-${y}`;
            item.innerHTML = 'x';
            mapElement.appendChild(item)
        }
    }
}

function applyRegionColors(area, regionColorList) {
    let areaElement = document.getElementById(`${area.xPosition}-${area.yPosition}`);
    if(area.capital) { areaElement.classList.add('capital'); areaElement.innerHTML = 'C'; }
    areaElement.style['background-color'] = regionColorList[area.region];
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { mapHTML }
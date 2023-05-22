function mapHTML(map, setup, paddock) {
    let mapElement = createMapElement(setup);
    document.body.appendChild(mapElement);

    map.circuits.forEach(circuit => addcircuitsToMap(circuit));
    paddock.grid.teams.forEach(team => addTeamsToMap(team));
    paddock.grid.freeDrivers.forEach(driver => addDriversToMap(driver));
    map.regions.forEach((region, index) => applyRegionColors(region, index, setup));
    
    let regionList = document.createElement('div');
    regionList.id = 'regionList';
    document.body.appendChild(regionList)

    map.regions.forEach(region => createRegionList(region));

    document.body.appendChild(regionList)

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
    
    applyMapMarkings(setup, mapElement)
    
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

function addcircuitsToMap(circuit) {
    let item = document.getElementById(`${circuit.xPosition}-${circuit.yPosition}`);
    item.classList.add('circuit')
    item.innerHTML = circuit.tier;
}

function addTeamsToMap(team) {
    let item = document.getElementById(`${team.xPosition}-${team.yPosition}`);
    item.classList.add('team');
    // item.style.border = '1px solid red';
}

function addDriversToMap(driver) {
    let item = document.getElementById(`${driver.xPosition}-${driver.yPosition}`);
    item.classList.add('driver');
    // item.style['background-color'] = 'darkgrey !important';
}

function applyRegionColors(region, index, setup) {
    let regionColor = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
    
    for(let y=0; y<setup.maxY; y++) {
        for(let x=0; x<setup.maxX; x++) {
            let xLimit = x >= region.xStart && x <= region.xEnd;
            let yLimit = y >= region.yStart && y <= region.yEnd;

            if(xLimit && yLimit) {
                document.getElementById(`${x}-${y}`).style['background-color'] = regionColor;
            }
        }
    } 
}

function createRegionList(region) {
    let regionDiv = document.createElement('div');
    regionDiv.id = `Region-${region.region}`;
    let regionName = document.createElement('h3');
    regionName.innerHTML = `Region ${region.region} - ${region.circuits.length}`;
    regionDiv.appendChild(regionName);

    region.circuits.forEach(circuit => createRegioncircuitList(circuit, regionDiv))
    
    regionList.appendChild(regionDiv)
}

function createRegioncircuitList(circuit, regionDiv) {
    let circuitDiv = document.createElement('div');
    circuitDiv.id = `Circuit-${circuit.name}`
    circuitDiv.innerHTML = `Circuit ${circuit.name}`;
    regionDiv.appendChild(circuitDiv)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { mapHTML }
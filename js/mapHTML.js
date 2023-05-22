function mapHTML(map, setup, paddock) {
    let mapElement = createMapElement(setup);
    document.body.appendChild(mapElement);

    map.tracks.forEach(track => addTracksToMap(track));

    map.regions.forEach((region, index) => applyRegionColors(region, index, setup));

    let regionList = document.createElement('div');
    regionList.id = 'regionList';

    map.regions.forEach(region => {
        let regionDiv = document.createElement('div');
        regionDiv.id = `Region-${region.region}`;
        let regionName = document.createElement('h3');
        regionName.innerHTML = `Region ${region.region} - ${region.tracks.length}`;
        regionDiv.appendChild(regionName);

        region.tracks.forEach(track => {
            let trackDiv = document.createElement('div');
            trackDiv.id = `Track-${track.name}`
            trackDiv.innerHTML = `Track ${track.name}`;
            regionDiv.appendChild(trackDiv)
        })
        
        regionList.appendChild(regionDiv)
    });

    document.body.appendChild(regionList)

}

function createMapElement(setup) {
    let columns = '';
    for(let x=0; x<setup.maxX; x++) {
        columns += '1fr '
    }
    
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

function addTracksToMap(track) {
    let item = document.getElementById(`${track.xPosition}-${track.yPosition}`);
    item.classList.add('track');
    item.innerHTML = '#'
}

function applyRegionColors(region, index, setup) {
    let regionColor = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
    
    for(let y=0; y<setup.maxY; y++) {
        for(let x=0; x<setup.maxX; x++) {
            let xLimit = x >= region.xStart && x <= region.xEnd;
            let yLimit = y >= region.yStart && y <= region.yEnd;

            if(xLimit && yLimit) {
                document.getElementById(`${x}-${y}`).style.color = regionColor;
            }
        }
    } 
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { mapHTML }
function createCircuitScreen(div, circuitArray) {    
    let containerDivChildren = div.children;
    let displayContainer;

    for(let child in containerDivChildren) {
        let thisChild = containerDivChildren[child];
        if(thisChild.id === `${div.id}Display`) {
            if(thisChild.children.length > 0) thisChild.innerHTML = '';
            displayContainer = thisChild;
        }
    }

    circuitArray.forEach(circuit => {
        let thisCircuitDiv = document.createElement('p');
        thisCircuitDiv.innerHTML = `Name: ${circuit.name} | Date: ${circuit.day}-${circuit.month} | Grade: ${circuit.grade}`;
        displayContainer.appendChild(thisCircuitDiv)
    })
}

export { createCircuitScreen }
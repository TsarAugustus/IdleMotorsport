function createCircuitScreen(div, circuitArray) {    
	const containerDivChildren = div.children;
	let displayContainer;

	for(const child in containerDivChildren) {
		const thisChild = containerDivChildren[child];
		if(thisChild.id === `${div.id}Display`) {
			if(thisChild.children.length > 0) thisChild.innerHTML = '';
			displayContainer = thisChild;
		}
	}

	circuitArray.forEach(circuit => {
		const thisCircuitDiv = document.createElement('p');
		thisCircuitDiv.innerHTML = `Name: ${circuit.name} | Date: ${circuit.day}-${circuit.month} | Grade: ${circuit.grade}`;
		displayContainer.appendChild(thisCircuitDiv);
	});
}

export { createCircuitScreen };
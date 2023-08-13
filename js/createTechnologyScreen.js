import { Departments } from './Departments.js';

function createTechnologyScreen(div) {
	const containerDivChildren = div.children;
	let displayContainer = null;

	for(const child in containerDivChildren) {
		const thisChild = containerDivChildren[child];
		if(thisChild.id === `${div.id}Display`) {
			if(thisChild.children.length > 0) thisChild.innerHTML = '';
			displayContainer = thisChild;
		}
	}

	const departmentDiv = document.createElement('div');
	departmentDiv.id = 'departmentDiv';
	displayContainer.appendChild(departmentDiv);

	const technologyResearchDiv = document.createElement('div');
	technologyResearchDiv.id = 'technologyResearch';
	displayContainer.appendChild(technologyResearchDiv);

	for(const department of Departments) {
		const departmentElement = document.createElement('div');
		departmentElement.innerHTML = department.name;
		departmentElement.id = department.name;
		departmentElement.classList.add('departmentHead');
		departmentElement.addEventListener('click', () => openResearchScreen(department));

		departmentDiv.appendChild(departmentElement);
	}
}

function openResearchScreen(department) {
	const technologyResearchDiv = document.getElementById('technologyResearch');
	technologyResearchDiv.innerHTML = '';
    
	const focusContainer = document.createElement('div');
	focusContainer.id = 'focusContainer';

	createFocusScreen(focusContainer, department);

	technologyResearchDiv.appendChild(focusContainer);
}

function createFocusScreen(focusContainer, department) {
	for(const focus of department.focus) {
		const thisFocus = document.createElement('div');
		thisFocus.id = focus.name;
		thisFocus.classList.add('focus');

		const focusNameSpan = document.createElement('span');
		focusNameSpan.innerHTML = focus.name;
		focusNameSpan.classList.add('focusTitle');
		thisFocus.appendChild(focusNameSpan);

		for(const technology of focus.technology) {
			const thisTechnology = document.createElement('span');
			thisTechnology.innerHTML = technology.name;
			thisTechnology.classList.add('tech');
			if(technology.unlocked) thisTechnology.classList.add('unlocked');
			thisTechnology.addEventListener('click', function() {
				const check = checkTechnologyUnlock(technology, focus);

				if(check) {
					technology.unlocked = true;
					thisTechnology.classList.add('unlocked');
				} 
			});

			thisFocus.appendChild(thisTechnology);
		}

		focusContainer.appendChild(thisFocus);
	}
}

function checkTechnologyUnlock(technology, focus) {
	let check = false;
	focus.technology.forEach((thisTech, index) => {
		if(technology.name === thisTech.name) {
			const previousTech = focus.technology[index - 1];
			if(previousTech && previousTech.unlocked) check = true;
			else if (!focus.technology[index - 1]) check = true;
		}
	});

	return check;
}

export { createTechnologyScreen };
import { Departments } from "./Departments.js";

function createTechnologyScreen() {
    let technologyDiv = document.getElementById('Technology');

    let departmentDiv = document.createElement('div');
    departmentDiv.id = 'departmentDiv';
    technologyDiv.appendChild(departmentDiv);

    let technologyResearchDiv = document.createElement('div');
    technologyResearchDiv.id = 'technologyResearch';
    technologyDiv.appendChild(technologyResearchDiv);

    for(let department of Departments) {
        let departmentElement = document.createElement('div');
        departmentElement.innerHTML = department.name;
        departmentElement.id = department.name;
        departmentElement.classList.add('departmentHead');
        departmentElement.addEventListener('click', () => openResearchScreen(department));

        departmentDiv.appendChild(departmentElement);
    }
}

function openResearchScreen(department) {
    let technologyResearchDiv = document.getElementById('technologyResearch');
    technologyResearchDiv.innerHTML = '';
    
    let focusContainer = document.createElement('div');
    focusContainer.id = 'focusContainer';

    createFocusScreen(focusContainer, department);

    technologyResearchDiv.appendChild(focusContainer);
}

function createFocusScreen(focusContainer, department) {
    for(let focus of department.focus) {
        let thisFocus = document.createElement('div');
        thisFocus.id = focus.name;
        thisFocus.classList.add('focus');

        let focusNameSpan = document.createElement('span');
        focusNameSpan.innerHTML = focus.name;
        focusNameSpan.classList.add('focusTitle');
        thisFocus.appendChild(focusNameSpan);

        for(let technology of focus.technology) {
            let thisTechnology = document.createElement('span');
            thisTechnology.innerHTML = technology.name;
            thisTechnology.classList.add('tech');
            thisTechnology.addEventListener('click', function() {
                let check = checkTechnologyUnlock(technology, focus);

                if(check) {
                    technology.unlocked = true;
                    thisTechnology.classList.add('unlocked');
                }
                
            })

            thisFocus.appendChild(thisTechnology);
        }

        focusContainer.appendChild(thisFocus)
    }
}

function checkTechnologyUnlock(technology, focus) {
    let check = false;
    focus.technology.forEach((thisTech, index) => {
        if(technology.name === thisTech.name) {
            if(focus.technology[index - 1] && focus.technology[index - 1].unlocked) {
                check = true;
            } else if (!focus.technology[index - 1]) {
                check = true;
            }
        }
    });

    return check;
}

export { createTechnologyScreen }
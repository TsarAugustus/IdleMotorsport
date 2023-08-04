function Circuit(name, day, month, grade) {
    let thisCircuit = {
        name: name,
        day: day,
        month: month,
        grade: grade,
        path: createCircuitPath(5, 5)
    }

    return thisCircuit;
}

function createCircuitPath(corners, straights) {
    let circuitPath = [];
    let pathLength = corners + straights;
    for(let i=0; i<pathLength; i++) {
        let choice = getRandomNumber(0, 1);
        let pathToAdd = {
            type: ''
        }
        
        if(choice === 0 && corners > 0) { 
            //Corner
            circuitPath.push(createCorner(pathToAdd))
            corners--;
        } else if(choice === 0 && corners === 0) {
            circuitPath.push(createStraight(pathToAdd));
            straights--;
        } else if(choice === 1 && straights > 0) {
            //Straight
            circuitPath.push(createStraight(pathToAdd));
            straights--;
        } else if(choice === 1 && straights === 0) {
            circuitPath.push(createCorner(pathToAdd));
            corners--;
        }
    }
    
    return circuitPath; 
}

function createCorner(pathToAdd) {
    pathToAdd.type = 'Corner';

    return pathToAdd;
}

function createStraight(pathToAdd) {
    pathToAdd.type = 'Straight';

    return pathToAdd
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export { Circuit }
function generateTeams(i, setup, map) {
    let team = {
        name: `Team ${i + 1}`,
        xPosition: randomNumber(setup.minX, setup.maxX - 1),
        yPosition: randomNumber(setup.minY, setup.maxY - 1)
    }

    return team;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { generateTeams }
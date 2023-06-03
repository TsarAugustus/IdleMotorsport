function stepCircuit(circuit, tier) {
    let result = [];

    tier.teams.forEach(team => (stepTeam(circuit, team)))

    return result;
}

function stepTeam(circuit, team) { 
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { stepCircuit }
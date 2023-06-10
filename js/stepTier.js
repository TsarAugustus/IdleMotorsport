import { stepCircuit } from './stepCircuit.js';

function stepTier(tier) {
    let tierResult = {
        circuitResult: []
    };

    if(tier.teams.length > 0) tier.availableCircuits.forEach(circuit => tierResult.circuitResult.push(stepCircuit(circuit, tier)));
    
    tier.ranking.sort((a,b) => b.points - a.points);
    tier.teams.forEach(team => { team.drivers.forEach(teamDriver => { tier.ranking.forEach(rankingDriver => {
        if(teamDriver.name === rankingDriver.name) { teamDriver.points = rankingDriver.points; team.points += teamDriver.points}
    })})})

    tier.teams.sort((a, b) => b.points - a.points);

    return tierResult;
}

export { stepTier };
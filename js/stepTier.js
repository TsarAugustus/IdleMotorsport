import { stepCircuit } from './stepCircuit.js';

function stepTier(tier) {
    let tierResult = {
        circuitResult: []
    };

    if(tier.teams.length > 0) tier.availableCircuits.forEach(circuit => tierResult.circuitResult.push(stepCircuit(circuit, tier)));
    
    tier.ranking.sort((a,b) => b.points - a.points);
    
    return tierResult;
}

export { stepTier };
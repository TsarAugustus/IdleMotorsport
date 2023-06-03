import { stepCircuit } from './stepCircuit.js';

function stepTier(tier) {
    let tierResult = [];

    if(tier.teams.length > 0) tier.availableCircuits.forEach(circuit => tierResult.push(stepCircuit(circuit, tier)));
    
    return tierResult;
}

export { stepTier };
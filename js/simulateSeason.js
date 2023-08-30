import { settings } from './settings.js';
import { simulateCircuit } from './simulateCircuit.js'; 

function simulateSeason(season) {
	season.circuits.forEach(circuit => {
		const circuitSimulation = simulateCircuit(circuit, season);

		const result = {
			circuit: circuit,
			rank: circuitSimulation.rank,
			circuitResult: circuitSimulation.circuitResult
		};

		result.circuitResult.forEach((thisResult, index) => {
			if(settings.points[index + 1]) thisResult.points += settings.points[index + 1];
		});
        
		if(result.circuitResult.length > 0) season.circuitResult.push(result);
	});

	return season;
}

export { simulateSeason };
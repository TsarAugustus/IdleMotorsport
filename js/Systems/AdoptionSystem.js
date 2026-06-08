import { world } from "../World/World.js";

import { technologies } from "../Data/TechnologyDatabase.js";

import { addHistory } from "./HistorySystem.js";

export function attemptTechnologyAdoption(organization, technology) {
	
	if (!technology.discovered) return;
	if (organization.technologies.includes(technology)) return;

	console.log(`Attempting to adopt ${technology.name} for ${organization.name}`);
	if(Math.random() * 100 < 50) {
		organization.technologies.push(technology);
		technology.adopters.push(organization.id);
		technology.provenness += 10;
		addHistory(`${organization.name} adopted ${technology.name} in year ${world.year}.`);
		console.log('Proved:', technology.provenness)
	}
}

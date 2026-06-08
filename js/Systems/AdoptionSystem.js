import { world } from "../World/World.js";

import { technologies } from "../Data/TechnologyDatabase.js";

import { addHistory } from "./HistorySystem.js";

export function attemptTechnologyAdoption(organization, technology) {
	
	if (!technology.discovered) return;
	if (organization.technologies.includes(technology)) return;

	const adoptionChance = Math.max(5, 100 - technology.difficulty);

	if (Math.random() * 100 < adoptionChance) {

		organization.technologies.push(technology);
		technology.adopters.push(organization.id);

		
		const provennessGain = Math.max(0.1, (101 - technology.difficulty) / 100);
		technology.provenness += provennessGain * Math.sqrt(organization.prestige);

		technology.provenness = Math.min(100, technology.provenness);

		addHistory(`${organization.name} adopted ${technology.name} in year ${world.year}. Its provenness is ${Math.round(technology.provenness)}/100`);
	}
}

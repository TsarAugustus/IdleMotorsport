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

		const data = {
			organizationId: organization.id,
			technologyId: technology.id,
		};

		addHistory("technologyAdoption", data);
	}
}

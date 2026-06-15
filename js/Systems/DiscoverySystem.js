import { world } from "../World/World.js";

import { technologies } from "../Data/TechnologyDatabase.js";

import { addHistory } from "./HistorySystem.js";

import { attemptTechnologyAdoption } from "./AdoptionSystem.js";

export function discoveryTick() {
	// Try to discover / adopt technologies
	if (world.organizations.length > 0 && world.people.length > 0) {
		const thisTechnology = Object.values(technologies)[Math.floor(Math.random() * Object.values(technologies).length)];

		const randomOrganzation = world.organizations[Math.floor(Math.random() * world.organizations.length)];

		const alivePeople = world.people.filter((person) => person.alive && person.retired === false);
		const randomPerson = alivePeople[Math.floor(Math.random() * alivePeople.length)];

		attemptDiscoveries(randomPerson);
		attemptTechnologyAdoption(randomOrganzation, thisTechnology);
	}
}

export function attemptDiscoveries(person) {
	Object.values(technologies).forEach((tech) => {
		if (tech.discovered) return;

		const influenceBonus = getInfluenceBonus(tech.id);
		const discoveryChance = person.skills.aerodynamics + influenceBonus - tech.difficulty;

		const roll = Math.random() * 100;

		if (roll < discoveryChance) {
			tech.discovered = true;
			tech.discoveredBy = person.id;
			tech.discoveredYear = world.year;

			const thisOrganization = decideOrganizationDiscoveryCredit(person, tech);

			const data = {
				personId: person.id,
				organizationId: thisOrganization ? thisOrganization.id : null,
				technologyId: tech.id,
			};

			addHistory("technologyDiscovered", data);
		}
	});
}

function decideOrganizationDiscoveryCredit(person) {
	if (!person) return;

	if (person.employedOrganizations.length === 0) return;

	const topPersonOrganization = person.employedOrganizations.sort()[0];

	return topPersonOrganization;
}

function getInfluenceBonus(technologyId) {
	let bonus = 0;

	Object.values(technologies).forEach((tech) => {
		if (!tech.discovered) return;

		if (tech.influences[technologyId]) {
			bonus += tech.influences[technologyId];
		}
	});

	return bonus;
}

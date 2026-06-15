import { generateOrganization } from "../Generators/OrganizationGenerator.js";
import { addHistory } from "./HistorySystem.js";

import { skillGroups } from "../Data/SkillGroups.js";
import { organizationCategories } from "../Data/OrganizationTypes.js";

import { world } from "../World/World.js";

export function organizationTick() {
	// Random organization founding
	if (Math.random() > 0.3) {
		// Find alive, and non-retired people
		const alivePeople = world.people.filter((person) => person.alive);
		const aliveNotRetiredPeople = alivePeople.filter((person) => person.retired === false);

		// Random person from list to try and found an organization
		const randomPerson = aliveNotRetiredPeople[Math.floor(Math.random() * aliveNotRetiredPeople.length)];

		if (!randomPerson) return;

		if (!randomPerson.retired && randomPerson.alive) attemptOrganizationFounding(randomPerson);
	}
}

export function attemptOrganizationFounding(person) {
	const organizationType = defineOrganizationType(person);
	const organizationData = organizationCategories[organizationType];

	if (!organizationData) return;

	const organizationIdentities = defineOrganizationIdentity(person, organizationType, organizationData);

	if (person.ownedOrganizations.length > 0) return;

	if (person.money > organizationData.cost && person.prestige >= organizationData.prestigeCost) {
		person.money -= organizationData.cost;

		const moneyInvested = organizationData.cost;

		const newOrganization = generateOrganization(person, moneyInvested, organizationType, organizationIdentities);

		const data = {
			personId: person.id,
			organizationId: newOrganization.id,
		};

		addHistory("organizationFounded", data);
	}
}

export function getGroupScores(person) {
	const scores = {};

	for (const [skillGroupName, skills] of Object.entries(skillGroups)) {
		scores[skillGroupName] =
			skills.reduce((total, skill) => {
				return total + person.skills[skill];
			}, 0) / skills.length;
	}

	return scores;
}

function defineOrganizationType(person) {
	const groupScores = getGroupScores(person);

	const organizationScores = {};

	// for (const [organizationType, groups] of Object.entries(organizationCategories)) {
	// 	organizationScores[organizationType] = groups.groups.reduce((total, group) => {
	// 		return total + (groupScores[group] || 0);
	// 	}, 0);
	// }

	for (const [organizationType, data] of Object.entries(organizationCategories)) {
		organizationScores[organizationType] =
			data.groups.reduce((total, group) => {
				return total + (groupScores[group] || 0);
			}, 0) / data.groups.length;
	}

	const bestFit = Object.entries(organizationScores).sort((a, b) => b[1] - a[1])[0];

	return bestFit[0];
}

// For now, returns a random identity, which will steer the organization towards that identity
function defineOrganizationIdentity(person, organizationType, organizationData) {
	const initialIdentity = organizationData.identities[Math.floor(Math.random() * organizationData.identities.length)];
	return initialIdentity;
}

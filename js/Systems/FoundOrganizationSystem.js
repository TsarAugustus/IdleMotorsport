import { generateOrganization } from "../Generators/OrganizationGenerator.js";
import { addHistory } from "./HistorySystem.js";

import { skillGroups } from "../Data/SkillGroups.js";
import { organizationTypes } from "../Data/OrganizationTypes.js";

export function attemptOrganizationFounding(person) {

    const organizationType = defineOrganizationType(person);
    const organizationData = organizationTypes[organizationType];

    if (person.ownedOrganizations.length > 0) return;

    if (person.money > organizationData.cost && person.prestige >= organizationData.prestigeCost) {

        person.money -= organizationData.cost;

        const moneyInvested = Math.min(person.money, organizationData.cost);
        person.money -= moneyInvested;

        const newOrganization = generateOrganization(
            person,
            moneyInvested,
            organizationType
        );

        addHistory(
            `${person.firstName} ${person.lastName} founded: ${newOrganization.name}`
        );
    }
}

export function getGroupScores(person) {
    const scores = {};

    for (const [skillGroupName, skills] of Object.entries(skillGroups)) {
        scores[skillGroupName] = skills.reduce((total, skill) => {
			return total + person.skills[skill];
		}, 0) / skills.length;
    }

    return scores;
}

function defineOrganizationType(person) {
    const groupScores = getGroupScores(person);

    const organizationScores = {};

	for (const [organizationType, groups] of Object.entries(organizationTypes)) {
    organizationScores[organizationType] = groups.groups.reduce(
        (total, group) => {
            return total + (groupScores[group] || 0);
        },
        0
    );
}

    const bestFit = Object.entries(organizationScores)
        .sort((a, b) => b[1] - a[1])[0];

    return bestFit[0];
}

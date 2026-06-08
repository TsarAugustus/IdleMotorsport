import { generateOrganization } from "../Generators/OrganizationGenerator.js";
import { addHistory } from "./HistorySystem.js";

export function attemptOrganizationFounding(person) {
	// console.log('Attempting to found organization with', person);

	// Temporary, to make sure people don't bankrupt themsleves making organizations
	if (person.ownedOrganizations.length > 0) return

	if(person.money > 1000 && person.prestige > 50) {
		console.log('Person Considered');
		person.money -= 1000;
		const moneyInvested = person.money / 2;
		person.money -= moneyInvested;

		const newOrganization = generateOrganization(person, moneyInvested);

		addHistory(`${person.firstName} ${person.lastName} founded: ${newOrganization.name}`)
	}
}

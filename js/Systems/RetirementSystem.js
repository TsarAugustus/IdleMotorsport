import { addHistory } from "./HistorySystem.js";

import { newOrganizationOwner } from "./NewOwnerSystem.js";

export function handleRetirement(person) {
	// Remove employment
	if (person.employedOrganizations.length > 0) {
		person.employedOrganizations.forEach((organization) => {
			organization.employees = organization.employees.filter((employee) => employee.id !== person.id);
		});

		person.employedOrganizations = [];
	}

	// Transfer ownership
	if (person.ownedOrganizations.length > 0) {
		const previousOrganizations = [...person.ownedOrganizations];

		previousOrganizations.forEach((organization) => {
			const newOwner = newOrganizationOwner(organization);

			organization.owner = newOwner;

			if (newOwner) {
				newOwner.ownedOrganizations.push(organization);

				const data = {
					personId: person.id,
					organizationId: organization.id,
				};

				addHistory("organizationTransfer", data);
			}
		});

		const previousOrganizationId = person.ownedOrganizations.map((org) => org.id);

		person.ownedOrganizations = [];

		const data = {
			personId: person.id,
			organizationId: previousOrganizationId,
		};

		addHistory("personRetired", data);
	}
}

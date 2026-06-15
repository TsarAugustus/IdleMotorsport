import { newOrganizationOwner } from "./NewOwnerSystem.js";

import { addHistory } from "./HistorySystem.js";

export function handleDeath(person) {
	const data = {
		personId: person.id,
	};

	addHistory("death", data);

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
				};

				addHistory("organizationTransfer", data);
			}
		});

		person.ownedOrganizations = [];
	}
}

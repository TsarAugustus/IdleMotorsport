import { addHistory } from "./HistorySystem.js";

import { newOrganizationOwner } from "./NewOwnerSystem.js";

export function handleRetirement(person) {

	// Remove employment
	if (person.employedOrganizations.length > 0) {

		const organizationNames = person.employedOrganizations
			.map(org => org.name);

		person.employedOrganizations.forEach(organization => {
			organization.employees = organization.employees.filter(
				employee => employee.id !== person.id
			);
		});

		person.employedOrganizations = [];

		addHistory(
			`${person.firstName} ${person.lastName} has retired from ${organizationNames.join(", ")}`
		);
	}

	// Transfer ownership
	if (person.ownedOrganizations.length > 0) {

		const previousOrganizations = [...person.ownedOrganizations];

		const organizationNames = previousOrganizations
			.map(org => org.name);

		previousOrganizations.forEach(organization => {

			const newOwner = newOrganizationOwner(organization);

			organization.owner = newOwner;

			if (newOwner) {
				newOwner.ownedOrganizations.push(organization);

				addHistory(
					`${newOwner.firstName} ${newOwner.lastName} assumed ownership of ${organization.name}`
				);
			}
		});

		person.ownedOrganizations = [];

		addHistory(
			`${person.firstName} ${person.lastName} has retired, giving up ownership of ${organizationNames.join(", ")}`
		);
	}
}

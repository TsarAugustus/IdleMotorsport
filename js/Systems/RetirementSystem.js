export function handleRetirement(person) {
	// Capture career history BEFORE clearing anything
	const previousOrganizationIds = person.employedOrganizations.map((organization) => organization.id);

	// Remove employment
	person.employedOrganizations.forEach((organization) => {
		organization.employees = organization.employees.filter((employee) => employee.id !== person.id);
	});

	person.employedOrganizations = [];

	// Transfer ownership
	if (person.ownedOrganizations.length > 0) {
		const previousOrganizations = [...person.ownedOrganizations];

		previousOrganizations.forEach((organization) => {
			const newOwner = newOrganizationOwner(organization);

			organization.owner = newOwner;

			if (newOwner) {
				newOwner.ownedOrganizations.push(organization);

				addHistory("organizationTransfer", {
					personId: person.id,
					organizationId: organization.id,
				});
			}
		});

		person.ownedOrganizations = [];
	}

	// Retirement event ALWAYS happens
	addHistory("personRetired", {
		personId: person.id,
		organizationId: previousOrganizationIds,
	});
}

export function newOrganizationOwner(organization) {

	if (!organization) return null;

	const eligibleEmployees = organization.employees.filter(
		employee => employee.alive && !employee.retired
	);

	if (eligibleEmployees.length === 0) {
		return null;
	}

	return eligibleEmployees[
		Math.floor(Math.random() * eligibleEmployees.length)
	];
}

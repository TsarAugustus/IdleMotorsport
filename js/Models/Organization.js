export default class Organization {
	id;
	name;
	money;
	owner;
	prestige;
	type;
	employees = [];
	technologies = [];
	parentCompany;
	subsidiaries = [];
	identities = [];
	foundingYear;
	active;

	// TODO: Add Owner/Employee History
	ownerHistory = [];
	employeeHistory = [];
}

import { world } from "../World/World.js";
import History from "../Models/History.js";
import { technologies } from "../Data/TechnologyDatabase.js";

export function addHistory(type, data) {
	const thisHistory = new History();

	thisHistory.id = world.history.length + 1;
	thisHistory.type = type;

	thisHistory.year = world.year;
	thisHistory.month = world.month;
	thisHistory.day = world.day;

	thisHistory.data = data;

	world.history.push(thisHistory);

	console.log(translateHistoryEvent(thisHistory));
}

function translateHistoryEvent(event) {
	if (event.type === "death") {
		const thisPerson = getPerson(event.data.personId);

		return `${thisPerson.firstName} ${thisPerson.lastName} has died at the age of ${thisPerson.age}`;
	}

	if (event.type === "technologyAdoption") {
		const thisOrganization = getOrganization(event.data.organizationId);
		const thisTechnology = thisOrganization.technologies.find((tech) => tech.id === event.data.technologyId);

		return `${thisOrganization.name} has adopted ${thisTechnology.name}. Its provenness is ${Math.round(thisTechnology.provenness)} / 100`;
	}

	if (event.type === "personRetired") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganizationList = getPersonOrganizations(event);

		return `${thisPerson.firstName} ${thisPerson.lastName} has retired at the age of ${thisPerson.age}${
			thisOrganizationList ? `. They previously worked at ${thisOrganizationList}.` : "."
		}`;
	}

	if (event.type === "personHired") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganization = getOrganization(event.data.organizationId);

		return `${thisPerson.firstName} ${thisPerson.lastName} has been hired at ${thisOrganization.name}`;
	}

	if (event.type === "personLeaving") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganization = getOrganization(event.data.organizationId);

		return `${thisPerson.firstName} ${thisPerson.lastName} has left ${thisOrganization.name}`;
	}

	if (event.type === "organizationFounded") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganization = getOrganization(event.data.organizationId);

		return `${thisPerson.firstName} ${thisPerson.lastName} has founded ${thisOrganization.name}`;
	}

	if (event.type === "organizationTransfer") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganization = getOrganization(event.data.organizationId);

		return `Ownership of ${thisOrganization.name} is being transferred to ${thisPerson.firstName} ${thisPerson.lastName}`;
	}

	if (event.type === "technologyDiscovered") {
		const thisPerson = getPerson(event.data.personId);
		const thisOrganization = event.data.organizationId ? getOrganization(event.data.organizationId) : undefined;
		const thisTechnology = technologies[event.data.technologyId];

		return `${thisPerson.firstName} ${thisPerson.lastName} discovered ${thisTechnology.name}${thisOrganization?.name ? ` while working at ${thisOrganization.name}` : ""}.`;
	}

	if (event.type === "productCreation") {
		const thisOrganization = getOrganization(event.data.organizationId);
		const thisProduct = getProduct(event.data.productId);

		return `${thisOrganization.name} has created ${thisProduct.name}`;
	}
}

function getProduct(id) {
	return world.products.find((product) => product.id === id);
}

function getPerson(id) {
	return world.people.find((person) => person.id === id);
}

function getOrganization(id) {
	return world.organizations.find((org) => org.id === id);
}

function getPersonOrganizations(event) {
	const organizationNames = event.data.organizationId.map((id) => {
		const organization = getOrganization(id);
		return organization?.name;
	});

	return organizationNames.join(", ");
}

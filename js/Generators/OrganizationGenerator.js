import { world } from "../World/World.js";

import { LastNames, organizationNames } from "../Data/Names.js";

import Organization from "../Models/Organization.js";

export function generateOrganization(person, moneyInvested, organizationType, organizationIdentity) {
	const thisOrganization = new Organization();
	thisOrganization.id = world.organizations.length + 1;

	const organizationNameData = organizationNames[organizationType];

	thisOrganization.name = defineOrganizatioName(organizationNameData, person);

	// thisOrganization.name =
	// 	Team.prefix[Math.floor(Math.random() * Team.prefix.length)] +
	// 	` ${person.lastName} ` +
	// 	Team.suffix[Math.floor(Math.random() * Team.suffix.length)];

	// thisOrganization.name =

	thisOrganization.money = moneyInvested;
	thisOrganization.prestige = Math.floor(Math.random() * 100);

	thisOrganization.owner = person;

	thisOrganization.type = organizationType;
	thisOrganization.identities.push(organizationIdentity);

	thisOrganization.foundingYear = world.year;

	thisOrganization.active = true;

	person.ownedOrganizations.push(thisOrganization);
	world.organizations.push(thisOrganization);

	return thisOrganization;
}

function defineOrganizatioName(organizationData, person) {
	const availablePrefix = organizationData.prefix;
	const availableSuffix = organizationData.suffix;

	const thisPersonName = person.lastName;

	const thisPrefix = availablePrefix.length > 0 ? `${availablePrefix[Math.floor(Math.random() * availablePrefix.length)]} ` : "";
	const thisSuffix = availableSuffix.length > 0 ? ` ${availableSuffix[Math.floor(Math.random() * availableSuffix.length)]}` : "";

	return thisPrefix + thisPersonName + thisSuffix;
}

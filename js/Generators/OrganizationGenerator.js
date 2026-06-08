import { world } from "../World/World.js";

import { LastNames, Team } from "../Data/Names.js";

import Organization from '../Models/Organization.js';

export function generateOrganization(person, moneyInvested, organizationType) {
	const thisOrganization = new Organization();
	thisOrganization.id = world.organizations.length + 1;

	// Old random way
	// thisOrganization.name = Team.prefix[Math.floor(Math.random() * Team.prefix.length)] + 
	// ` ${LastNames[Math.floor(Math.random() * LastNames.length)]} `   
	// + Team.suffix[Math.floor(Math.random() * Team.suffix.length)];

	thisOrganization.name = Team.prefix[Math.floor(Math.random() * Team.prefix.length)] + 
	` ${person.lastName} `   
	+ Team.suffix[Math.floor(Math.random() * Team.suffix.length)];

	thisOrganization.money = moneyInvested;
	thisOrganization.prestige = Math.floor(Math.random() * 100);

	thisOrganization.owner = person;

	thisOrganization.type = organizationType;

	person.ownedOrganizations.push(thisOrganization);
	world.organizations.push(thisOrganization);

	return thisOrganization;
}

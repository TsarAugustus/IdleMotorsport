import { world } from "./World.js";

import { generatePerson } from "../Generators/PersonGenerator.js";
import { generateOrganization } from "../Generators/OrganizationGenerator.js";

import { organizationHire } from "../Systems/HiringSystem.js";
import { addHistory } from "../Systems/HistorySystem.js";
import { attemptDiscoveries } from "../Systems/DiscoverySystem.js";
import { attemptTechnologyAdoption } from "../Systems/AdoptionSystem.js";

import { technologies } from "../Data/TechnologyDatabase.js";
import { attemptOrganizationFounding } from "../Systems/FoundOrganizationSystem.js";

export function simulate(initPeople, initOrganizations, yearsToSimulate) {
	// Sample Generation
	for (let i = 0; i < initPeople; i++) generatePerson();
	for (let i = 0; i < initOrganizations; i++) generateOrganization(); 

	const daysInYear = world.daysPerMonth * world.monthsPerYear;

	for (let i = 0; i < yearsToSimulate * daysInYear; i++) {
		tick()
	}

	console.log(world)
}

// Progresses time
function tick() {
	const previousYear = world.year;

	world.day++;
	if (world.day > world.daysPerMonth) {
		world.day = 1;
		world.month++;
	}
	if (world.month > world.monthsPerYear) {
		world.month = 1;
		world.year++;
	}

	if (world.year > previousYear) {

		// Random organization founding
		if(Math.random() > 0.9) {
			const randomPerson = world.people[Math.floor(Math.random() * world.people.length)];
			
			attemptOrganizationFounding(randomPerson);
		}

		// Pick random company, try to hire someone
		const randomOrganzation = world.organizations[Math.floor(Math.random() * world.organizations.length)];
		
		if(randomOrganzation !== undefined) {
			const organizationOwner = randomOrganzation.owner;
			const randomPerson = world.people[Math.floor(Math.random() * world.people.length)];
			
			if	(organizationOwner !== randomPerson && 
				randomPerson.ownedOrganizations.length === 0 &&
				!randomOrganzation.employees.some(employee => employee.id === randomPerson.id)) {
					organizationHire(randomOrganzation, randomPerson);
			}
		}


		if(world.organizations.length > 0 && world.people.length > 0) {
			const thisTechnology = Object.values(technologies)[Math.floor(Math.random() * Object.values(technologies).length)];

			attemptDiscoveries();
			attemptTechnologyAdoption(
				world.organizations[Math.floor(Math.random() * world.organizations.length)],
				thisTechnology
			);
		}
	}
}

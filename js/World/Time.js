import { world } from "./World.js";

import { generatePerson } from "../Generators/PersonGenerator.js";
import { generateOrganization } from "../Generators/OrganizationGenerator.js";

import { initiateHireFilter, organizationHireTick } from "../Systems/HiringSystem.js";
import { addHistory } from "../Systems/HistorySystem.js";
import { attemptDiscoveries, discoveryTick } from "../Systems/DiscoverySystem.js";
import { attemptTechnologyAdoption } from "../Systems/AdoptionSystem.js";
import { handleRetirement } from "../Systems/RetirementSystem.js";
import { handleDeath } from "../Systems/DeathSystem.js";

import { technologies } from "../Data/TechnologyDatabase.js";
import { attemptOrganizationFounding } from "../Systems/FoundOrganizationSystem.js";
import { alivePeoplePerYear } from "../init.js";
import { populateWorld } from "../Systems/PopulationSystem.js";
import { organizationTick } from "../Systems/FoundOrganizationSystem.js";

export function simulate(initPeople, initOrganizations, yearsToSimulate, alivePeoplePerYear) {
	// Sample Generation
	for (let i = 0; i < initPeople; i++) generatePerson();
	for (let i = 0; i < initOrganizations; i++) generateOrganization();

	const daysInYear = world.daysPerMonth * world.monthsPerYear;

	for (let i = 0; i < yearsToSimulate * daysInYear; i++) {
		tick();
	}

	console.log(`End of simulation. Total of ${yearsToSimulate} years.`);
	console.log(world);
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
		world.people.forEach((person) => {
			if (person.alive) {
				person.age++;
				if (person.age > 70 && !person.retired) {
					person.retired = true;
					handleRetirement(person);
				}

				if (person.age > 80 && person.alive) {
					person.alive = false;
					handleDeath(person);
				}
			}
		});
	}

	if (world.year > previousYear) {
		newYearTick();
	}
}

function newYearTick() {
	populateWorld();
	organizationTick();
	organizationHireTick();
	discoveryTick();
}

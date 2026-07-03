import { world } from "./World.js";

import { organizationHireTick } from "../Systems/HiringSystem.js";
import { discoveryTick } from "../Systems/DiscoverySystem.js";
import { handleRetirement } from "../Systems/RetirementSystem.js";
import { handleDeath } from "../Systems/DeathSystem.js";

import { populateWorld } from "../Systems/PopulationSystem.js";
import { organizationTick } from "../Systems/FoundOrganizationSystem.js";
import { productTick } from "../Systems/ProductCreationSystem.js";
import revenueTick from "../Systems/RevenueSystem.js";
import playerTick from "../Systems/PlayerSystem.js";

export function simulate(initPeople, initOrganizations, yearsToSimulate) {
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
	productTick();
	revenueTick();

	playerTick();
}

import { world } from "./World.js";

import { generatePerson } from "../Generators/PersonGenerator.js";
import { generateOrganization } from "../Generators/OrganizationGenerator.js";

import { initiateHireFilter } from "../Systems/HiringSystem.js";
import { addHistory } from "../Systems/HistorySystem.js";
import { attemptDiscoveries } from "../Systems/DiscoverySystem.js";
import { attemptTechnologyAdoption } from "../Systems/AdoptionSystem.js";
import { handleRetirement } from "../Systems/RetirementSystem.js";
import { handleDeath } from "../Systems/DeathSystem.js";

import { technologies } from "../Data/TechnologyDatabase.js";
import { attemptOrganizationFounding } from "../Systems/FoundOrganizationSystem.js";
import { alivePeoplePerYear } from "../init.js";

export function simulate(initPeople, initOrganizations, yearsToSimulate, alivePeoplePerYear) {
	// Sample Generation
	for (let i = 0; i < initPeople; i++) generatePerson();
	for (let i = 0; i < initOrganizations; i++) generateOrganization(); 

	const daysInYear = world.daysPerMonth * world.monthsPerYear;

	for (let i = 0; i < yearsToSimulate * daysInYear; i++) {
		tick()
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
		world.people.forEach(person => {	
			if(person.alive) {
				person.age++
				if(person.age > 70 && !person.retired) {
					person.retired = true;
					handleRetirement(person);
				}

				if(person.age > 60 && person.alive) {
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

	// Populate yearly
	const totalAlivePeople = world.people.filter(person => person.alive);
	for(let i = 0; i < alivePeoplePerYear - totalAlivePeople.length; i++) {
		generatePerson();
	}

	// Random organization founding
	if(Math.random() > 0.5) {
		const randomPerson = world.people[Math.floor(Math.random() * world.people.length)];
		
		if(!randomPerson.retired && randomPerson.alive) attemptOrganizationFounding(randomPerson);
	}
	
	// Pick random company, try to hire someone
	const randomOrganzation = world.organizations[Math.floor(Math.random() * world.organizations.length)];
	if(randomOrganzation) initiateHireFilter(randomOrganzation);

	// Try to discover / adopt technologies
	if(world.organizations.length > 0 && world.people.length > 0) {
		const thisTechnology = Object.values(technologies)[Math.floor(Math.random() * Object.values(technologies).length)];

		attemptDiscoveries();
		attemptTechnologyAdoption(
			world.organizations[Math.floor(Math.random() * world.organizations.length)],
			thisTechnology
		);
	}
}

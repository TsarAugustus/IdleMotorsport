import { generateOrganization } from "./Generators/OrganizationGenerator.js";
import { generatePerson } from "./Generators/PersonGenerator.js";
import createCharacter from "./Systems/CharacterCreationSystem.js";
import { simulate } from "./World/Time.js";
import { world } from "./World/World.js";

export const initPeople = 100;
export const initOrganizations = 0;
export const yearsToSimulate = 100;

export const alivePeoplePerYear = 100;

async function newGame() {
	const player = await createCharacter();
	world.player = player;

	// Sample Generation
	for (let i = 0; i < initPeople; i++) generatePerson();
	for (let i = 0; i < initOrganizations; i++) generateOrganization();

	simulate(initPeople, initOrganizations, yearsToSimulate, alivePeoplePerYear);
}

newGame();

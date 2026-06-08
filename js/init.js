import { world } from "./World/World.js";

import { generatePerson } from "./generators/PersonGenerator.js";
import { generateOrganization } from "./generators/OrganizationGenerator.js";

import { simulate } from "./World/Time.js";

export const initPeople = 100;
export const initOrganizations = 0;
export const yearsToSimulate = 100;

export const alivePeoplePerYear = 100;

simulate(initPeople, initOrganizations, yearsToSimulate, alivePeoplePerYear);

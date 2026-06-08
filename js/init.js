import { world } from "./world/World.js";

import { generatePerson } from "./generators/PersonGenerator.js";
import { generateOrganization } from "./generators/OrganizationGenerator.js";

import { simulate } from "./World/Time.js";

export const initPeople = 10;
export const initOrganizations = 0;
export const yearsToSimulate = 50;

simulate(initPeople, initOrganizations, yearsToSimulate);

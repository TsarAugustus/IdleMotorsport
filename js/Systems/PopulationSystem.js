import { world } from "../World/World.js";

import { alivePeoplePerYear } from "../init.js";

import { generatePerson } from "../Generators/PersonGenerator.js";

// Populate yearly
export function populateWorld() {
  const totalAlivePeople = world.people.filter((person) => person.alive);

  for (let i = 0; i < alivePeoplePerYear - totalAlivePeople.length; i++) {
    generatePerson();
  }
}

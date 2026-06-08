import { world } from "../World/World.js";
import { FirstNames, LastNames } from "../Data/Names.js";

import Person from "../Models/Person.js";

export function generatePerson() {
	const thisPerson = new Person();
	thisPerson.id = world.people.length + 1;
	thisPerson.firstName = FirstNames[Math.floor(Math.random() * FirstNames.length)];
	thisPerson.lastName = LastNames[Math.floor(Math.random() * LastNames.length)];
	thisPerson.age = Math.floor(Math.random() * 60) + 18;
	thisPerson.money = Math.floor(Math.pow(Math.random(), 3) * 10000);
	thisPerson.prestige = Math.floor(Math.random() * 100);
	thisPerson.alive = true;
	thisPerson.retired = false;

	Object.keys(thisPerson.skills).forEach(skill => {
		thisPerson.skills[skill] = Math.floor(Math.random() * 101);
	});
	
	world.people.push(thisPerson);
}

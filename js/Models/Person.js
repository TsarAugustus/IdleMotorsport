import { skills } from "../Data/Skills.js"

export default class Person {
	id;
	firstName;
	lastName;
	age;
	money;
	prestige;
	employedOrganizations = [];
	ownedOrganizations = [];
	alive;
	retired;
	skills = skills;
}

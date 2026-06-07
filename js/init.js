import { firstNames, lastNames } from "./Names.js";

const Team = {
	prefix: ['Scuderia', 'Team', 'Super'],
	suffix: ['Team', 'Racing', 'Motorsport', 'GP', 'Automobiles', 'Engineering', 'Motors', 'Grand Prix']
};

const Tire = {
	prefix: [],
	suffix: ['Tire', 'Tires', 'Tyre', 'Tyres', 'Rubber', 'Racing Tyres', 'Racing Tires']
};


class person {
	id;
	firstName;
	lastName;
	age;
	money;
	prestige;
	organization = [];
	skills = {
		aerodynamics: 0,
	}
}

class organization {
	id;
	name;
	money;
	prestige;
	employees = [];
	technologies = [];
}

class technology {
	constructor(id, name, difficulty) {
		this.id = id;
		this.name = name;
		this.difficulty = difficulty;
		this.discovered = false;
		this.discoveredBy = null;
		this.discoveredYear = null;
		this.provenness = 0;
		this.apoters = [];
		this.influences = [];
	}
}

const technologies = {
	gurneyFlap: new technology(
		'gurneyFlap',
		'Gurney Flap',
		5
	),

	canard: new technology(
		'canard',
		'Canard',
		10
	),

	frontWing: new technology(
		'frontWing',
		'Front Wing',
		15
	),

	rearWing: new technology(
		'rearWing',
		'Rear Wing',
		15
	),

	groundEffect: new technology(
		'groundEffect',
		'Ground Effect',
		50
	),
};

// Influences
technologies.gurneyFlap.influences = {
	frontWing: 10,
	rearWing: 15
};

technologies.canard.influences = {
	frontWing: 20,
	rearWing: 25,
	gurneyFlap: 10
};

technologies.frontWing.influences = {
	frontWing: 50,
	groundEffect: 20
};

technologies.rearWing.influences = {
	frontWing: 50,
	groundEffect: 20
};

// Holds all the information for the world
const world = {
	day: 1,
	month: 1,
	year: 1,

	people: [],
	organizations: [],
	technologies: [],
	history: []
}

simulate(50)
function simulate(years) {
	// Sample Generation
	for(let j = 0; j < 10; j++) {
		generatePerson();
		generateOrganization()
	}

	//360 day year, 12 months, 30 days per month
	for(let i = 0; i < years * 360; i++) {
		tick()
	}
}

// Progresses time
function tick() {
	const previousYear = world.year;

	world.day++;
	if (world.day > 30) {
		world.day = 1;
		world.month++;
	}
	if (world.month > 12) {
		world.month = 1;
		world.year++;
	}

	let randomEventChance = Math.random() * 100;

	if(randomEventChance > 80) {
		// addHistory(`On day ${world.day} of month ${world.month} in year ${world.year}, a random event occurred!`);
		organizationHire(world.organizations[Math.floor(Math.random() * world.organizations.length)].id, world.people[Math.floor(Math.random() * world.people.length)].id);
	}

	if (world.year > previousYear) {
    	attemptDiscoveries();
		attemptTechnologyAdoption(
			world.organizations[Math.floor(Math.random() * world.organizations.length)].id,
			Object.values(technologies)[Math.floor(Math.random() * Object.values(technologies).length)].id
		);
	}
}

// Function to add to world.history array
function addHistory(event) {
	// console.log(event);
	world.history.push(event);
	console.log(event);
}

// Generic loop
// for(let i = 0; i < 3600; i++) {
	
// }

function generatePerson() {
	const thisPerson = new person();
	thisPerson.id = world.people.length + 1;
	// thisPerson.name = `thisPerson ${Person.id}`;
	thisPerson.firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	thisPerson.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	thisPerson.age = Math.floor(Math.random() * 60) + 18;
	thisPerson.money = Math.floor(Math.random() * 10000);
	thisPerson.prestige = Math.floor(Math.random() * 100);
	thisPerson.skills.aerodynamics = Math.floor(Math.random() * 100);
	world.people.push(thisPerson);
}

function generateOrganization() {
	const thisOrganization = new organization();
	thisOrganization.id = world.organizations.length + 1;

	thisOrganization.name = Team.prefix[Math.floor(Math.random() * Team.prefix.length)] + 
	` ${lastNames[Math.floor(Math.random() * lastNames.length)]} `   
	+ Team.suffix[Math.floor(Math.random() * Team.suffix.length)];

	thisOrganization.money = Math.floor(Math.random() * 1000000);
	thisOrganization.prestige = Math.floor(Math.random() * 100);
	world.organizations.push(thisOrganization);
}

function organizationHire(organizationId, personId) {

    const organization = world.organizations.find(org => org.id === organizationId);

    const person = world.people.find(per => per.id === personId);

    // Remove from previous employer
    if (person.organization.length > 0) {

        const oldOrganization = person.organization[0];

        oldOrganization.employees = oldOrganization.employees.filter(employee => employee.id !== person.id);

        addHistory(`${person.firstName} ${person.lastName} left ${oldOrganization.name} in year ${world.day} / ${world.month} / ${world.year}.`);
    }

    organization.employees.push(person);

    person.organization = [organization];

    addHistory(`${person.firstName} ${person.lastName} was hired by ${organization.name} in year ${world.day} / ${world.month} / ${world.year}.`);

}

function getInfluenceBonus(technologyId) {

    let bonus = 0;

    Object.values(technologies).forEach(tech => {

        if (!tech.discovered) return;

        if (tech.influences[technologyId]) {
            bonus += tech.influences[technologyId];
        }

    });

    return bonus;
}

function attemptDiscoveries() {

    world.people.forEach(person => {

        Object.values(technologies).forEach(tech => {

            if (tech.discovered) return;

            const influenceBonus = getInfluenceBonus(tech.id);

            const discoveryChance = person.skills.aerodynamics + influenceBonus - tech.difficulty;

            const roll = Math.random() * 100;

            if (roll < discoveryChance) {

                tech.discovered = true;

                tech.discoveredBy = person.id;

                tech.discoveredYear = world.year;

                addHistory(`${person.firstName} ${person.lastName} discovered ${tech.name} in year ${world.year}.`);
            }
        });
    });
}

function attemptTechnologyAdoption(organizationId, technologyId) {
	const organization = world.organizations.find(org => org.id === organizationId);
	const technology = technologies[technologyId];

	if (!technology.discovered) return;
	if (organization.technologies.includes(technology)) return;

	console.log(`Attempting to adopt ${technology.name} for ${organization.name}`);
	if(Math.random() * 100 < 50) {
		organization.technologies.push(technology);
		technologies[technologyId].apoters.push(organization.id);
		technology.provenness += 10;
		addHistory(`${organization.name} adopted ${technology.name} in year ${world.year}.`);
		console.log('Proved:', technologyId.provenness)
	}
}

// console.log(world.history)
console.log(world.people)
console.log(world.organizations)
console.log(technologies)

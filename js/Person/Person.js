import { Structure } from '../data/Structure/Structure.js';
import { Name } from '../data/Structure/Name.js';
import { Nickname } from '../data/Structure/Nickname.js';

export function Person(randomAttributesBoolean, People) {
	let NewPerson = {};
	NewPerson = Structure.Person();

	const randomNameLocation = Object.keys(Name)[Math.floor(Math.random() * Object.keys(Name).length)];
	const randomPersonSex = ['Male', 'Female'][Math.floor(Math.random() * 2)];

	const firstNameList = Name[randomNameLocation][randomPersonSex].First;
	const lastNameList = Name[randomNameLocation].Last;

	NewPerson.Name.First = firstNameList[Math.floor(Math.random() * firstNameList.length)];
	NewPerson.Name.Last = lastNameList[Math.floor(Math.random() * lastNameList.length)];

	NewPerson.Sex = randomPersonSex;

	// const Roles = Object.keys(Structure.Role());
	// const randomPersonRole = Roles[Math.floor(Math.random() * Roles.length)];
	// NewPerson.Role.push(Structure.Role()[randomPersonRole]);
	
	if(randomAttributesBoolean === true) {
		NewPerson.Money = randomNumber(0, 100000);
		NewPerson.Attributes = randomAttributes(NewPerson.Attributes);
		NewPerson.Statistics = randomStatistics(NewPerson.Statistics);
		NewPerson.Name.Nickname = determineNickname(NewPerson, People);
	}

	if(NewPerson.Name.Nickname !== String) console.log(`${NewPerson.Name.First} '${NewPerson.Name.Nickname}' ${NewPerson.Name.Last}`);

	return NewPerson;
}

function randomStatistics(Statistics) {
	Object.keys(Statistics).forEach(stat => {
		let thisRandomStatisticNumber = randomNumber(1, 50);

		let thisRandomStatisticArray = [];

		for(let i = 0; i < thisRandomStatisticNumber; i++) {
			thisRandomStatisticArray.push({});
		}

		Statistics[stat] = thisRandomStatisticArray;
	});
	
	return Statistics;
}

function determineNickname(NewPerson, People) {
	let potentialNicknames = [];

	Nickname.forEach(name => {
		const requirements = name.Requirements;

		let confirmedRequirements = [];
		let uniqueNameFound = false;

		if(name.Unique) {
			const foundName = People.filter(person => name.Title === person.Name.Nickname);
			
			if(foundName.length > 0) uniqueNameFound = true;
		}
		
		if(requirements.Attributes) {
			//Determine based on attributes
			const attributeKeys = Object.keys(requirements.Attributes);
			
			let confirmedAttributes = [];

			attributeKeys.forEach(attribute => {
				if(NewPerson.Attributes[attribute] >= requirements.Attributes[attribute]) confirmedAttributes.push(attribute);
			});

			if(confirmedAttributes.length === attributeKeys.length) confirmedRequirements.push('Attributes');
		}

		if(requirements.Name) {
			const nameKeys = Object.keys(requirements.Name);

			nameKeys.forEach(name => {
				if(NewPerson.Name[name] === requirements.Name[name]) {
					confirmedRequirements.push('Name');
				}
			});
		}

		if(requirements.Statistics) {
			const statisticsKeys = Object.keys(requirements.Statistics);

			let confirmedStatistics = [];

			statisticsKeys.forEach(stat => {
				if(NewPerson.Statistics[stat].length >= requirements.Statistics[stat]) confirmedStatistics.push(stat);
			});

			if(confirmedStatistics.length === statisticsKeys.length) confirmedRequirements.push('Statistics');
		}
		
		if(Object.keys(name.Requirements).length === confirmedRequirements.length && uniqueNameFound === false) potentialNicknames.push(name);
	});

	if(potentialNicknames.length > 0) return potentialNicknames[Math.floor(Math.random() * potentialNicknames.length)].Title;
	else return String;
}

function randomAttributes(Attributes) {
	const attributeKeys = Object.keys(Attributes);

	attributeKeys.forEach(thisAttribute => {
		Attributes[thisAttribute] = randomNumber(0, 100);
	});

	return Attributes;
}
function randomNumber(min, max) {	
	return Math.floor(Math.random() * (max - min) + min);
}

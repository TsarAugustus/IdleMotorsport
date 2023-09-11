import { getRandomNumber } from './getRandomNumber.js';

const Types = [
	{
		name: 'Team Principal',
		department: [],
		rank: 4,
		skills: {}
	},
	// Rank 3
	// 'Heads of Departments'
	{
		name: 'Chief Executive Officer',
		department: ['Logistics'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Technical Officer',
		department: ['Aerodynamics', 'Chassis', 'Power'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Engineering Officer',
		department: ['Aerodynamics', 'Chassis', 'Power'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Financial Officer',
		department: ['Finance'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Strategy Officer',
		department: ['Logistics', 'Finance'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Mechanical Officer',
		department: ['Chassis', 'Power'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Operations Officer',
		department: ['Aerodynamics', 'Chassis', 'Power', 'Finance', 'Logistics'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Information Officer',
		department: ['Finance', 'Logistics'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Design Officer',
		department: ['Aerodynamics', 'Chassic', 'Power', 'Logistics', 'Finance'],
		rank: 3,
		skills: {},
		promotion: []
	}, {
		name: 'Chief Data Officer',
		department: ['Logistics', 'Finance'],
		rank: 3,
		skills: {},
		promotion: []
	},
	// Rank 2
	{
		name: 'Technical Director',
		department: ['Aerodynamics', 'Chassis', 'Power'],
		rank: 2,
		skills: {},
		promotion: ['Chief Technical Officer']
	}, {
		name: 'Financial Director',
		department: ['Finance'],
		rank: 2,
		skills: {},
		promotion: ['Chief Financial Officer']
	}, {
		name: 'Commercial Director',
		department: ['Logistics', 'Finance'],
		rank: 2,
		skills: {},
		promotion: ['Chief Financial Director']
	}, {
		name: 'Sporting Director',
		department: ['Logistics', 'Finance'],
		rank: 2,
		skills: {},
		promotion: ['Chief Strategy Officer']
	},
	// Rank 1
	{
		name: 'Aerodynamics Engineer',
		department: ['Aerodynamics'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Chassis Engineer',
		department: ['Chassis'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Power Engineer',
		department: ['Power'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Mechanical Engineer',
		department: ['Chassis' ,'Power'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Design Engineer',
		department: ['Aerodynamics', 'Chassis', 'Power', 'Finance', 'Logistics'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Electronics Engineer',
		department: ['Power'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Trackside Engineer',
		department: ['Aerodynamics', 'Chassis', 'Power', 'Logistics'],
		rank: 1,
		skills: {},
		promotion: []
	}, {
		name: 'Race Engineer',
		department: ['Logistics'],
		rank: 1,
		skills: {},
		promotion: ['Sporting Director']
	}, 

	{
		name: 'Hobbyist',
		department: ['Aerodynamics', 'Chassis', 'Finance', 'Logistics', 'Power'],
		rank: 0,
		skills: {},
		promotion: []
	}];

const skills = [{
	name: 'Ingenuity',
	department: ['Aerodynamics', 'Chassis', 'Finance', 'Logistics', 'Power'],
	number: 0
}, {
	name: 'Critial Thinking',
	department: ['Aerodynamics', 'Chassis', 'Finance', 'Logistics', 'Power'],
	number: 0
}, {
	name: 'Leadership',
	department: ['Aerodynamics', 'Chassis', 'Finance', 'Logistics', 'Power'],
	number: 0
}];

function Staff(name, type) {
	let thisStaff = {
		name: name,
		teamEmployed: {},
		teamsOwned: [],
		type: type,
		department: [],
		promotion: [],
		skills: [],
		contractLength: Number,
		funds: getRandomNumber(1, 100),
		cost: getRandomNumber(1, 10),
		statistics: {
			wins: [],
			podiums: [],
			fastestLaps: [],
			poles: [],
			titles: [],
			entries: [],
			points: 0
		}
	};

	if(thisStaff.type === undefined) {
		let types = getLowestStaffTypes(Types);
		let staffType = types[Math.floor(Math.random() * types.length)];
		thisStaff.type = staffType.name;
		thisStaff.department = staffType.department;
		thisStaff.promotion = staffType.promotion;
	}

	let newSkill = skills[Math.floor(Math.random() * skills.length)];
	newSkill.number = getRandomNumber(1, 10);
	thisStaff.skills.push(newSkill);

	return thisStaff;
}

function getLowestStaffTypes(Types) {
	let rank;
	let lowestStaffTypes = [];
	Types.forEach(type => { if(!rank || rank > type.rank) rank = type.rank; });

	for(let staffTypes of Types) if(staffTypes.rank === rank) lowestStaffTypes.push(staffTypes);

	return lowestStaffTypes;
}

export { Staff };
import { Series } from '../../Series/Series.js';

// {
// 	Name: '',
// 	//If left blank, any role can do this. Quote 'Driver', 'Owner' etc for specific roles
// 	Role: [],
// 	Requirements: {
// 		//0 For any tier, one number for a specific tier. x-y string of numbers for a range of tiers
// 		Tier: 0,

// 		//Statistic Requirements
// 		// Leave blank for no requirements
// 		Statistics: {
// 			Championships: 0,
// 			Wins: 0,
// 			Podiums: 0,
// 			Races: 0
// 		}
// 	},

// 	//How long the goal will last
// 	Duration: 0,

// 	//Reward for completing the goal
// 	Reward: {
// 		Traits: [{
// 			Name: '',
// 			Chance: 0
// 		}],
// 		Attributes: [{
// 			Name: '',
// 			Amount: 0,
// 			Chance: 0
// 		}]
// 	},

// 	//Pentalty for not comleting the goal
// 	Penalty: {
// 		Traits: [{
// 			Name: '',
// 			Chance: 0
// 		}],
// 		Attributes: [{
// 			Name: '',
// 			Amount: 0,
// 			Chance: 0
// 		}]
// 	},

// 	//Items the goal conflicts with
// 	Exclusive: {
// 		Traits: [{
// 			Name: '',
// 			Chance: 0
// 		}],
// 		Attributes: [{
// 			Name: '',
// 			Amount: 0,
// 			Chance: 0
// 		}],
// 		Statistics: {
// 			Championships: 0,
// 			Wins: 0,
// 			Podiums: 0,
// 			Races: 0
// 		}
// 	},
// 	Type: 'Series',

// 	//Trigger when goal is complete
// 	//Leave undefined for no trigger
// 	//Add a function on trigger.
// 	Excecution: undefined,

// 	//Chance that this goal will occur.
// 	//This number is subjective to each Person based on: 
// 	//Requirements, Current Feelings, Penalty/Rewards, Duration, Traits etc
// 	Likelihood: Number,

// 	//True or False value
// 	Completed: Boolean,
// 	Accepted: Boolean
// };

// {
// 	Name: 'Win Championship',
// 	Role: ['Driver', 'Owner'],
// 	Requirements: {
// 		Tier: 1,
// 		Statistics: {
// 			Championships: 1
// 		}
// 	},
// 	Duration: 360,
// 	Reward: {
// 		Traits: [{
// 			Name: 'Inspiring',
// 			Chance: 100
// 		}],
// 		Attributes: [{
// 			Name: 'Prestige',
// 			Amount: 1000,
// 			Chance: 100
// 		}],

// 	},
// 	Penalty: [{
// 		Traits: [{}],
// 		Attributes: [{
// 			Name: 'Morale',
// 			Amount: -50,
// 			Chance: 100
// 		}]
// 	}],
// 	Exclusive: [],
//	Type: '',
// 	Execution: undefined,
// 	Likelihood: 0,
// 	Completed: false,
// 	Accepted: false
// }, 

export let Goals = [{
	Name: 'Create Series',
	Role: [],
	Requirements: {},
	Duration: 360,
	Reward: {
		Traits: [{
			Type: 'Personality',
			Name: 'Inspiring',
			Chance: 100
		}],
		Attributes: [{
			Name: 'Prestige',
			Amount: 1000,
			Chance: 100
		}],

	},
	Penalty: {
		Traits: [],
		Attributes: [{
			Name: 'Morale',
			Amount: -50,
			Chance: 100
		}]
	},
	Exclusive: [],
	Type: 'Series',
	ExecutionName: 'Series',
	Execution: function() { Series(); },
	Likelihood: 0,
	Completed: false,
	Accepted: false
}];

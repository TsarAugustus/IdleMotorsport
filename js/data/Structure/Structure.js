import { Feelings, CombinationFeelings } from './Feelings.js';

function Person() {
	return {
		Name: {
			First: String,
			Last: String,
			Nickname: String,
			Locale: String
		},
		Age: Number,
		Sex: String,
		Role: [],
		Attributes: {
			//Common Attributes
			Prestige: Number,
			Charisma: Number,
			Morale: Number,

			//Driver Attributes
			Accuracy: Number,
			Adaptability: Number,
			Braking: Number,
			Cornering: Number,
			Control: Number,
			Consistency: Number,
			Defending: Number,
			Fitness: Number,
			Feedback: Number,
			Focus: Number,
			Improvability: Number,
			Marketability: Number,
			Overtaking: Number,
			Pace: Number,
			Racecraft: Number,
			Smoothness: Number,
			//Owner Attributes
			Management: Number

		},
		Statistics: {
			Wins: Array,
			Podiums: Array,
			Championships: Array,
			Races: Array
		},
		Money: Number,
		MentalHealth: {
			CurrentFeelings: {
				Feelings: undefined,
				CombinationFeelings: undefined
			},
			Feelings,
			CombinationFeelings
		},
		Traits: [],
		Goals: []
	};
	
}

function Role() {
	return {
		Driver: {
			Series: [Object],
			Team: [Object],
			Vehicle: [Object]
		},
		Owner: {
			Team: [Object],
			Track: [Object],
			Manufacturer: [Object],
			Series: [Object]
		}
	};
}

function Team() {
	return {
		Owner: [Object],
		Series: [Object]
	};
}

function Series() {
	return {
		Owner: [Object],
		Rules: [Object],
		Teams: [Object],
		Sponsors: {
			TitleSpnsor: Object,
			SponsorList: [Object]
		}		
	};	
}

function Manufacturer() {
	return {

	};
}

function Track() {
	return {

	};
}

function Vehicle() {
	return {

	};
}

function Rules() {
	return {
		Style: {
		
		}
	};	
}

// let rules = {
// 	style: seriesType().style,
// 	ovals: Boolean,
// 	teamLimit: Number,
// 	vehiclesPerTeam: Number,
// 	trackGrade: Number,
// 	championshipTracks: Number,
// 	nonChampionshipTracks: Number
// };

export const Structure = {
	Person,
	Role,
	Team,
	Series,
	Manufacturer,
	Track,
	Vehicle,
	Rules
};

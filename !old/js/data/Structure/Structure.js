import { Feelings, CombinationFeelings } from './Feelings.js';
import { Surface } from './Track/Surface/Surface.js';

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
			Wins: [],
			Podiums: [],
			Championships: [],
			Races: []
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
		Goals: [],
		Preferences: {
			TrackType: {
				Style: undefined,
				Surface: undefined,
				Type: undefined
			},
			SeriesTier: undefined
		},
		Driver: {
			Series: []
		}
	};
	
}

function Role() {
	return [{
		Title: 'Driver',
		Series: [Object],
		Team: [Object],
		Vehicle: [Object]
	}, {
		Title: 'Owner',
		Team: [Object],
		Track: [Object],
		Manufacturer: [Object],
		Series: [Object]
	}, {
		Title: 'Mechanic'
	}, {
		Title: 'Race Engineer'
	}];
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

// const regulations = {
// 	Engine: {
// 		configuration: undefined, 		// V...
// 		boreDiameter: undefined, 		// Number
// 		strokeLength: undefined,		// Number
// 		cylinderNumber: undefined,		// Number
// 		valvesPerCylinder: undefined,	// Number
// 		valveEfficiency: undefined,		// Number
// 		boreStrokeRatio: undefined,		// Number
// 		boreStrokeType: undefined,		// Number
// 		engineDisplacement: undefined,	// Number
// 		RPM: undefined,					// Number
// 		torque: undefined,				// Number
// 		BMEP: undefined,				// Number
// 		HP: undefined,					// Number
// 		manufacturer: undefined,		// String
// 		weight: undefined,				// Number
// 		rating: undefined,				// Number
// 		acceleration: undefined,		// Number
// 		KMPH: undefined,				// Number
// 		zeroToOneHundred: undefined, 	// Number
// 		durability: undefined			// Number
// 	}
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

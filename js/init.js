/* eslint-disable no-unused-vars */
// import { Vehicle } from './Vehicle/Vehicle.js';
// import { Circuit } from './Circuit/Circuit.js';
import { Series } from './Series/Series.js';
import { Track } from './Track/Track.js';
import { Person } from './Person/Person.js';
import { Goals } from './data/Structure/Goals.js';
import { Traits } from './data/Traits/Traits.js';
// import { writeToHTML } from './HTML/writeToHTML.js';
// import { Structure } from './data/Structure/Structure.js';

let TickLimit = {
	Iteration: 0,
	Limit: 10000
};

let Year = 0;
let CurrentMonth = 'January';
let CurrentDay = 0;

const Months = [{
	Name: 'January',
	Number: 0,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	},
}, {
	Name: 'February',
	Number: 1,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'March',
	Number: 2,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'April',
	Number: 3,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'May',
	Number: 4,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'June',
	Number: 5,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'July',
	Number: 6,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'August',
	Number: 7,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'September',
	Number: 8,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'October',
	Number: 9,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'November',
	Number: 10,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}, {
	Name: 'December',
	Number: 11,
	Days: 29,
	Weather: {
		NorthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}],
		SouthernHemisphere: [{
			Name: 'Dry',
			Chance: 0
		}]
	}
}];

let SeriesList = [];
let PersonList = [];
let TrackList = [];

function init() {
	// console.log(Vehicle());
	// console.log(Circuit());
	
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

	// console.log('FINAL:', Person(true, []));

	for(let i = 0; i < 1000; i++) PersonList.push(Person(true, PersonList));

	for(let i = 0; i < 100; i++) TrackList.push(Track(i, PersonList));

	// console.log(TrackList);

	// PersonList.push(Person(true, PersonList));

	// Person(true, []);

	// setInterval(Tick, 0);

	PersonList.forEach(person => {
		EvaluatePerson(person);
	});

	console.log(SeriesList.sort((a, b) => b.Prestige - a.Prestige));

	// EvaluatePerson(PersonList[0]);
}

function Tick() {
	const thisMonth = Months.find(month => month.Name === CurrentMonth);

	if(CurrentDay >= thisMonth.Days) {
		const newCurrentMonth = Months.find(month => month.Number === ( thisMonth.Number + 1 ));

		if(newCurrentMonth === undefined) NewYear();
		else {
			CurrentMonth = newCurrentMonth.Name;
		}

		CurrentDay = 0;
	} else {
		CurrentDay++;
	}
	
	console.log(`${CurrentDay} of ${CurrentMonth}, ${Year}`);
}

function NewYear() {
	CurrentMonth = Months.find(month => month.Number === 0).Name;
	Year++;

	PersonList.forEach(thisPerson => thisPerson = EvaluatePerson(thisPerson));
}

function EvaluatePerson(thisPerson) {
	thisPerson.Age++;
	
	if(thisPerson.Age >= 18) thisPerson = EvaluateGoals(thisPerson);
	
	return thisPerson;
}

function EvaluateGoals(thisPerson) {
	// console.log(thisPerson);
	let AvailableGoals = Goals.filter(goal => goal.Accepted === false);

	AvailableGoals.forEach(goal => {
		// const thisLikelihood
		if(goal.Type === 'Series') {
			const evaluation = EvaluateSeriesGoals(thisPerson, goal);
			thisPerson = evaluation.thisPerson;

			if(evaluation.goalStatus === true) {
				console.log('GOAL FULFULLED');
				const goalKeys = Object.keys(goal.Reward);

				goalKeys.forEach(reward => {

					if(reward === 'Traits') {
						goal.Reward[reward].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(reward === 'Attributes') {
						goal.Reward[reward].forEach(item => {
							const rewardChance = Math.floor(Math.random() * 100);
							if(item.Chance >= rewardChance) thisPerson.Attributes[item.Name] += item.Amount;
						});
					}
				});
			} else {
				const goalKeys = Object.keys(goal.Penalty);

				goalKeys.forEach(penalty => {
					if(penalty === 'Traits') {
						
						goal.Penalty[penalty].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(penalty === 'Attributes') {
						goal.Penalty[penalty].forEach(item => {
							const penaltyChance = Math.floor(Math.random() * 100);
							if(item.Chance >= penaltyChance) thisPerson.Attributes[item.Name] += item.Amount;
							if(thisPerson.Attributes[item.Name] < 0) thisPerson.Attributes[item.Name] = 0;
						});
					}
				});
			}
		}
		// console.log(goal.Execution());
		// console.log(goal);
	});

	return thisPerson;
}

function EvaluateSeriesGoals(thisPerson, goal) {
	let goalStatus = false;
	let iterationCost = 10000;
	let iterationLimit = 10;

	//Create a series
	if(goal.ExecutionName === 'Series' && thisPerson.Money >= iterationCost) {
		let potentialSeriesList = [];

		for(let i = 0; (thisPerson.Money >= iterationCost && iterationLimit >= i); i++) {
			let thisPotentialSeries = Series(TrackList, [thisPerson]);

			if(thisPotentialSeries.Owner !== undefined) {
				potentialSeriesList.push(thisPotentialSeries);
			}

			thisPerson.Money -= iterationCost;
		}

		let bestPotentialSeries = {
			PotentialYears: 0,
			Series: undefined
		};

		potentialSeriesList.forEach(series => {
			// console.log('checking', series);
			let thisPersonMoney = thisPerson.Money;
			let totalYears = 0;

			for(let i = 0; thisPersonMoney >= series.CostPerYear.Total; i++) {
				thisPersonMoney -= series.CostPerYear.Total;
				totalYears += 1;
			}

			if(bestPotentialSeries.Series !== undefined && totalYears > bestPotentialSeries.PotentialYears) bestPotentialSeries = { PotentialYears: totalYears, Series: series};
			else if(bestPotentialSeries.Series !== undefined && totalYears === bestPotentialSeries.PotentialYears) {
				if(series.Prestige > bestPotentialSeries.Series.Prestige) {
					bestPotentialSeries = { PotentialYears: totalYears, Series: series };
				}
			} else if(bestPotentialSeries.Series === undefined) bestPotentialSeries = { PotentialYears: totalYears, Series: series};
		});

		if(bestPotentialSeries.Series !== undefined && thisPerson.Money >= bestPotentialSeries.Series.Cost) {
			bestPotentialSeries.Series.Owner = thisPerson;
			thisPerson.Role.push(bestPotentialSeries.Series);
			thisPerson.Money -= bestPotentialSeries.Series.Cost;
			goalStatus = true;
			SeriesList.push(bestPotentialSeries.Series);
			console.log('SERIES BOUGHT');
		}

		// console.log('ASFSDFDG', potentialSeriesList, bestPotentialSeries);

		// console.log();
	}

	return { thisPerson, goalStatus };
}

// function shuffle (arr) {
// 	let j, x, index;
// 	for (index = arr.length - 1; index > 0; index--) {
// 		j = Math.floor(Math.random() * (index + 1));
// 		x = arr[index];
// 		arr[index] = arr[j];
// 		arr[j] = x;
// 	}
// 	return arr;
// }

init();

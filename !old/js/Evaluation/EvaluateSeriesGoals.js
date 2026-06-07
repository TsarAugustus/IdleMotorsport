import { Series } from '../Series/Series.js';
import { TrackList } from '../init.js';
import { SeriesList } from '../init.js';

export function EvaluateSeriesGoals(thisPerson) {
	let goalStatus = false;
	let iterationCost = 10000;
	let iterationLimit = 10;
	let currentIteration = 0;
	// let thisPersonMoney = thisPerson.Money;

	let potentialSeriesList = [];

	//'Planning' Stage
	while(thisPerson.Money > iterationCost) {
		if(currentIteration < iterationLimit) {
			let thisPotentialSeries = Series(TrackList, [thisPerson]);

			if(thisPotentialSeries.Owner !== undefined) {
				potentialSeriesList.push(thisPotentialSeries);
			}

			currentIteration++;
			thisPerson.Money -= iterationCost;
		} else break;
	}

	let bestPotentialSeries = {
		PotentialYears: 0,
		Series: undefined
	};

	//'Filter' Stage
	potentialSeriesList.forEach(series => {
		let seriesMoney = thisPerson.Money;
		let totalYears = seriesMoney / series.Cost;

		// while(seriesMoney >= series.Cost) {
		// 	seriesMoney -= series.Cost;
		// 	totalYears++;
		// }

		// console.log('TESTING', bestPotentialSeries, series, totalYears);
		
		if(bestPotentialSeries.Series === undefined) {
			bestPotentialSeries.Series = series;
			bestPotentialSeries.PotentialYears = totalYears;
		} 

		if(bestPotentialSeries.Series !== undefined && totalYears > bestPotentialSeries.PotentialYears) {
			bestPotentialSeries.Series = series;
			bestPotentialSeries.PotentialYears = totalYears;
		}

		if(bestPotentialSeries.Series !== undefined && totalYears === bestPotentialSeries.PotentialYears && series.Prestige > bestPotentialSeries.Series.Prestige) {
			bestPotentialSeries.Series = series;
			bestPotentialSeries.PotentialYears = totalYears;
		}

		// //Shameless copy/paste from the last function. 
		// // Should probably be rewritten
		// if(bestPotentialSeries.Series !== undefined && totalYears > bestPotentialSeries.PotentialYears) bestPotentialSeries = { PotentialYears: totalYears, Series: series};
		// else if(bestPotentialSeries.Series !== undefined && totalYears === bestPotentialSeries.PotentialYears) {
		// 	if(series.Prestige > bestPotentialSeries.Series.Prestige) {
		// 		bestPotentialSeries = { PotentialYears: totalYears, Series: series };
		// 	}
		// } else if(bestPotentialSeries.Series === undefined) bestPotentialSeries = { PotentialYears: totalYears, Series: series};

		const SeriesCheck = ((bestPotentialSeries.PotentialYears > 2) ? true : false); 


		if(SeriesCheck === true && bestPotentialSeries.Series !== undefined && thisPerson.Money >= bestPotentialSeries.Series.Cost) {
			bestPotentialSeries.Series.Owner = thisPerson;
			thisPerson.Role.push(bestPotentialSeries.Series);
			thisPerson.Money -= bestPotentialSeries.Series.Cost;
			goalStatus = true;
			SeriesList.push(bestPotentialSeries.Series);
		}
	});

	return { thisPerson, goalStatus };
}

// function OLDEvaluateSeriesGoals(thisPerson, goal) {
// 	// let goalStatus = false;
// 	// let iterationCost = 10000;
// 	// let iterationLimit = 10;

// 	//Create a series
// 	if(goal.ExecutionName === 'Series' && thisPerson.Money >= iterationCost) {
// 		// let potentialSeriesList = [];

// 		// for(let i = 0; (thisPerson.Money >= iterationCost && iterationLimit >= i); i++) {
// 		// 	let thisPotentialSeries = Series(TrackList, [thisPerson]);

// 		// 	if(thisPotentialSeries.Owner !== undefined) {
// 		// 		potentialSeriesList.push(thisPotentialSeries);
// 		// 	}

// 		// 	thisPerson.Money -= iterationCost;
// 		// }

// 		// let bestPotentialSeries = {
// 		// 	PotentialYears: 0,
// 		// 	Series: undefined
// 		// };

// 		potentialSeriesList.forEach(series => {
// 			// console.log('checking', series);
// 			// let thisPersonMoney = thisPerson.Money;
// 			// let totalYears = 0;

// 			// for(let i = 0; thisPersonMoney >= series.Cost; i++) {
// 			// 	thisPersonMoney -= series.Cost;
// 			// 	totalYears += 1;
// 			// }

// 			// while(thisPersonMoney >= series.Cost) {
// 			// 	thisPersonMoney -= series.Cost;
// 			// 	totalYears += 1;
// 			// }

// 			// if(bestPotentialSeries.Series !== undefined && totalYears > bestPotentialSeries.PotentialYears) bestPotentialSeries = { PotentialYears: totalYears, Series: series};
// 			// else if(bestPotentialSeries.Series !== undefined && totalYears === bestPotentialSeries.PotentialYears) {
// 			// 	if(series.Prestige > bestPotentialSeries.Series.Prestige) {
// 			// 		bestPotentialSeries = { PotentialYears: totalYears, Series: series };
// 			// 	}
// 			// } else if(bestPotentialSeries.Series === undefined) bestPotentialSeries = { PotentialYears: totalYears, Series: series};
// 		});

// 		// if(bestPotentialSeries.PotentialYears < 3) bestPotentialSeries.Series = undefined; 
// 		// const SeriesCheck = ((bestPotentialSeries.PotentialYears < 10) ? true : false); 

// 		// if(SeriesCheck === true && bestPotentialSeries.Series !== undefined && thisPerson.Money >= bestPotentialSeries.Series.Cost) {
// 		// 	bestPotentialSeries.Series.Owner = thisPerson;
// 		// 	thisPerson.Role.push(bestPotentialSeries.Series);
// 		// 	thisPerson.Money -= bestPotentialSeries.Series.Cost;
// 		// 	goalStatus = true;
// 		// 	SeriesList.push(bestPotentialSeries.Series);
// 		// 	// console.log('SERIES BOUGHT');
// 		// }

// 		// console.log('ASFSDFDG', potentialSeriesList, bestPotentialSeries);

// 		// console.log();
// 	}

// 	return { thisPerson, goalStatus };
// }

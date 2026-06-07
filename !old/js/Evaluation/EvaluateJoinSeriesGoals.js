import { SeriesList, VehicleList } from '../init.js';

export function EvaluateJoinSeriesGoals(thisPerson, goal) {
	let goalStatus = false;

	// let potentialJoinSeriesList = [];
	let bestPotentialSeries = undefined;

	const SeriesListByAvailability = SeriesList.filter(series => series.Drivers.length < (series.Rules.teamLimit * series.Rules.vehiclesPerTeam));
	const SeriesListByMoney = SeriesListByAvailability.filter(series => thisPerson.Money >= series.CostToJoin);
	const SeriesListByPrestige = SeriesListByMoney.filter(series => thisPerson.Attributes.Prestige > series.Prestige);

	let FilteredSeriesList = undefined;

	if(SeriesListByPrestige.length === 0) {
		//Picky

		FilteredSeriesList = SeriesListByMoney;
	} else {
		FilteredSeriesList = SeriesListByPrestige;
	}

	
	if(FilteredSeriesList.length > 0) {
		const PreferredSeries = FilteredSeriesList.filter(series => series.Rules.style === thisPerson.Preferences.TrackType.Style && series.Rules.type === thisPerson.Preferences.TrackType.Type);

		if(PreferredSeries.length > 0) {
			bestPotentialSeries = PreferredSeries.sort((a, b) => b.Prestige - a.Prestige)[0];
		} else {
			bestPotentialSeries = FilteredSeriesList.sort((a, b) => b.Prestige - a.Prestige)[0];
		}

	}

	if(bestPotentialSeries !== undefined) {
		if(bestPotentialSeries.Teams.length === 0) {
			const AttemptedEntry = AttemptPrivateerEntry(thisPerson, goalStatus, bestPotentialSeries);

			thisPerson = AttemptedEntry.thisPerson;
			goalStatus = AttemptedEntry.goalStatus;
			bestPotentialSeries = AttemptedEntry.bestPotentialSeries;
		}
	}

	return { thisPerson, goalStatus, bestPotentialSeries };
}

function AttemptPrivateerEntry(thisPerson, goalStatus, bestPotentialSeries) {
	const VehicleListByStock = VehicleList.filter(vehicle => vehicle.Stock > 0);
	const VehicleListByPrice = VehicleListByStock.filter(vehicle => thisPerson.Money >= (vehicle.Cost + bestPotentialSeries.CostToJoin)); 
	const VehicleListByRating = VehicleListByPrice.sort((a, b) => b.Rating - a.Rating);

	let BestPotentialVehicle = VehicleListByRating[0];

	if(BestPotentialVehicle !== undefined) {
		goalStatus = true;
		BestPotentialVehicle.Owner.Money += BestPotentialVehicle.Cost;
		BestPotentialVehicle.Customers.push(thisPerson);
		BestPotentialVehicle.Stock--;
		thisPerson.Money -= BestPotentialVehicle.Cost;
		bestPotentialSeries.Drivers.push(thisPerson);
		thisPerson.Driver.Series.push({Series: bestPotentialSeries, Vehicle: BestPotentialVehicle });
	}

	return { thisPerson, goalStatus, bestPotentialSeries };
}

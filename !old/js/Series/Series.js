import { NewOwner } from '../NewOwner/NewOwner.js';
import { trackTypes } from '../data/trackTypes.js';
import { Months } from '../data/Months.js';

export function Series(Tracks, People) {
	let seriesRules = createSeriesRules();
	
	let thisSeries = {
		Owner: Object,
		Tracks: [],
		Style: seriesRules.style,
		Rules: seriesRules,
		Cost: Number,
		CostPerYear: {
			Total: 10000
		},
		Prestige: 0,
		Type: 'Series',
		CostToJoin: 0,
		Sponsors: [],
		Teams: [],
		Drivers: [],
		Results: []
	};
	
	thisSeries = determineSeriesTracks(Tracks, seriesRules, thisSeries);
	
	let trackCost = 0;
	
	thisSeries.Tracks.forEach(track => {
		thisSeries.Prestige += track.track.Prestige / thisSeries.Rules.trackGrade;
		trackCost += track.track.Cost;
	});

	thisSeries.Prestige = thisSeries.Prestige * (thisSeries.Rules.teamLimit * thisSeries.Rules.vehiclesPerTeam);

	// thisSeries.Cost = trackCost + thisSeries.Prestige + ((thisSeries.Rules.teamLimit * thisSeries.Rules.vehiclesPerTeam) * 100);
	thisSeries.Cost = trackCost + thisSeries.Prestige;

	let seriesPreferredAttributes = [
		'Prestige',
		'Management'
	];

	thisSeries.Owner = NewOwner(seriesPreferredAttributes, People, thisSeries);
	if(thisSeries.Tracks.length === 0) thisSeries.Owner = undefined; 

	thisSeries.CostToJoin = Math.ceil((thisSeries.Cost / (thisSeries.Rules.teamLimit * thisSeries.Rules.vehiclesPerTeam)) + thisSeries.Prestige / 2);

	return thisSeries;
}

function determineSeriesTracks(Tracks, seriesRules, thisSeries) {
	const totalSeriesTracks = seriesRules.championshipTracks + seriesRules.nonChampionshipTracks;

	const maximumSeriesVehicles = seriesRules.teamLimit * seriesRules.vehiclesPerTeam;

	Tracks.forEach(track => {
		let allowableTrackConfigurations = track.configurations.filter(configuration => configuration.maximumVehicleLimit >= maximumSeriesVehicles);
		allowableTrackConfigurations.forEach(configuration => {
			const configurationGradeEvaluation = configuration.grade === seriesRules.trackGrade;
			const configurationStyleEvaluation = thisSeries.Style === configuration.style;
			const seriesTrackListLimitEvaluation = thisSeries.Tracks.length < totalSeriesTracks;

			const seriesChampionshipTracks = thisSeries.Tracks.filter(track => track.championship === true).length;
			const seriesNonChampionshipTrack = thisSeries.Tracks.filter(track => track.championship === false).length;

			const randomTrueFalseValue = Math.random() < 0.5;

			if(configurationGradeEvaluation && configurationStyleEvaluation && seriesTrackListLimitEvaluation) {
				let thisSeriesTrack = {
					track: track,
					configuration: configuration,
					championship: undefined,
					date: {
						month: undefined,
						day: undefined,
						dateObj: undefined,
					}
				};

				const trackMonth = Months[Math.floor(Math.random() * Months.length)];
				thisSeriesTrack.date.month = trackMonth.Name;
				thisSeriesTrack.date.day = Math.floor(Math.random() * trackMonth.Days);
				thisSeriesTrack.date.dateObj = new Date(0, Months.findIndex(month => month.Name === trackMonth.Name), thisSeriesTrack.date.day);

				thisSeriesTrack.championship = randomTrueFalseValue;
				
				if(seriesRules.championshipTracks > seriesChampionshipTracks) {
					thisSeriesTrack.championship = true;
				}
				if (seriesRules.nonChampionshipTracks > seriesNonChampionshipTrack) {
					thisSeriesTrack.championship = false;
				}

				thisSeries.Tracks.push(thisSeriesTrack);
			}
		});
	});

	thisSeries.Tracks = thisSeries.Tracks.sort((a, b) => {
		return a.date.dateObj - b.date.dateObj;
	});

	return thisSeries;
}

function randomNumber(min, max) {	
	return Math.floor(Math.random() * (max - min) + min);
}

// Obselete, originalyl used to shuffle the tracks into a random order.
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

function createSeriesRules() {
	let rules = {
		style: Object,
		type: Object,
		ovals: Boolean,
		teamLimit: Number,
		vehiclesPerTeam: Number,
		trackGrade: Number,
		championshipTracks: Number,
		nonChampionshipTracks: Number
	};
	let whileBool = false;
	while(whileBool === false) {
		const thisType = seriesType();
		if(thisType.style === 'Circuit') {
			whileBool = true;
			rules.style = thisType.style;
			rules.type = thisType.type.name;
		}
	}

	rules.ovals = false;
	rules.teamLimit = randomNumber(1, 50);
	rules.vehiclesPerTeam = randomNumber(1, 5);
	rules.trackGrade = randomNumber(1, 5);
	rules.championshipTracks = randomNumber(1, 30);
	rules.nonChampionshipTracks = randomNumber(0, 6);

	return rules;
}

function seriesType() {
	const thisType = trackTypes[Math.floor(Math.random() * trackTypes.length)];

	return {
		style: thisType.style,
		type: thisType.type[Math.floor(Math.random() * thisType.type.length)]
	};

	//RALLY RAID

	// Off Road:
	// Lawn Mower Racing?
	// Auto Grass?

	// Drag Racing

	// Hill Climbs
	// Time Trials
	// Sprints
	// Rally Sprint

	// Autocross

	// Motorcycle??
}

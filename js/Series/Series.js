import { NewOwner } from '../NewOwner/NewOwner.js';
import { trackTypes } from '../data/trackTypes.js';

export function Series(Tracks, People) {
	let seriesRules = createSeriesRules();
	
	let thisSeries = {
		Owner: Object,
		Tracks: [],
		style: seriesRules.style,
		rules: seriesRules,
		Cost: Number,
		Prestige: 0,
		Type: 'Series'
	};
	
	thisSeries = determineSeriesTracks(Tracks, seriesRules, thisSeries);
	
	let trackCost = 0;
	
	thisSeries.Tracks.forEach(track => {

		thisSeries.Prestige += track.track.Prestige;
		trackCost += track.track.Cost;
	});

	thisSeries.Cost = trackCost + thisSeries.Prestige;

	let seriesPreferredAttributes = [
		'Prestige',
		'Management'
	];

	thisSeries.Owner = NewOwner(seriesPreferredAttributes, People, thisSeries);

	

	return thisSeries;
}

function determineSeriesTracks(Tracks, seriesRules, thisSeries) {
	const totalSeriesTracks = seriesRules.championshipTracks + seriesRules.nonChampionshipTracks;
	
	Tracks.forEach(track => {
		track.configurations.forEach(configuration => {
			const configurationGradeEvaluation = configuration.grade === seriesRules.trackGrade;
			const configurationStyleEvaluation = thisSeries.style === configuration.style;
			const seriesTrackListLimitEvaluation = thisSeries.Tracks.length < totalSeriesTracks;

			const seriesChampionshipTracks = thisSeries.Tracks.filter(track => track.championship === true).length;
			const seriesNonChampionshipTrack = thisSeries.Tracks.filter(track => track.championship === false).length;

			const randomTrueFalseValue = Math.random() < 0.5;

			if(configurationGradeEvaluation && configurationStyleEvaluation && seriesTrackListLimitEvaluation) {
				let thisSeriesTrack = {
					track: track,
					configuration: configuration,
					championship: undefined
				};
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

	thisSeries.Tracks = shuffle(thisSeries.Tracks);

	return thisSeries;
}

function randomNumber(min, max) {	
	return Math.floor(Math.random() * (max - min) + min);
}


function shuffle (arr) {
	let j, x, index;
	for (index = arr.length - 1; index > 0; index--) {
		j = Math.floor(Math.random() * (index + 1));
		x = arr[index];
		arr[index] = arr[j];
		arr[j] = x;
	}
	return arr;
}

function createSeriesRules() {
	let rules = {
		style: seriesType().style,
		ovals: Boolean,
		teamLimit: Number,
		vehiclesPerTeam: Number,
		trackGrade: Number,
		championshipTracks: Number,
		nonChampionshipTracks: Number
	};

	rules.ovals = false;
	rules.teamLimit = 10;
	rules.vehiclesPerTeam = 2;
	rules.trackGrade = 1;
	rules.championshipTracks = randomNumber(1, 30);
	rules.nonChampionshipTracks = 0;

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

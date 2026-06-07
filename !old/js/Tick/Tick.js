import { Calendar } from '../Calendar/Calendar.js';
import { Months } from '../data/Months.js';
import { EvaluatePerson } from '../Evaluation/EvaluatePerson.js';
import { PersonList, SeriesList } from '../init.js';

let CurrentYear = 0;
let CurrentMonth = 'January';
let CurrentDay = 0;

let pause = true;

let tickID;

let TickDateSpan = document.getElementById('TickDate');
let TickSpeedButton = document.getElementById('TickSpeedButton');
let TickSpeed = 1000;

let CalendarNumber = 0;

function PauseGame(bool) {
	if(bool === true) {
		pause = true;
		clearInterval(tickID);
		TickSpeedButton.disabled = false;
	} else {
		pause = false;
		tickID = setInterval(Tick, TickSpeed);
		TickSpeedButton.disabled = true;
	}
}

export function Tick() {
	const thisMonth = Months.find(month => month.Name === CurrentMonth);

	// if(CurrentMonth === 'March') {
	// 	console.log(Calendar, CalendarNumber, Calendar[CalendarNumber]);
	// }

	

	let CalendarItemsOnSameDay = Calendar.filter(track => (track.Track.date.month === CurrentMonth && track.Track.date.day === CurrentDay));
	
	if(CalendarItemsOnSameDay.length > 0) {
		PauseGame(true);
		CalendarItemsOnSameDay.forEach(item => {
			SimulateRace(item.Series, item.Track);
		});

		PauseGame(false);
	}

	if(CurrentMonth === 'January' && CurrentDay === 0 && CurrentYear !== 0) {
		PauseGame(true);

		console.log(SeriesList.filter(series => series.Drivers.length > 0).sort((a, b) => b.Tracks.length - a.Tracks.length));
	}
	
	if(pause !== true) {
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
		

		

		// let thisSeries = SeriesList.filter(series => series.Drivers.length > 0).sort((a, b) => b.Drivers.length - a.Drivers.length)[0];

		// if(thisSeries.Tracks[0].date.month === CurrentMonth && thisSeries.Tracks[0].date.day === CurrentDay) {
		// 	pause = true;
		// 	clearInterval(tickID);
		// 	TickSpeedButton.disabled = false;
			
		// 	SimulateRace(thisSeries, thisSeries.Tracks[0]);
		// }
	}	
	TickDateSpan.innerHTML = `${CurrentDay} of ${CurrentMonth}, ${CurrentYear}`;
	console.log(`${CurrentDay} of ${CurrentMonth}, ${CurrentYear}`);
}

function SimulateRace(thisSeries, track) {
	// console.log(Calendar.length, CalendarNumber);

	// console.log(thisSeries);
	// console.log('SIMULATING');
	// track.configuration
	let result = [];
	thisSeries.Drivers.forEach(driver => {
		let driverResult = 0;
		for(let i = 0; i < track.configuration.length; i++) {
			Object.keys(driver.Attributes).filter((attr, index) => {
				if(attr !== 'Prestige' && attr !== 'Charisma' && attr !== 'Management') {
					driverResult += Object.values(driver.Attributes)[index];
					driverResult += Math.floor(Math.random() * 100);
				}
			});
		}
		
		result.push({Driver: driver, Result: driverResult});
	});

	
	if(!thisSeries.Results.find(seriesResult => seriesResult.Year === CurrentYear)) thisSeries.Results.push({Year: CurrentYear, Results: [], DriverChampionship: []});
	
	let thisSeriesYear = thisSeries.Results.find(seriesResult => seriesResult.Year === CurrentYear);

	const SortedResult = result.sort((a, b) => b.Result - a.Result);

	SortedResult.forEach((thisResult, index) => {

		
		let finalResult = {
			Placement: index,
			Result: thisResult,
			Track: track,
			Series: thisSeries
		};
		
		let PersonInList = PersonList.find(person => (person.Name.First === thisResult.Driver.Name.First && person.Name.Last === thisResult.Driver.Name.Last));
		let DuplicateCheck = PersonInList.Statistics.Races.find(raceResult => (raceResult.Track === track && raceResult.Track === track));
		
		// console.log('DUPLICATE', DuplicateCheck);
		if(DuplicateCheck === undefined)  {
			PersonList.find(person => {
				if(person.Name.First === thisResult.Driver.Name.First && person.Name.Last === thisResult.Driver.Name.Last) {
					person.Statistics.Races.push(finalResult);
				}
			});
		}
		
		// if(DuplicateCheck === undefined) PersonInList.Statistics.Races.push(finalResult);

		if(index === 0) {
			PersonList.find(person => {
				if(person.Name.First === thisResult.Driver.Name.First && person.Name.Last === thisResult.Driver.Name.Last) {
					person.Statistics.Wins.push(finalResult);
					person.Statistics.Podiums.push(finalResult);
				}
			});
			// PersonInList.Statistics.Wins.push(finalResult);
			// PersonInList.Statistics.Podiums.push(finalResult);
		} else if (index === 1 || index === 2) {
			PersonList.find(person => {
				if(person.Name.First === thisResult.Driver.Name.First && person.Name.Last === thisResult.Driver.Name.Last) {
					person.Statistics.Podiums.push(finalResult);
				}
			});
			// PersonInList.Statistics.Podiums.push(finalResult);
		}
		
	});

	thisSeriesYear.Results.push({ Track: track, Results: SortedResult });
	// console.log(thisSeriesYear);
	
	const lastTrackInSeries = thisSeries.Tracks[thisSeries.Tracks.length - 1];
	if(track.track.name === lastTrackInSeries.track.name && track.configuration.name === lastTrackInSeries.configuration.name) {
		// console.log('EVALUATING FINAL STANDINGS');
		EvaluateSeriesSeason(thisSeries, CurrentYear);
	}
	CalendarNumber++;
	// if(Calendar[CalendarNumber] !== undefined) SimulateRace(Calendar[CalendarNumber].Series, Calendar[CalendarNumber].Track);
	// else {
	// 	console.log(SeriesList.filter(series => series.Drivers.length > 2).sort((a, b) => b.Tracks.length - a.Tracks.length));
	// 	console.log('People', PersonList);
	// }

	if(Calendar[CalendarNumber] !== undefined && Calendar[CalendarNumber].Track.date.month == CurrentMonth && Calendar[CalendarNumber].Track.date.day === CurrentDay) {
		// SimulateRace(Calendar[CalendarNumber].Series, Calendar[CalendarNumber].Track);
	}
	// Tick();
}



function EvaluateSeriesSeason(seriesToEvaluate, Year) {
	// console.log('EVALUATING SEASON');

	let SeriesYear = seriesToEvaluate.Results.find(result => result.Year === Year);

	let SeriesFinalResult = [];

	SeriesYear.Results.forEach(result => {
		result.Results.forEach(trackResult => {
			if(!SeriesFinalResult.find(person => person.Driver.Name.First === trackResult.Driver.Name.First && person.Driver.Name.Last === trackResult.Driver.Name.Last)) {
				SeriesFinalResult.push({Driver: trackResult.Driver, Result: 0});
			}

			let FinalResultDriver = SeriesFinalResult.find(person => person.Driver.Name.First === trackResult.Driver.Name.First && person.Driver.Name.Last === trackResult.Driver.Name.Last);

			FinalResultDriver.Result += trackResult.Result;
		});
	});

	SeriesFinalResult = SeriesFinalResult.sort((a, b) => b.Result - a.Result);

	SeriesYear.DriverChampionship = SeriesFinalResult;
	if(SeriesFinalResult.length > 0) {
		// console.log('HERE', SeriesFinalResult);
		let SeriesChampion = PersonList.find(person => person.Name.First === SeriesFinalResult[0].Driver.Name.First && person.Name.Last === SeriesFinalResult[0].Driver.Name.Last);
		// console.log('WE ARE THE CHAMPION', SeriesChampion, SeriesFinalResult);
		// let finalResult = {
		// 	Placement: index,
		// 	Result: thisResult,
		// 	Track: track,
		// 	Series: thisSeries
		// };
		SeriesChampion.Statistics.Championships.push({Series: seriesToEvaluate, Result: SeriesFinalResult[0]});
	}
	// return thisSeries;
}

function NewYear() {
	CurrentMonth = Months.find(month => month.Number === 0).Name;
	CurrentYear++;
	console.log('NEW YEAR', SeriesList.filter(series => series.Drivers.length > 2).sort((a, b) => b.Tracks.length - a.Tracks.length));

	PersonList.forEach(thisPerson => thisPerson = EvaluatePerson(thisPerson));
}

TickSpeedButton.addEventListener('click', () => {
	let TickSpeedValue = Number(TickSpeedButton.innerHTML);
	let NewTickSpeedValue = TickSpeedValue / 2;

	TickSpeedButton.innerHTML = NewTickSpeedValue;
	TickSpeed = NewTickSpeedValue;
});

const PlayPauseButton = document.getElementById('Play-Pause');
PlayPauseButton.addEventListener('click', () => {
	pause = !pause;
	if(pause === true) {
		clearInterval(tickID);
		TickSpeedButton.disabled = false;
	} 

	if(pause === false) {
		// tickID();
		tickID = setInterval(Tick, TickSpeed);
		TickSpeedButton.disabled = true;
	}
});

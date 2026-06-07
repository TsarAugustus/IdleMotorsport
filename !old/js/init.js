/* eslint-disable no-unused-vars */
// import { Vehicle } from './Vehicle/Vehicle.js';
// import { Circuit } from './Circuit/Circuit.js';
import { Person } from './Person/Person.js';
import { EvaluatePerson } from './Evaluation/EvaluatePerson.js';
import { Tick } from './Tick/Tick.js';
import { Engine } from './Vehicle/Engine/Engine.js';
// import { writeToHTML } from './HTML/writeToHTML.js';
// import { Structure } from './data/Structure/Structure.js';
import { CreateCalendar } from './Calendar/Calendar.js';

//HTML Related
import { VehicleNavigationFunction } from './HTML/VehicleNavigationFunction.js';
import { SeriesNavigationFunction } from './HTML/SeriesNavigationFunction.js';


export let SeriesList = [];
export let PersonList = [];
export let TrackList = [];
export let VehicleList = [];
// export let Calendar = [];

function init() {
	
	for(let i = 0; i < 100; i++) PersonList.push(Person(true, PersonList));

	PersonList.forEach(person => {
		EvaluatePerson(person);
	});

	// <span>Vehicles</span>
	// <span>Series</span>
	// <span>People</span>
	// <span>Tracks</span>

	//Initialize Navigation
	let NavigationElement = document.querySelector('nav');

	const NavigationList = [
		'Vehicles',
		'Series',
		'People',
		'Tracks'
	];

	console.log(SeriesList);

	NavigationList.forEach(item => {
		let itemElement = document.createElement('span');
		itemElement.innerHTML = item;
		NavigationElement.appendChild(itemElement);
		itemElement.addEventListener('click', () => {
			let NavigationContent = document.getElementById('NavigationContent');
			NavigationContent.innerHTML = '';
		
			if(item === 'Vehicles') {
				VehicleNavigationFunction(NavigationContent);
			}
			if(item === 'Series') {
				SeriesNavigationFunction(NavigationContent);
			}
		});
	});

	CreateCalendar();

	Tick();
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

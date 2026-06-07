import { SeriesList } from '../init.js';

export function SeriesNavigationFunction(NavigationContent) {
	let SeriesDisplayElement = document.createElement('div');
	SeriesDisplayElement.id = 'SeriesDisplayElement';

	let Header = document.createElement('h1');
	Header.innerHTML = 'Series';


	SeriesDisplayElement.appendChild(Header);

	// let x = SeriesList;
	// x.length = 1;
	// let thisSeries = x;

	console.log(SeriesList[0]);

	SeriesList.forEach((Series, SeriesIndex) => {
		let NewSeriesDiv = document.createElement('div');
		NewSeriesDiv.classList.add('SeriesElement');
		NewSeriesDiv.id = SeriesIndex;

		let SubHeader = document.createElement('h2');
		SubHeader.innerHTML = `Series ${SeriesIndex}`;

		NewSeriesDiv.appendChild(SubHeader);

		Object.keys(Series).forEach((SeriesKey, index) => {
			let SeriesInformation = document.createElement('div');
			SeriesInformation.classList.add(`${SeriesKey}Information`);

			let SeriesInformationSpanHeader = document.createElement('span');
			SeriesInformationSpanHeader.classList.add('SeriesInformationSpanHeader');
			SeriesInformationSpanHeader.innerHTML = `</br> </br> ${SeriesKey} </br> </br>`;
			
			SeriesInformation.appendChild(SeriesInformationSpanHeader);

			// Owner: Object,
			// Tracks: [],
			// Style: seriesRules.style,
			// Rules: seriesRules,
			// Cost: Number,
			// CostPerYear: {
			// 	Total: 10000
			// },
			// Prestige: 0,
			// Type: 'Series',
			// CostToJoin: 0,
			// Sponsors: [],
			// Teams: [],
			// Drivers: [],
			// Results: []

			if(SeriesKey === 'Owner') {
				let SeriesInformationSpan = document.createElement('span');

				//Left to Add
				// Attributes
				// Driver
				// MentalHealth
				// Preferences
				// Role
				// Statistics
				// Traits
				
				
				let OwnerValues = Object.values(Series)[index];
				
				let Nickname = '';
				if(OwnerValues.Name.Nickname === 'function') Nickname = '';
				else if(OwnerValues.Name.Nickname === 'string') Nickname = OwnerValues.Name.Nickname;

				let Goals = '';
				OwnerValues.Goals.forEach(goal => Goals += goal);
				
				SeriesInformationSpan.innerHTML = `
				Name: ${OwnerValues.Name.First} '${Nickname}' ${OwnerValues.Name.Last} </br>
				Age: ${OwnerValues.Age} </br>
				Sex: ${OwnerValues.Sex} </br>
				Money: ${OwnerValues.Money} </br>
				Goals: ${Goals}
				`;

				SeriesInformation.appendChild(SeriesInformationSpan);
				NewSeriesDiv.appendChild(SeriesInformation);
			}

			// if(SeriesKey === 'Owner') {
			// 	let SeriesInformationSpan = document.createElement('span');
			// 	SeriesInformationSpan.innerHTML = '';

			// 	Object.keys(Object.values(Series)[index]).forEach((SeriesValues, index2) => {
			// 		// console.log(typeof Object.values(Object.values(Series)[index])[index2]);
			// 		// let subInformation = Object.values(Object.values(Series)[index])[index2];
			// 		let subInformation = '';
			// 		if(typeof Object.values(Object.values(Series)[index])[index2] === Object) {
			// 			console.log('here', Object.values(Object.values(Object.values(Series)[index])[index2]));
			// 			SeriesInformationSpan.innerHTML += `${SeriesValues}: ${subInformation} </br>`;
			// 		}
			// 		// if(subInformation.name) SeriesInformationSpan.innerHTML += `${SeriesValues}: ${subInformation.name} </br>`;
			// 		// else SeriesInformationSpan.innerHTML += `${SeriesValues}: ${subInformation} </br>`;
			// 	});
			// 	SeriesInformation.appendChild(SeriesInformationSpan);
			// 	NewSeriesDiv.appendChild(SeriesInformation);
			// }

			NewSeriesDiv.appendChild(SeriesInformation);
		});

		SeriesDisplayElement.appendChild(NewSeriesDiv);
	});

	NavigationContent.appendChild(SeriesDisplayElement);
}

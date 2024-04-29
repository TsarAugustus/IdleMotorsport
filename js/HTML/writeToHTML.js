// import { writeItemDescription } from './writeItemDescription.js';

export function writeToHTML(itemToWrite, itemType, itemIteration) {
	// console.log(Object.keys(itemToWrite()).length);
	// console.log(itemToWrite());

	if(itemType === 'Vehicle') {
		writeVehicle(itemToWrite, itemIteration);
	}

	if(itemType === 'Series') {
		writeSeries(itemToWrite, itemIteration);
	}

	if(itemType === 'Person') {
		writePerson(itemToWrite, itemIteration);
	}

	// let gameDiv = document.getElementById('game');

}

function writePerson(itemToWrite, itemIteration) {
	let gameDiv = document.getElementById('game');

	for(let i = 0; i < itemIteration; i++) {
		const thisItemToWrite = itemToWrite();

		console.log(thisItemToWrite);

		let mainDiv = document.createElement('div');
		mainDiv.id = `Person${i}`;
		mainDiv.classList.add('personDiv');

		let nameSpan = document.createElement('span');
		nameSpan.innerHTML = `Name: ${thisItemToWrite.Name.First} ${thisItemToWrite.Name.Last}`;
		mainDiv.appendChild(nameSpan);

		let sexSpan = document.createElement('span');
		sexSpan.innerHTML = `Sex: ${thisItemToWrite.Sex}`;
		mainDiv.appendChild(sexSpan);

		gameDiv.appendChild(mainDiv);
	}
}

function writeSeries(itemToWrite, itemIteration) {
	let gameDiv = document.getElementById('game');

	for(let i = 0; i < itemIteration; i++) {
		const thisItemToWrite = itemToWrite();

		console.log(thisItemToWrite);

		let mainDiv = document.createElement('div');
		mainDiv.id = `SeriesDiv${i}`;
		mainDiv.classList.add('seriesDiv');

		for(let ii = 0; ii < Object.keys(thisItemToWrite).length; ii++) {
			let thisItemToWriteKey = Object.keys(thisItemToWrite)[ii];
			let thisItemToWriteValue = Object.values(thisItemToWrite)[ii];

			let newDiv = document.createElement('div');
			newDiv.id = `${thisItemToWriteKey}Div${i}`;
			newDiv.style['border'] = '1px solid black';

			let header = document.createElement('h3');
			header.innerHTML = `${thisItemToWriteKey}`;
			newDiv.appendChild(header);

			console.log(thisItemToWriteKey, thisItemToWriteValue);

			if(thisItemToWriteKey === 'owner') {
				let newSpan = document.createElement('span');
				newSpan.innerHTML = `Owner: ${thisItemToWriteValue.name}`;
				newDiv.appendChild(newSpan);
			}

			if(thisItemToWriteKey === 'tracks') {
				for(let iii = 0; iii < thisItemToWriteValue.length; iii++) {
					let newSpanTrack = document.createElement('span');
					const newItem = thisItemToWriteValue[iii];
					newSpanTrack.innerHTML = 	`Track Owner: ${newItem.track.owner}
												Track Name: ${newItem.name}
												Track Configuration: ${newItem.configuration}`;

					for(let iv = 0; iv < newItem.configurations.length; iv++) {
						newSpanTrack.innerHTML += 	`Configuration ${iv}: 
														Name: ${newItem.configurations[iv].name}
														Grade: ${newItem.configuration[iv].grade}
														Stage #'s: ${newItem.configurations[iv].stages}`;
					}
					console.log(thisItemToWriteValue[iii]);



					// newSpan.innerHTML = `${}`
				}
			}

			mainDiv.appendChild(newDiv);
		}

		gameDiv.appendChild(mainDiv);
	}
}

function writeVehicle(itemToWrite, itemIteration) {
	let gameDiv = document.getElementById('game');

	for(let i = 0; i < itemIteration; i++) {
		const thisItemToWrite = itemToWrite();
		
		let mainDiv = document.createElement('div');
		mainDiv.id = `VehicleDiv${i}`;
		mainDiv.classList.add('vehicleDiv');

		for(let ii = 0; ii < Object.keys(thisItemToWrite).length; ii++) {
			let thisItemToWriteKey = Object.keys(thisItemToWrite)[ii];
			let thisItemToWriteValue = Object.values(thisItemToWrite)[ii];

			let newDiv = document.createElement('div');
			newDiv.id = `${thisItemToWriteKey}Div${i}`;
			newDiv.style['border'] = '1px solid black';

			let header = document.createElement('h3');
			header.innerHTML = `${thisItemToWriteKey}`;
			newDiv.appendChild(header);
			
			if(thisItemToWriteKey !== 'Sponsor') {
				for(let iii = 0; iii < Object.values(thisItemToWriteValue).length; iii++) {
					let newItemKey = Object.keys(thisItemToWriteValue)[iii];
					let newItemValue = Object.values(thisItemToWriteValue)[iii];
	
					let newSpan = document.createElement('div');
					newSpan.innerHTML = (newItemValue.name) ? `${newItemKey}: ${newItemValue.name} ${newItemValue.structure.abbreviation}.` : `${newItemKey}: ${newItemValue}`;
					newDiv.appendChild(newSpan);
				}
			} else {
				let titleSponsorDiv = document.createElement('div');
				titleSponsorDiv.innerHTML = thisItemToWriteValue;

				newDiv.appendChild(titleSponsorDiv);
			}

			// console.log(Object.values(thisItemToWriteValue).length);

			// console.log(thisItemToWriteKey, thisItemToWriteValue);

			mainDiv.appendChild(newDiv);
		}

		// let newDiv = document.createElement('div');
		// newDiv.id = `${itemType}Div${i}`;

		// if(itemType === 'Engine') {
		// 	const thisItemToWrite = itemToWrite();

		// 	for(let ii = 0; ii < Object.keys(thisItemToWrite).length; ii++) {
		// 		let subDiv = document.createElement('div');
		// 		const subDivKey = Object.keys(thisItemToWrite)[ii];
		// 		const subDivValue = Object.values(thisItemToWrite)[ii];
		// 		subDiv.id = `subDiv${ii}`;
		// 		subDiv.innerHTML = `${subDivKey}: ${(subDivValue.name) ? subDivValue.name : subDivValue}`;

		// 		newDiv.appendChild(subDiv);
		// 	}

		// 	newDiv.appendChild(writeItemDescription(thisItemToWrite, itemType));

		// 	newDiv.style['border'] = '1px solid black';
		// }

		gameDiv.appendChild(mainDiv);
		

		// itemDiv.appendChild(newDiv);
	}
}

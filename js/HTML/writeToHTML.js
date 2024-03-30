import { writeItemDescription } from './writeItemDescription.js';

export function writeToHTML(itemToWrite, itemType, itemIteration) {
	// console.log(Object.keys(itemToWrite()).length);
	// console.log(itemToWrite());

	
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

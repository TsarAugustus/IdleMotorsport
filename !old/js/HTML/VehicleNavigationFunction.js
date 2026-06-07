import { VehicleList } from '../init.js';

export function VehicleNavigationFunction(NavigationContent) {
	let VehicleDisplayElement = document.createElement('div');
	VehicleDisplayElement.id = 'VehicleDisplayElement';

	let Header = document.createElement('h1');
	Header.innerHTML = 'Vehicles';

	VehicleDisplayElement.appendChild(Header);

	VehicleList.forEach((Vehicle, VehicleIndex) => {
		let NewVehicleDiv = document.createElement('div');
		NewVehicleDiv.classList.add('VehicleElement');
		NewVehicleDiv.id = VehicleIndex;

		let SubHeader = document.createElement('h2');
		SubHeader.innerHTML = `Vehicle ${VehicleIndex}`;
		
		NewVehicleDiv.appendChild(SubHeader);

		Object.keys(Vehicle).forEach((VehicleKey, index) => {
			let VehicleInformation = document.createElement('div');
			VehicleInformation.classList.add(`${VehicleKey}Information`);

			let VehicleInformationSpanHeader = document.createElement('span');
			VehicleInformationSpanHeader.classList.add('VehicleInformationSpanHeader');
			VehicleInformationSpanHeader.innerHTML = `</br> </br> ${VehicleKey} </br> </br>`;
			
			VehicleInformation.appendChild(VehicleInformationSpanHeader);
			
			if(VehicleKey === 'Engine') {

				let VehicleInformationSpan = document.createElement('span');
				VehicleInformationSpan.innerHTML = '';
				// console.log(typeof Object.keys(Object.values(x)[index]));
				Object.keys(Object.values(Vehicle)[index]).forEach((VehicleValues, index2) => {
					let subInformation = Object.values(Object.values(Vehicle)[index])[index2];
					if(subInformation.name) VehicleInformationSpan.innerHTML += `${VehicleValues}: ${subInformation.name} </br>`;
					else VehicleInformationSpan.innerHTML += `${VehicleValues}: ${subInformation} </br>`;
					// console.log(VehicleValues, Object.values(Object.values(x)[index]));
				});
				VehicleInformation.appendChild(VehicleInformationSpan);
				NewVehicleDiv.appendChild(VehicleInformation);
				// console.log(VehicleKey, Object.values(x)[index]);
			}
	
			if(VehicleKey === 'Tire') {
				let VehicleInformationSpan = document.createElement('span');
				VehicleInformationSpan.innerHTML = '';
				Object.keys(Object.values(Vehicle)[index]).forEach((VehicleValues, index2) => {
					let subInformation = Object.values(Object.values(Vehicle)[index])[index2];
					if(subInformation.name) VehicleInformationSpan.innerHTML += `${VehicleValues}: ${subInformation.name} </br>`;
					else VehicleInformationSpan.innerHTML += `${VehicleValues}: ${subInformation} </br>`;
				});
				VehicleInformation.appendChild(VehicleInformationSpan);
				NewVehicleDiv.appendChild(VehicleInformation);
			}
			
		});

		let FooterInformation = document.createElement('span');
		FooterInformation.innerHTML = `</br> <br/> Cost: ${Vehicle.Cost}, Rating: ${Vehicle.Rating}, Stock: ${Vehicle.Stock}`;
		NewVehicleDiv.appendChild(FooterInformation);
		
		VehicleDisplayElement.appendChild(NewVehicleDiv);
	});
	
	NavigationContent.appendChild(VehicleDisplayElement);
}

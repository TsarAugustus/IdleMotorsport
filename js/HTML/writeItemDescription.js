export function writeItemDescription(item, type) {
	let descriptionSpan = document.createElement('span');
	let description = 'Discription: ';

	// console.log(item);

	console.log(item);
	if(item.manufacturer.name) {
		description += `Manufacturered by ${item.manufacturer.name}, `;
	}

	if(type	=== 'Engine') {
		description += `This ${item.engineDisplacement} Liter ${item.boreStrokeType} ${item.configuration} Configuration Engine 
		features ${item.cylinderNumber} Cylinders, with ${item.valvesPerCylinder} Valves per Cylinder. 
		
		<br> <br> Its Bores measure at ${item.boreDiameter}CM, with a Stroke Length of ${item.strokeLength}CM. 
		
		<br> <br> With ${item.HP} Horse Power at its disposal, the engine features ${item.RPM} RPM with ${item.torque}NM of Torque.`;

		if(item.boreStrokeRatio < 0.5) {
			description += `<br> <br> Its Bore/Stroke Ratio is very low, at ${item.boreStrokeRatio}`;
		} else if (item.boreStrokeRatio < 1 && item.boreStrokeRatio > 0.5) {
			description += `<br> <br> Its Bore/Stroke Ratio is okay, at ${item.boreStrokeRatio}`;
		}
		else if (item.boreStrokeRatio < 1.5 && item.boreStrokeRatio > 1) {
			description += `<br> <br> Its Bore/Stroke Ratio is good, at ${item.boreStrokeRatio}`;
		}
		else if (item.boreStrokeRatio < 2 && item.boreStrokeRatio > 1.5) {
			description += `<br> <br> Its Bore/Stroke Ratio is very good, at ${item.boreStrokeRatio}`;
		}
		else if (item.boreStrokeRatio < 2.5 && item.boreStrokeRatio > 2) {
			description += `<br> <br> Its Bore/Sroke Ratio is massive, at ${item.boreStrokeRatio}`;
		} else if(item.boreStrokeRatio > 2.5) {	
			description += `<br> <br> Its Bore/Stroke Ratio is overwhelming, at ${item.boreStrokeRatio}`;
		}
	}

	descriptionSpan.innerHTML = description;

	descriptionSpan.style['border'] = '1px solid red';

	return descriptionSpan;
}

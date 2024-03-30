export function VEngine(configuration, thisManufacturer) {
	const valveEfficiencyObject = {
		2: 50,
		3: 64,
		4: 68,
		5: 68,
		6: 66,
		7: 64,
		8: 61
	};

	const boreDiameter = randomNumber(1, 20); //CM
	const strokeLength = randomNumber(1, 20); //CM
	const cylinderNumber = randomCylinderNumber(2, 12, configuration);
	const valvesPerCylinder = randomNumber(2, 8);
	const valveEfficiency = valveEfficiencyObject[valvesPerCylinder];
	const boreStrokeRatio = roundNumber(boreDiameter / strokeLength);
	const boreStrokeType = `${determineBoreStrokeRatio(boreStrokeRatio)} Stroke`;
	const engineDisplacement =  roundNumber((strokeLength * Math.PI * (boreDiameter / 2) ** 2 * cylinderNumber) / 1000);
	const RPM = Math.round(randomNumber(1000, 20000) / 1000) * 1000;
	const torque = randomNumber(100, 600); //NM
	const BMEP = Math.round(10.4 * torque / engineDisplacement); //Brake Mean Effective Pressure
	const HP = Math.round(torque * RPM / 5252);	
	const manufacturer = thisManufacturer;
	const weight = calculateEngineWeight(configuration, boreDiameter, cylinderNumber, strokeLength);
	const rating = Math.floor((HP / weight) * engineDisplacement + 100);
	const acceleration = Math.floor(Math.sqrt(HP * 745.6992 / (2 * weight * 1))); //Meters per Second
	const KMPH = Math.floor(acceleration * 3.6);
	const zeroToOneHundred = Math.floor(acceleration / 8.1359); //KMPH, not a good estimate
	const durability = calculateDurability(boreDiameter, strokeLength, valvesPerCylinder, cylinderNumber, RPM);

	//typical engine weight: 300-600 pounds

	// a stroke of 4.750" / 2 is 2.375" (crank arm)
	//rod center to center 6.7"
	// piston compressions distance of 1.12"
	// total length 10.195"

	return {
		configuration,
		boreDiameter,
		strokeLength,
		cylinderNumber,
		valvesPerCylinder,
		valveEfficiency,
		boreStrokeRatio,
		boreStrokeType,
		engineDisplacement,
		RPM,
		torque,
		BMEP,
		HP,
		manufacturer,
		weight,
		rating,
		acceleration,
		KMPH,
		zeroToOneHundred, 
		durability
	};

}

function calculateDurability(boreDiameter, strokeLength, valvesPerCylinder, cylinderNumber, RPM) {
	return Math.floor((RPM / strokeLength) + (valvesPerCylinder * cylinderNumber) * boreDiameter / 1000);	
}

function calculateEngineWeight(configuration, boreDiameter, cylinderNumber, strokeLength) {
	const material = {
		// 'Cast Iron': 7.87 //Grams
		'Cast Iron': 12.7
	};

	const minimumEngineBoreLength = calculateBoreLength(configuration, boreDiameter, cylinderNumber);
	const minimumEngineBoreWidth = calculateBoreWidth(configuration, boreDiameter);

	const arbitraryHeight = 50; //Placeholder for the rest of the engine height

	const totalEngineVolume = minimumEngineBoreLength * minimumEngineBoreWidth * (strokeLength * 2 + arbitraryHeight); //CM

	const engineWeight = Math.floor(material['Cast Iron'] * totalEngineVolume) / 1000; //KG

	return engineWeight;
}

function calculateBoreLength(configuration, boreDiameter, cylinderNumber) {
	if(configuration === 'V') {
		return (boreDiameter * cylinderNumber) / 2;
	}
}

function calculateBoreWidth(configuration, boreDiameter) {
	if(configuration === 'V') {
		return boreDiameter * 2; 
	}
}

function determineBoreStrokeRatio(ratio) {
	if(ratio < 1) return 'Short';
	else if (ratio === 1) return 'Square';
	else if (ratio > 1) return 'Long';
}

function roundNumber(num) {
	return Math.round(num * 100) / 100;
}

function randomNumber(min, max) {	
	return Math.floor(Math.random() * (max - min) + min);
}

function randomCylinderNumber(min, max, configuration) {
	let cylinderNumber;
	if(configuration === 'V') {
		cylinderNumber = Math.floor(Math.random() * ((max - min) + min) / 2) * 2;
	}

	if(cylinderNumber === 0) {
		return randomCylinderNumber(min, max, configuration);
	} else {
		return cylinderNumber;
	}
}

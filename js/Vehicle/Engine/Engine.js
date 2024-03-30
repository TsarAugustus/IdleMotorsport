//engine block
//bores
// strokes
// to find stroke length:
// determine extreme points of reciprocation (Top Dead Center TDC, Bottom Dead Center BDC)
//cylinders

//pi/4 = 0.7854

// displacement = stroke length x PI (bore / 2) ^ 2 x number of cylinders
// displacement = π ( 1 / 2 × bore )2 × stroke × ncylinders
// stoke length x pi (bore / 2) ^2 x cylinders

// const strokeLength = 7.76;
// const boreDiameter = 8.1;
// const cylinderNumber = 6;

// valve efficency
// over 5 valves decreases efficency

// 2 = 50%
// 3 = 64%
// 4 = 68%
// 5 = 68%
// 6 = 66%
// 7 = 64%
// 8 = 61%

// bore/stroke ratio
// big bore/small stroke = oversquare
// even bore/even stroke = square
// small bore/big stroke = long stroke/undersquare

//brake mean effective pressure
// BMEP (psi) = 150.8 x TORQUE  (lb-ft) / DISPLACEMENT (ci)
// 10.4 BAR is 150.8 PSI

// Horsepower = Torque x RPM / 5,252

//rough fuel mileage
// N/A: Hp x 0.50 BSFC = lbs/hr (for gas)
// Boosted: Hp x 0.60 BSFC = lbs/hr (for gas)
// Double the above lbs/hr if using methanol
// For EFI: [Lbs/hr x 0.80 (duty cycle correction)] / 8 (#of injectors) = lbs / hr per injector

//Examples
//Alfa Romero 158
// Supercharge 8 cylinder inline
// Bore/Stroke: 58mm x 70mm
// displacement: 1479CC
// Power: 350BHP @ 8500 RPM

import { VEngine } from './VEngine.js';

export function Engine(thisManufacturer) {
	const engineConfigurations = ['V'];
	const configuration = engineConfigurations[Math.floor(Math.random() * engineConfigurations.length)];

	if(configuration === 'V') {
		return VEngine(configuration, thisManufacturer);
	}
}

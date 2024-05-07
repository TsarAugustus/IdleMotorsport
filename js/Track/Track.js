import { trackTypes } from '../data/trackTypes.js';
import { NewOwner } from '../NewOwner/NewOwner.js';

export function Track(iteration, People) {
	let seriesStyle = trackTypes[Math.floor(Math.random() * trackTypes.length)].style;

	let thisTrack = {
		Owner: undefined,
		name: `Track ${iteration}`,
		configurationNumber: getNumberInRange(1, 10),
		configurations: [],
		Cost: Number,
		CostPerYear: {
			Total: 10000
		},
		Prestige: Number,
		Type: 'Track'
	};

	for(let i = 0; i < thisTrack.configurationNumber; i++) {
		thisTrack.configurations.push(getTrackData(seriesStyle, i));
	}

	thisTrack.Prestige = getNumberInRange(thisTrack.configurations.length, 100);
	thisTrack.Cost = getNumberInRange(thisTrack.Prestige, 100) * 100;

	const preferredOwnerAttributes = [
		'Management',
		'Prestige'
	];


	thisTrack.Owner = NewOwner(preferredOwnerAttributes, People, thisTrack);
	
	return thisTrack;
}

//Track
// Configuration
//  

function getTrackData(seriesStyle, configurationNumber) {
	let thisTrackData = {
		name: `Configuration ${configurationNumber}`,
		grade: getNumberInRange(1, 5),
		style: seriesStyle
	};
	
	if(seriesStyle === 'Circuit') {
		const data = getCircuitTrackData();
		thisTrackData.corners = data.corners; 
		thisTrackData.length = data.length;
		thisTrackData.surface = data.surface;	
	}
	if(seriesStyle === 'Off Road') {
		const data = getOffRoadTrackData();
		thisTrackData.stageNumber = data.stageNumber;
		thisTrackData.stages = data.stages;
	}
	if(seriesStyle === 'Drag') {
		const data = getDragTrackData();
		thisTrackData.stageNumber = data.stageNumber;
		thisTrackData.stages = data.stages;
	}

	return thisTrackData;
}

function getCircuitTrackData() {
	const trackType = trackTypes.find(type => type.style === 'Circuit');

	return {
		length: getNumberInRange(1, 50),
		corners: getNumberInRange(4, 30),
		surface: trackType.surface[Math.floor(Math.random() * trackType.surface.length)]
	};
}

// function createCircuitTrack() {

// }

function getOffRoadTrackData() {
	const stageNumber = getNumberInRange(10, 30);
	let stages = [];

	for(let i = 0; i < stageNumber; i++) {
		stages.push(createOffRoadStage());
	}

	return {
		stageNumber: stageNumber,
		stages: stages
	};
}

function createOffRoadStage() {
	const trackType = trackTypes.find(type => type.style === 'Off Road');

	return {
		length: getNumberInRange(1, 100),
		surface: trackType.surface[Math.floor(Math.random() * trackType.surface.length)],
		corners: getNumberInRange(10, 1000)
	};
}

function getDragTrackData() {
	const stageNumber = getNumberInRange(1, 5);
	let stages = [];

	for(let i = 0; i < stageNumber; i++) {
		stages.push(createDragStage());
	}

	return {
		stageNumber: stageNumber,
		stages: stages,
		corners: 0
	};
}

function createDragStage() {
	const trackType = trackTypes.find(type => type.style === 'Drag');

	return {
		length: getNumberInRange(10, 100),
		surface: trackType.surface[Math.floor(Math.random() * trackType.surface.length)]
	};
}

function getNumberInRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function Vehicle(name, team, drivers) {
	const thisVehicle = {
		name: name,
		team: team,
		drivers: drivers,
		cost: Number,
		statistics: {
			wins: [],
			podiums: [],
			fastestLaps: [],
			poles: [],
			titles: [],
			entries: [],
			points: 0
		},
		specifications: {
			frontSuspension: '',
			rearSuspension: '',
			engine: '',
			engineLayout: '',
			tires: '',
			power: 0,
			weight: 0
		}
	};

	return thisVehicle;
}

export { Vehicle };
let settings = {
	//Initial settings
	initialDriverNumber: 300,
	// initialTeamNumber: 10,
	initialVehicleNumber: 0,
	initialCircuitNumber: 22,
	initialStaffNumber: 300,

	numberOfGrades: 5,
	teamsPerSeason: 12,
	driversPerTeam: 2,
	staffPerDepartmentLimit: 5,

	//setInterval related settings
	daysPerMonth: 10,
	monthsPerYear: 2,
	points: {
		1: 25,
		2: 18,
		3: 15,
		4: 12,
		5: 10,
		6: 8,
		7: 6,
		8: 4,
		9: 2,
		10: 1
	}
};

export { settings };
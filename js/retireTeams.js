function retireTeams(teams, season, retiredTeams) {
	teams.forEach(team => {
		let thisRetiredTeam = retireTeam(team, season, retiredTeams);

		if(thisRetiredTeam.team) {
			team = thisRetiredTeam.team;
			season = thisRetiredTeam.season;
			retiredTeams = thisRetiredTeam.retiredTeams;
		}
	});

	return { teams, season, retiredTeams };
}

function retireTeam(team, season, retiredTeams) {

	if(team.drivers.length > 0) return team, season, retiredTeams;
	
	team.owner = {};
	team.departments = removeDepartmentStaff(team);

	team.drivers.forEach(driver => {
		driver.team = {};
	});
	
	season.staff.forEach(thisStaff => {
		if(team.owner.name === thisStaff.name) {
			thisStaff.teamsOwned = thisStaff.teamsOwned.filter(thisTeam => thisTeam.name !== team.name);
		}
	});
	
	let retiredTeamsCheck = retiredTeams.filter(thisTeam => thisTeam.name === team.name);
	if(retiredTeamsCheck.length === 0) retiredTeams.push(team);

	console.log(`Team ${team.name} Retired`);

	season.teams = season.teams.filter(thisTeam => thisTeam.name !== team.name);

	return { team, season, retiredTeams };
}

function removeDepartmentStaff(team) {
	team.departments.forEach(department => {
		department.staff.forEach(staff => {
			staff.contractLength = 0;
			staff.teamEmployed = {};
			department.staff = department.staff.filter(thisStaff => thisStaff.name !== staff.name);
		});
	});

	return team.departments;
}

export { retireTeams };
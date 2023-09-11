function updateSeasons(season) {
	// let infoDiv = document.getElementById('info');
	// infoDiv.innerHTML = '';

	// seasons.forEach(season => {
	let thisSeasonDiv = document.createElement('div');
	thisSeasonDiv.id = season.name;
	thisSeasonDiv.classList.add('season');

	let seasonHeader = document.createElement('span');
	seasonHeader.innerHTML = season.name;
	seasonHeader.classList.add('seasonHeader');
	thisSeasonDiv.appendChild(seasonHeader);

	season.tierResults.forEach(tier => {
		let thisTierDiv = document.createElement('div');
		thisTierDiv.id = tier.rank;
			
		let tierHeader = document.createElement('span');
		// tierHeader.innerHTML = tier.rank;
		thisTierDiv.appendChild(tierHeader);

		let driverResultDiv = document.createElement('div');
		driverResultDiv.id = 'driverResultDiv';

		let teamResultDiv = document.createElement('div');
		teamResultDiv.id = 'teamResultDiv';
		tier.drivers.forEach(driver => {
			let thisDriverDiv = document.createElement('div');
			thisDriverDiv.id = driver.name;
				
			let driverInfo = document.createElement('span');
				
			const driverTitles = driver.driverInfo.statistics.titles.length;
			driverInfo.innerHTML = `${driver.name}(${driverTitles})(D) - ${driver.team.name} - ${driver.points} | ${driver.driverInfo.age}`;
			thisDriverDiv.appendChild(driverInfo);

			driverResultDiv.appendChild(thisDriverDiv);
		});

		tier.teams.forEach(team => {
			let thisTeamDiv = document.createElement('div');
			thisTeamDiv.id = team.name;
				
			let teamInfo = document.createElement('span');
				
			const teamTitles = team.teamInfo.statistics.titles.length;

			teamInfo.innerHTML = `${team.name}(${teamTitles})(T) - ${team.points}`;

			thisTeamDiv.appendChild(teamInfo);

			teamResultDiv.appendChild(thisTeamDiv);
		});

		let resultsDiv = document.createElement('div');
		resultsDiv.classList.add('resultsDiv');

		resultsDiv.appendChild(driverResultDiv);
		resultsDiv.appendChild(teamResultDiv);

		thisSeasonDiv.appendChild(resultsDiv);

		thisSeasonDiv.appendChild(thisTierDiv);
	});

	document.getElementById('info').appendChild(thisSeasonDiv);
}

export { updateSeasons };
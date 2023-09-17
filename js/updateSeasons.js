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

		let x = tier.drivers[0].points - tier.drivers[1].points;

		tierHeader.innerHTML = `${tier.rank} - ${tier.drivers.length} - ${tier.teams.length} - (${x})`;
		thisSeasonDiv.appendChild(tierHeader);
		// thisSeasonDiv.appendChild(thisTierDiv);

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
			teamInfo.innerHTML = `${team.name}(${teamTitles})(T) - ${team.points}(TOTAL: ${team.teamInfo.drivers.length})`;

			thisTeamDiv.appendChild(teamInfo);

			teamResultDiv.appendChild(thisTeamDiv);
		});

		let circuitResult = document.createElement('div');
		circuitResult.classList.add('circuitResult');

		let driverCircuitResult = document.createElement('div');
		driverCircuitResult.classList.add('driverCircuitResult');
		
		tier.drivers.forEach(driver => {
			let driverResultDiv = document.createElement('div');
			driverResultDiv.classList.add('driverResultDiv');

			let driverNameSpan = document.createElement('span');
			driverNameSpan.classList.add('driverResultDivName');
			driverNameSpan.innerHTML = driver.name;
			driverResultDiv.appendChild(driverNameSpan);
			
			let circuitResults = document.createElement('div');
			circuitResults.classList.add('circuitResults');

			tier.circuitResults.forEach(circuit => {
				circuit.circuitResult.forEach((driverCircuitResult, index) => {
					if(driverCircuitResult.driver.name === driver.name) {
						let x = document.createElement('span');
						x.classList.add('driverCircuitResultDiv');
						x.innerHTML = index + 1;
						if(index + 1 === 1) x.classList.add('first');
						if(index + 1 === 2) x.classList.add('second');
						if(index + 1 === 3) x.classList.add('third');
						if(driverCircuitResult.points > 0) x.classList.add('points');
						if(circuit.weather === 'wet') x.classList.add('wetCircuit');
						if(circuit.weather === 'dry') x.classList.add('dryCircuit');
						circuitResults.appendChild(x);
					}
				});
			});
			
			driverResultDiv.appendChild(circuitResults);

			driverCircuitResult.appendChild(driverResultDiv);
		});

		
		let resultsDiv = document.createElement('div');
		resultsDiv.classList.add('resultsDiv');
		
		resultsDiv.appendChild(driverResultDiv);
		resultsDiv.appendChild(teamResultDiv);

		circuitResult.appendChild(driverCircuitResult);
		
		thisSeasonDiv.appendChild(resultsDiv);
		thisSeasonDiv.appendChild(circuitResult);


	});

	document.getElementById('info').appendChild(thisSeasonDiv);
}

export { updateSeasons };
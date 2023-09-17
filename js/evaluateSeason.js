function evaluateSeason(season) {
	let seasonTiers = determineSeasonTiers(season);
	season.tierResults = determineSeasonTiersDriversAndTeamsPoints(season, seasonTiers);
	season.tierResults.forEach(tier => {
		let tierDriverChampion = season.drivers.filter(driver => driver.name === tier.drivers[0].name);
		tierDriverChampion[0].statistics.titles.push(season);

		let tierTeamChampion = season.teams.filter(team => team.name === tier.teams[0].name);
		tierTeamChampion[0].statistics.titles.push(season);
	});
	
	return season;
}

function determineSeasonTiers(season) {
	let tiers = [];

	season.circuitResult.forEach(circuit => {
		let tierCheck = tiers.filter(tier => tier.rank === circuit.rank);
		if(tierCheck.length > 0) return;

		let tierResults = determineSeasonTiersDriversAndTeams(season);

		let thisTier = {
			season: season,
			rank: circuit.rank,
			drivers: tierResults.drivers,
			teams: tierResults.teams,
			circuitResults: []
		};
		
		tiers.push(thisTier);
	});

	return tiers;
}

function determineSeasonTiersDriversAndTeams(season) {
	let drivers = [];
	let teams = [];

	season.circuitResult.forEach(circuit => {
		circuit.circuitResult.forEach(circuitDriver => {
			let driverFilter = drivers.filter(driver => driver.name === circuitDriver.driver.name);
			let teamFilter = teams.filter(team => team.name === circuitDriver.driver.team.name);

			if(driverFilter.length == 0) {
				let thisDriver = {
					name: circuitDriver.driver.name,
					team: circuitDriver.driver.team,
					driverInfo: circuitDriver.driver,
					driverTitles: 0,
					points: 0
				};

				drivers.push(thisDriver);
			}

			if(teamFilter.length === 0) {
				let thisTeam = {
					name: circuitDriver.driver.team.name,
					teamInfo: circuitDriver.driver.team,
					teamTitles: 0,
					points: 0
				};

				teams.push(thisTeam);
			}
		});
	});

	return { drivers, teams };
}

function determineSeasonTiersDriversAndTeamsPoints(season, tiers) {
	tiers.forEach(tier => {
		tier.season.circuitResult.forEach(thisCircuit => {
			tier.circuitResults.push(thisCircuit);

			thisCircuit.circuitResult.forEach(driverCircuitResult => {
				let tierDriver = tier.drivers.filter(thisDriver => thisDriver.name === driverCircuitResult.driver.name); 
				let tierTeam = tier.teams.filter(thisTeam => thisTeam.name === driverCircuitResult.driver.team.name);
				tierDriver[0].points += driverCircuitResult.points;
				tierTeam[0].points += driverCircuitResult.points;
			});
		});
		
		tier.drivers = tier.drivers.sort(function(a, b) {
			return b.points - a.points;
		});

		tier.teams = tier.teams.sort(function(a, b) {
			return b.points - a.points;
		});
	});

	return tiers;
}

export { evaluateSeason };
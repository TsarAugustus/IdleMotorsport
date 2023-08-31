function evaluateSeason(season, previousSeasons) {
	season.circuitResult.forEach(circuit => {
		const tierResultsCheck = season.tierResults.filter(result => { return result.rank === circuit.rank; });
		const newTier = {
			rank: circuit.rank,
			driverResult: [],
			teamResult: []
		};

		if(tierResultsCheck.length === 0) {
			newTier.driverResult = getTierDriversResults(season.circuitResult);
			newTier.teamResult = getTierTeamResults(season.circuitResult, season, previousSeasons);

			season.tierResults.push(newTier);
		}
	});

	season.tierResults.forEach(tierResult => {
		//TODO: CLEAN THIS UP AND FIX
		const tierTeamChampion = tierResult.teamResult[0];
		const tierDriverChampion = tierResult.driverResult[0];

		season.teams.forEach(team => {
			if(team.name === tierTeamChampion.name) {
				const thisTeamChampionship = {
					season: season.name,
					rank: tierResult.rank,
					result: tierResult
				};
				
				team.statistics.titles.push(thisTeamChampionship);
			}
		});

		season.drivers.forEach(driver => {
			if(driver.name === tierDriverChampion.name) {
				const thisDriverChampionship = {
					season: season.name,
					rank: tierResult.rank,
					result: tierResult
				};
				
				driver.statistics.titles.push(thisDriverChampionship);
			}
		});
	});

	season.teams.sort((a, b) => {
		return b.statistics.titles.length - a.statistics.titles.length;
	});

	season.drivers.sort((a, b) => {
		return b.statistics.titles.length - a.statistics.titles.length;
	});

	season.staff.forEach(staff => {
		if(staff.teamEmployed.name && staff.contractLength > 0 && staff.teamsOwned.length === 0) {
			staff.contractLength--;
			staff.cost++;
		}
		if(staff.contractLength === 0) {
			// console.log(`STAFF LEAVING ${staff.name}`);
			staff.teamEmployed = {};
		}
	});

	season.drivers.forEach(driver => {
		if(driver.team.name && driver.contractLength > 0) {
			driver.contractLength--;
			driver.cost++;
		}
		if(driver.contractLength === 0) {		
			season.teams.forEach(team => {
				team.drivers.forEach(thisDriver => {
					if(thisDriver.name === driver.name) {
						team.drivers = team.drivers.filter(teamDriver => teamDriver.name !== driver.name);
					}
				});
			});

			driver.team = {};
		}
	});
	

	return season;
}

function getTierTeamResults(results, season, previousSeasons) {
	const tierTeamResults = [];

	results.forEach(result => {
		result.circuitResult.forEach(driverResult => {
			const tierTeamResultsCheck = tierTeamResults.filter(thisResult => { return thisResult.name === driverResult.driver.team.name;});

			determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult, previousSeasons);
		});
	});

	tierTeamResults.sort((a, b) => {
		return b.points - a.points;
	});

	let teamPrizeMoney = {
		1: 100,
		2: 90,
		3: 80,
		4: 70,
		5: 60,

		else: 50
	};

	season.teams.forEach(team => {
		tierTeamResults.forEach((tierTeam, index) => {
			if(team.name === tierTeam.name) {
				if(teamPrizeMoney[index + 1]) team.owner.funds += teamPrizeMoney[index + 1];
				else team.owner.funds += teamPrizeMoney.else;
			}
		});
	});

	return tierTeamResults;
}

function determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult, previousSeasons) {
	if(tierTeamResultsCheck.length === 0) {
		// console.log(tierTeamResults);
		const tierTeam = {
			name: driverResult.driver.team.name,
			points: driverResult.points,
			teamInfo: driverResult.driver.team,
			titles: 0
		};

		// console.log(previousSeasons);

		tierTeamResults.push(tierTeam);
	} else {
		tierTeamResults.forEach(thisResult => {
			if(thisResult.name === driverResult.driver.team.name) {
				thisResult.points += driverResult.points;
			}
		});
	}

}

function getTierDriversResults(results) {
	const tierDriverResults = [];

	for(const result of results) {
		for(const driverResult of result.circuitResult) {
			const tierDriverResultsCheck = tierDriverResults.filter(thisResult => { return thisResult.name === driverResult.driver.name; });
            
			determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult);
		}
	}

	tierDriverResults.sort((a, b) => {
		return b.points - a.points;
	});

	return tierDriverResults;
}

function determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult) {
	if(tierDriverResultsCheck.length === 0) {
		const tierDriver = {
			name: driverResult.driver.name,
			points: driverResult.points,
			team: driverResult.driver.team.name,
			driverInfo: driverResult.driver
		};

		tierDriverResults.push(tierDriver);
	} else {
		tierDriverResults.forEach(thisResult => { 
			if(thisResult.name === driverResult.driver.name) {
				thisResult.points += driverResult.points;
			}
		});
	}
}

export { evaluateSeason };
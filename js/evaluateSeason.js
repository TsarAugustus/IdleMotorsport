function evaluateSeason(season) {

	season.circuitResult.forEach(circuit => {
		const tierResultsCheck = season.tierResults.filter(result => { return result.rank === circuit.rank; });
		const newTier = {
			rank: circuit.rank,
			driverResult: [],
			teamResult: []
		};

		if(tierResultsCheck.length === 0) {
			newTier.driverResult = getTierDriversResults(season.circuitResult);
			newTier.teamResult = getTierTeamResults(season.circuitResult);

			season.tierResults.push(newTier);
		}
	});

	season.tierResults.forEach(tierResult => {
		const tierTeamChampion = tierResult.teamResult[0];
		const tierDriverChampion = tierResult.driverResult[0];
        
		for(const team of season.teams) {
			team.owner.funds += 10;
			
			if(team.name === tierTeamChampion.name) {
				const thisTeamChampionship = {
					season: season.name,
					rank: tierResult.rank,
					result: tierResult
				};
                
				team.statistics.titles.push(thisTeamChampionship);
			}
		}

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

	return season;
}

function getTierTeamResults(results) {
	const tierTeamResults = [];

	results.forEach(result => {
		result.circuitResult.forEach(driverResult => {
			const tierTeamResultsCheck = tierTeamResults.filter(thisResult => { return thisResult.name === driverResult.driver.team.name;});

			determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult);
		});
	});

	tierTeamResults.sort((a, b) => {
		return b.points - a.points;
	});

	return tierTeamResults;
}

function determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult) {
	if(tierTeamResultsCheck.length === 0) {
		const tierTeam = {
			name: driverResult.driver.team.name,
			points: driverResult.points
		};

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
			points: driverResult.points
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

export { evaluateSeason }
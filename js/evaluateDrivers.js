import { getRandomNumber } from './getRandomNumber.js	';

function evaluateDrivers(drivers, teams) {
	drivers.forEach(driver => {
		driver.age++;
		if(driver.team.name && driver.contractLength > 0) {
			driver.contractLength--;
			driver.retirement--;
			driver.cost++;
		}

		let driverTotal = 0;
		for(let statistic in driver.statistics) {
			if(driver.statistics[statistic].length) driverTotal += driver.statistics[statistic].length;
			
		}

		let retireChance = getRandomNumber(0, driverTotal);
		
		if(driver.retirement === 0 && driverTotal / driver.age < retireChance) {
			// console.log(`${driver.name} RETIRING | ${driver.statistics.entries[0].season.name}-${driver.statistics.entries[driver.statistics.entries.length - 1].season.name}`, driverTotal, retireChance);
			drivers = drivers.filter(thisDriver => thisDriver.name !== driver.name);
			teams = removeDriverFromTeam(driver, teams);
		} else if (driver.retirement === 0 && driverTotal > retireChance) {
			driver.retirement = getRandomNumber(1, 5);
		}

		if(driver.contractLength === 0) teams = removeDriverFromTeam(driver, teams);
	});

	return drivers;
}

function removeDriverFromTeam(driver, teams) {
	teams.forEach(team => {
		team.drivers.forEach(thisDriver => {
			if(thisDriver.name === driver.name) {
				team.drivers = team.drivers.filter(teamDriver => teamDriver.name !== driver.name);
			}
		});
	});

	driver.team = {};

	return teams;
}

export { evaluateDrivers };
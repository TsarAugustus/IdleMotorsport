import { getRandomNumber } from './getRandomNumber.js	';

function evaluateDrivers(season) {
	let drivers = season.drivers;
	let teams = season.teams;

	drivers.forEach(driver => {
		driver.age++;
		driver.retirement--;
		for(let skill in driver.skills) {
			// console.log(driver.skills[skill], driver.skills[skill] / driver.age, driver);
			driver.skills[skill] = Math.floor(driver.skills[skill] / driver.age);
		}
		if(driver.team.name && driver.contractLength > 0) {
			driver.contractLength--;
			driver.cost++;
		}

		let driverTotal = 0;
		for(let statistic in driver.statistics) {
			if(driver.statistics[statistic].length && driver.statistics[statistic] !== 'entries') driverTotal += driver.statistics[statistic].length;
			
		}

		let retireChance = getRandomNumber(1, driverTotal);
		// console.log(driverTotal, driver);
		// if(driver.retirement === 0 && driverTotal / driver.age < retireChance) {
		// console.log(driver.age / driverTotal, driverTotal / driver.age, driverTotal, driver.age, driver);
		if(driver.retirement === 0 && (driverTotal / driver.age < 1)) {
			console.log(`DRIVER ${driver.name} RETIRED`, driver);
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
import { settings } from './settings.js';
import { getRandomNumber } from './getRandomNumber.js';
import { buyStaffForTeam } from './buyStaffForTeam.js';

function restartRetiredTeam(team, staff, drivers, season) {
	let teamOwnerPool = [];
	let potentialOwner = { funds: 0 };

	teamOwnerPool = staff.filter(member => { 
		let memberToReturn = {};
		if(!member.team) memberToReturn = member;
		return memberToReturn;
	});

	if(teamOwnerPool.length > 0) potentialOwner = teamOwnerPool[Math.floor(Math.random() * teamOwnerPool.length)];
	
	const potentialDrivers = [];
	let ownerFunds = potentialOwner.funds;

	drivers.forEach(driver => {
		if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team.name) {
			potentialDrivers.push(driver);
			ownerFunds -= driver.cost;
		}
	});
	
	for(const driver of potentialDrivers) {
		const contractCost = driver.cost;
		team.owner = potentialOwner;
		driver.team = team;
		team.drivers.push(driver);
		potentialOwner.funds -= contractCost;
		driver.funds += contractCost;
		driver.contractLength = getRandomNumber(1, 10);
	}

	staff.forEach((thisStaff, index) => {
		if(team.owner.name === thisStaff.name) {
			staff[index].teamsOwned.push(team);
		}
	});

	team = buyStaffForTeam(team, staff, drivers, season);

	if(team.drivers.length > 0) return team;
}

export { restartRetiredTeam };
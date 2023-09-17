import { getRandomNumber } from './getRandomNumber.js';
import { settings } from './settings.js';

function buyStaffForTeam(team, staff, drivers, season) {
	const potentialStaff = [];
	let ownerFunds = team.owner.funds;
	if(team.drivers.length < settings.driversPerTeam) {
		const potentialDrivers = [];

		drivers = drivers.sort(function(a, b) {
			return a.cost - b.cost;
		});

		drivers.forEach(driver => {
			if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team.name) {
				potentialDrivers.push(driver);
				ownerFunds -= driver.cost;
			}
		});
        
		for(let driver of potentialDrivers) {
			if(team.drivers.length < settings.driversPerTeam) {
				const contractCost = driver.cost;
	
				team.owner = team;
				driver.team = team;
				team.drivers.push(driver);
				team.owner.funds -= contractCost;
				driver.funds += contractCost;
				driver.contractLength = getRandomNumber(1, 10);
			}
		}
	}
	
	staff.drivers = staff.sort(function(a, b) {
		return a.cost - b.cost;
	});

	staff.forEach(staffMember => {
		if(ownerFunds > staffMember.cost && !staffMember.team && staffMember.teamsOwned.length === 0) {
			potentialStaff.push(staffMember);
			ownerFunds -= staffMember.cost;
		}
	});
    
	potentialStaff.forEach(potentialMember => {
		let departmentWithLeastStaff = {};
		team.departments.forEach(department => {
			if(!departmentWithLeastStaff.staff || department.staff.length < departmentWithLeastStaff.staff.length) {
				departmentWithLeastStaff = department;
			}
		});

		team.departments.forEach((department, index) => {
			if(department.name === departmentWithLeastStaff.name && department.staff.length < settings.staffPerDepartmentLimit) {
				const contractPrice = potentialMember.cost;

				team.owner.funds -= contractPrice;
				potentialMember.funds += contractPrice;
				potentialMember.contractLength = getRandomNumber(1, 10);
				potentialMember.team = team;
				team.departments[index].staff.push(potentialMember);
				//Works, but should be better
				season.staff.filter(staffMember => staffMember.name === potentialMember.name ? staffMember = potentialMember : '');
			}
		});
	});
	
	return team;
}

export { buyStaffForTeam };
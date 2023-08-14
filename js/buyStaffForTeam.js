function buyStaffForTeam(team, staff) {
	const potentialStaff = [];
	let ownerFunds = team.owner.funds;

	staff.forEach(staffMember => {
		if(ownerFunds > staffMember.cost && staffMember.teamEmployed.length === 0 && staffMember.teamOwned.length === 0) {
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
			if(department.name === departmentWithLeastStaff.name) {
				const contractPrice = potentialMember.cost;

				team.owner.funds -= contractPrice;
				potentialMember.funds += contractPrice;
				potentialMember.teamEmployed.push(team);
				team.departments[index].staff.push(potentialMember);
			}
		});
	});

	return team;
}

export { buyStaffForTeam };
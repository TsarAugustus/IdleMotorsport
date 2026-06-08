import { newOrganizationOwner } from "./NewOwnerSystem.js";

import { addHistory } from "./HistorySystem.js";

export function handleDeath(person) {
	addHistory(`${person.firstName} ${person.lastName} has died at the age of ${person.age}`)
	
	// Remove employment
    if (person.employedOrganizations.length > 0) {
		
		person.employedOrganizations.forEach(organization => {
			organization.employees = organization.employees.filter(employee => employee.id !== person.id);
        });
		
        person.employedOrganizations = [];
    }
	
	
    // Transfer ownership

    if (person.ownedOrganizations.length > 0) {
		
		const previousOrganizations = [...person.ownedOrganizations];
		
        previousOrganizations.forEach(organization => {
			
			const newOwner = newOrganizationOwner(organization);
			
            organization.owner = newOwner;
			
            if (newOwner) {
				newOwner.ownedOrganizations.push(organization);
                addHistory(`${newOwner.firstName} ${newOwner.lastName} inherited ownership of ${organization.name}`);
            }
        });
		
        person.ownedOrganizations = [];
    }
	
}

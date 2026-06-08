import { world } from "../World/World.js";

import { addHistory } from "./HistorySystem.js";

export function organizationHire(organization, person) {

	if (organization.employees.some(employee => employee.id === person.id)) return;

    // Remove from previous employer
    if (person.employedOrganizations.length > 0) {

        const oldOrganization = person.employedOrganizations[0];

        oldOrganization.employees = oldOrganization.employees.filter(employee => employee.id !== person.id);

        addHistory(`${person.firstName} ${person.lastName} left ${oldOrganization.name} in year ${world.day} / ${world.month} / ${world.year}.`);
    }

    organization.employees.push(person);

    person.employedOrganizations = [organization];

    addHistory(`${person.firstName} ${person.lastName} was hired by ${organization.name} in year ${world.day} / ${world.month} / ${world.year}.`);

}

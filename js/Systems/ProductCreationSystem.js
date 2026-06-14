import { world } from "../World/World.js";
import { attemptProductCreation } from "./ProductSystem.js";

export function productTick() {
	// End function if no there are no organizations yet made
	if (world.organizations.length === 0) return;

	// Find active organiations, end function if none exist
	const activeOrganizations = world.organizations.filter((organization) => organization.active === true);
	if (activeOrganizations.length === 0) return;

	const randomOrganization = activeOrganizations[Math.floor(Math.random() * activeOrganizations.length)];

	// Temporary
	// TODO: Add a better system to decide when someone makes a product
	if (Math.random() < 0.5) return;

	// if (randomOrganization.type === "manufacturer")
	attemptProductCreation(randomOrganization);
}

import { world } from "../World/World.js";

export default function revenueTick() {
	world.organizations.forEach((org) => {
		if (org.active) org.money = Math.round(org.prestige * (Math.random() * 50));
	});
}

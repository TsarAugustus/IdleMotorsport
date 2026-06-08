import { world } from "../World/World.js";

export function addHistory(event) {
	world.history.push(event);
}

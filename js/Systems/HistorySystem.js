import { world } from "../world/World.js";

export function addHistory(event) {
	// console.log(event);
	world.history.push(event);
	console.log(event);
}

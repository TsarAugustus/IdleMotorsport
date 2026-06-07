import { Structure } from '../data/Structure/Structure.js';

export function EvaluateRoles(thisPerson) {
	//Random for now
	const randomRole = Structure.Role()[Math.floor(Math.random() * Structure.Role().length)];

	thisPerson.Role.push(randomRole);

	return thisPerson;
}

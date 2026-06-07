import { EvaluateGoals } from './EvaluateGoals.js';
import { EvaluateRoles } from './EvaluateRoles.js';

export function EvaluatePerson(thisPerson) {
	thisPerson.Age++;
	
	if(thisPerson.Role.length === 0) thisPerson = EvaluateRoles(thisPerson);
	if(thisPerson.Age >= 18) thisPerson = EvaluateGoals(thisPerson);

	// thisPerson.Role.forEach(role => {
	// 	if(role.Owner) console.log('OWNER', thisPerson);
	// });
	
	return thisPerson;
}

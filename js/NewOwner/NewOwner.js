export function NewOwner(preferredOwnerAttributes, People, itemToOwn) {
	// let potentialOwners = {};

	// preferredOwnerAttributes.forEach(attribute => {
	// 	let thisSortedMoneyList = People.filter(thisPerson => itemToOwn.Cost < thisPerson.Money);

	// 	let thisSortedAttributeList = thisSortedMoneyList.sort((a, b) => b.Attributes[attribute] - a.Attributes[attribute]);
	// 	console.log(potentialOwners);
	// 	potentialOwners[attribute] = [];
	// 	console.log(potentialOwners);

	// 	potentialOwners[attribute].push(thisSortedAttributeList);

	// });

	let potentialOwners = People.filter(person => person.Money >= itemToOwn.Cost);

	let preferredOwners = {};

	preferredOwnerAttributes.forEach(attribute => {
		const sortedAttribute = potentialOwners.sort((a, b) => b.Attributes[attribute] - a.Attributes[attribute]);

		preferredOwners[attribute] = sortedAttribute;

		// console.log('BWOAHH', preferredOwners[attribute]);
	});

	let finalOwnerList = [];

	Object.keys(preferredOwners).forEach(attribute => {
		// console.log('BWOAH', attribute, preferredOwners[attribute]);

		const sortedOwners = preferredOwners[attribute];

		sortedOwners.forEach((owner, index) => {
			if(!finalOwnerList.find(thisOwner => thisOwner.obj.Name === owner.Name)) finalOwnerList.push({ indexNumber: 0, obj: owner});
		
			finalOwnerList.forEach(thisOwner => {
				// console.log('here');
				if(thisOwner.obj.Name === owner.Name) {
					// console.log('found');
					thisOwner.indexNumber += index;
				}
			});
		});
	});

	// console.log('final', itemToOwn, finalOwnerList);
	
	// const potentialOwnersKey = Object.keys(potentialOwners);
	
	// potentialOwnersKey.forEach(key => {
	// 	potentialOwners[key].forEach(owners => {
	// 		owners.forEach((thisOwner, thisOwnerIndex) => {
	// 			let thisFinalOwner = finalOwnerList.find(finalOwner => finalOwner.Person.Name === thisOwner.Name);

	// 			if(!thisFinalOwner) finalOwnerList.push({Person: thisOwner, AttributeNumber: thisOwnerIndex});
	// 			else thisFinalOwner.AttributeNumber += thisOwnerIndex;
	// 		});
	// 	});
	// });

	// finalOwnerList.sort((a, b) => a.AttributeNumber - b.AttributeNumber);
	// console.log(finalOwnerList);

	People.forEach(thisPerson => {
		if(finalOwnerList.length > 0 && thisPerson.Name === finalOwnerList[0].obj.Name) {
			// console.log('1', thisPerson.Money);
			// console.log('Money', thisPerson.Money, itemToOwn.Cost);
			// thisPerson.Money -= itemToOwn.Cost;
			// console.log('2', thisPerson.Money);
		}
	});

	if(!finalOwnerList[0]) {
		console.log('NO OWNER, NO MONEY LIKELY');
		return undefined;
	}
	else {
		let thisPerson = People.find(thisPerson => thisPerson.Name === finalOwnerList[0].obj.Name);
		return thisPerson;
		// People.find(thisPerson => thisPerson.Name === finalOwnerList[0].obj.Name).Role.push(itemToOwn);
		// return 
	}

}

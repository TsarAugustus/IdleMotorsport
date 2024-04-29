export function NewOwner(preferredOwnerAttributes, People, itemToOwn) {
	let potentialOwners = {};

	preferredOwnerAttributes.forEach(attribute => {
		let thisSortedMoneyList = People.filter(thisPerson => itemToOwn.Cost < thisPerson.Money);

		let thisSortedAttributeList = thisSortedMoneyList.sort((a, b) => b.Attributes[attribute] - a.Attributes[attribute]);

		potentialOwners[attribute] = [];

		potentialOwners[attribute].push(thisSortedAttributeList);

	});

	// console.log(potentialOwners);

	const potentialOwnersKey = Object.keys(potentialOwners);

	let finalOwnerList = [];
	
	potentialOwnersKey.forEach(key => {
		potentialOwners[key].forEach(owners => {
			owners.forEach((thisOwner, thisOwnerIndex) => {
				let thisFinalOwner = finalOwnerList.find(finalOwner => finalOwner.Person.Name === thisOwner.Name);

				if(!thisFinalOwner) finalOwnerList.push({Person: thisOwner, AttributeNumber: thisOwnerIndex});
				else thisFinalOwner.AttributeNumber += thisOwnerIndex;
			});
		});
	});

	finalOwnerList.sort((a, b) => a.AttributeNumber - b.AttributeNumber);

	People.forEach(thisPerson => {
		if(finalOwnerList.length > 0 && thisPerson.Name === finalOwnerList[0].Person.Name) {
			// console.log('1', thisPerson.Money);
			// console.log('Money', thisPerson.Money, itemToOwn.Cost);
			thisPerson.Money -= itemToOwn.Cost;
			// console.log('2', thisPerson.Money);
		}
	});

	if(!finalOwnerList[0]) {
		console.log('NO OWNER, NO MONEY LIKELY');
		return undefined;
	}
	else {
		People.find(thisPerson => thisPerson.Name === finalOwnerList[0].Person.Name).Role.push(itemToOwn);
		return People.find(thisPerson => thisPerson.Name === finalOwnerList[0].Person.Name);
	}

}

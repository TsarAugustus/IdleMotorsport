import { firstNames, lastNames } from '../data/names.js';
import { Team, Tire } from '../data/affix.js';

export function createManufacturer(manufacturerType) {
	//DEV
	let owners;
	
	if(owners === undefined) {
		const numberOfOwners = Math.floor(Math.random() * 10);
		owners = [];
		for(let i = 0; i < numberOfOwners; i++) {
			owners.push(createOwner());
		}

		if(owners.length === 0) owners.push(createOwner());
	}
	
	const name = createManufacturerName(owners, manufacturerType);
	const manufacturerBusinessStructure = applyBusinessStructure();
	
	let manufacturer = {
		name: name,
		structure: manufacturerBusinessStructure,
		owners: owners
	};

	return manufacturer;
}

function applyBusinessStructure() {
	const types = [{
		name: 'Association',
		abbreviation: 'Assoc'
	}, {
		name: 'Brothers',
		abbreviation: 'Bros'
	}, {
		name: 'Compagnie',
		abbreviation: 'Cie'
	}, {
		name: 'Company',
		abbreviation: 'Co'
	}, {
		name: 'Corporation',
		abbreviation: 'Corp'
	}, {
		name: 'Corporation',
		abbreviation: 'Corp'
	}, {
		name: 'Incorporation',
		abbreviation: 'Inc'
	}, {
		name: 'Limited',
		abbreviation: 'Ltd'
	}, {
		name: 'Manufacturing',
		abbreviation: 'Mfg'
	}, {
		name: 'Manufacturers',
		abbreviation: 'Mfrs'
	}];

	return types[Math.floor(Math.random() * types.length)];
}

function createManufacturerName(owners, manufacturerType) {
	let name = '';

	if(manufacturerType === 'Team') {
		name = createTeam(owners);
	}
	else if (manufacturerType === 'Tire') {
		name = createTireManufacturer(owners);
	}

	return name;
}

function createTireManufacturer(owners) {
	let name = '';

	if(owners.length < 4 && owners.length > 1) {
		for(let i=0; i<owners.length; i++) {
			name += `${owners[i].name.first.charAt(0)}`;
		}
		
		name += ` ${Tire.suffix[Math.floor(Math.random() * Tire.suffix.length)]}`;
	} 
	else {
		// let randomNumber = Math.floor(Math.random() * 2);
		let randomNumber = 1;

		if(randomNumber === 0) {
			name += `${Team.prefix[Math.floor(Math.random() * Team.prefix.length)]} ${owners[Math.floor(Math.random() * owners.length)].name.last}`;
		} 
		else if (randomNumber === 1) {
			const ownerWithMostPrestige = owners.sort((a, b) => a.prestige - b.prestige);
			name += `${ownerWithMostPrestige[0].name.last} ${Tire.suffix[Math.floor(Math.random() * Tire.suffix.length)]}`;
		}
	}

	return name;
}

function createTeam(owners) {
	let name = '';
	if(owners.length < 4 && owners.length > 1) {
		for(let i=0; i<owners.length; i++) {
			name += `${owners[i].name.first.charAt(0)}`;
		}
		
		name += ` ${Team.suffix[Math.floor(Math.random() * Team.suffix.length)]}`;
	} else {
		let randomNumber = Math.floor(Math.random() * 2);

		if(randomNumber === 0) {
			name += `${Team.prefix[Math.floor(Math.random() * Team.prefix.length)]} ${owners[Math.floor(Math.random() * owners.length)].name.last}`;
		} 
		else if (randomNumber === 1) {
			const ownerWithMostPrestige = owners.sort((a, b) => a.prestige - b.prestige);
			name += `${ownerWithMostPrestige[0].name.last} ${Team.suffix[Math.floor(Math.random() * Team.suffix.length)]}`;
		}
	}

	return name;
}


function createOwner() {
	let owner = {
		name: createOwnerName(),
		prestige: Math.floor(Math.random() * 10)
	};

	return owner;
}

function createOwnerName() {
	let name = {
		first: '',
		last: ''
	};

	name.first = firstNames[Math.floor(Math.random() * firstNames.length)];
	name.last = lastNames[Math.floor(Math.random() * lastNames.length)];

	return name;
}

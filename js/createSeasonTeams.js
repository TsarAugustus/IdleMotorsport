import { settings } from './settings.js';
import { Team } from './Team.js';
import { buyStaffForTeam } from './buyStaffForTeam.js';
import { getRandomNumber } from './getRandomNumber.js';

let teamNames = [
	'Abarth',
	'AC',
	'Acura',
	'AIXAM',
	'Alfa Romeo',
	'Alpine',
	'Arash',
	'Ariel',
	'Artega',
	'Ascari',
	'Aston Martin',
	'Audi',
	'AvtoVAZ',
	'BAIC',
	'Bentley',
	'BMW',
	'Borgward',
	'Brilliance',
	'Bristol',
	'Bufori',
	'Bugatti',
	'Buick',
	'Byton',
	'Cadillac',
	'Caterham',
	'Changan',
	'Changhe',
	'Chery',
	'Chevrolet',
	'Chrysler',
	'Citroen',
	'Coda',
	'CT&T',
	'Dacia',
	'Daewoo',
	'DAF',
	'Daihatsu',
	'Datsun',
	'Dodge',
	'Donkervoort',
	'DS',
	'Ferrari',
	'Fiat',
	'Fisker',
	'Force Motors',
	'Ford',
	'Foton',
	'GAZ',
	'Geely',
	'Genesis',
	'Ginetta',
	'GMC',
	'Great Wall',
	'Haima',
	'Hino',
	'Holden',
	'Honda',
	'Hyundai',
	'Iconic',
	'Infiniti',
	'Isuzu',
	'JAC',
	'Jaguar',
	'Jeep',
	'JMC',
	'Kia',
	'Koenigsegg',
	'Lamborghini',
	'Lancia',
	'Land Rover',
	'Landwind',
	'Lexus',
	'Lifan',
	'Lincoln',
	'Lotus',
	'Luxgen',
	'Magna Steyr',
	'Mahindra',
	'Maserati',
	'Maxus',
	'Maybach',
	'Mazda',
	'Mazzanti',
	'McLaren',
	'Mercedes-Benz',
	'MG',
	'Mini',
	'Mitsubishi',
	'Mitsuoka',
	'Morgan',
	'Morris',
	'NIO',
	'Nissan',
	'Noble',
	'Opel',
	'Pagani',
	'Perodua',
	'Peugeot',
	'Polestar',
	'Pontiac',
	'Porsche',
	'Proton',
	'Ram',
	'Reliant',
	'Renault',
	'Rimac',
	'Rivian',
	'Rolls-Royce',
	'RUF',
	'Saab',
	'Saleen',
	'Saturn',
	'Scion',
	'SEAT',
	'Senova',
	'SIN Cars',
	'Skoda',
	'Smart',
	'Spyker',
	'Ssangyong',
	'Subaru',
	'Suzuki',
	'Tata',
	'Tatra',
	'Tesla',
	'Toyota',
	'Trumpchi',
	'TVR',
	'Vauxhall',
	'Volkswagen',
	'Volvo',
	'W Motors',
	'Wiesmann',
	'Zenos',
	'Zenvo',
	'Acer',
	'Alta',
	'Arrows',
	'Asiatech',
	'ATS',
	'BPM',
	'BRM',
	'Butterworth',
	'BWT Mercedes',
	'Castellotti',
	'Climax',
	'Conrero',
	'Cosworth',
	'De Tomaso',
	'EMW',
	'ERA',
	'European',
	'Fondmetal',
	'Gordini',
	'Hart',
	'Ilmor',
	'JAP',
	'Judd',
	'Küchen',
	'Lea-Francis',
	'Life',
	'Matra',
	'Mecachrome',
	'Megatron',
	'Motori Moderni',
	'Mugen-Honda',
	'OSCA',
	'Osella',
	'Petronas',
	'Playlife',
	'Red Bull Powertrains[p]',
	'Repco',
	'Sauber',
	'Scarab',
	'Serenissima',
	'Supertec',
	'TAG',
	'TAG Heuer',
	'Talbot',
	'Tecno',
	'Toro Rosso',
	'Vanwall',
	'Veritas',
	'Weslake',
	'Yamaha',
	'Zakspeed'
];

function createSeasonTeams(driverArray, teamsToGenerate, staff, drivers, season) {
	let potentialTeams = [];
	let teamOwnerPool = [];
	
	for(let i=0; i<teamsToGenerate; i++) {
		//Temporary
		let name = teamNames[Math.floor(Math.random() * teamNames.length)] ? teamNames[Math.floor(Math.random() * teamNames.length)] : `Team ${i}-${season.name}`;
		let team = new Team(name);
		// console.log(team);
		teamNames = teamNames.filter(item => item !== name);

		let potentialOwner = { funds: 0 };

		teamOwnerPool = staff.filter(member => { 
			let memberToReturn = {};
			if(!member.team && member.teamsOwned.length === 0) memberToReturn = member;
			return memberToReturn;
		});

		if(teamOwnerPool.length > 0) potentialOwner = teamOwnerPool[Math.floor(Math.random() * teamOwnerPool.length)];
		const potentialDrivers = [];
		let ownerFunds = potentialOwner.funds;

		driverArray.forEach(driver => {
			if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team.name) {
				potentialDrivers.push(driver);
				ownerFunds -= driver.cost;
			}
		});
        
		for(const driver of potentialDrivers) {
			const contractCost = driver.cost;

			team.owner = potentialOwner;
			driver.team = team;
			team.drivers.push(driver);
			potentialOwner.funds -= contractCost;
			driver.funds += contractCost;
			driver.contractLength = getRandomNumber(1, 10);
		}

		if(team.drivers.length > 0) potentialTeams.push(team);

		staff.forEach((thisStaff, index) => {
			if(team.owner.name === thisStaff.name) {
				staff[index].teamsOwned.push(team);
			}
		});
	
		team = buyStaffForTeam(team, staff, drivers, season);
	}

	return potentialTeams;
}

export { createSeasonTeams };
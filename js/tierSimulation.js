// import { attemptTeamConstruction } from './attemptTeamConstruction.js';
// import { stepCircuit } from './stepCircuit.js';

// function activeOrNot(array, bool) { return array.filter(arrayItem => arrayItem.active === bool)};

// function getFacultyTypes(tier) {
//     let types = [];
//     let typesInArray = types.find(item => item === member.type);
    
//     tier.faculty.forEach(member => !typesInArray ? types.push(member.type) : '');

//     return types;
// }

// function tierSimulation(tier, setup) {
//     let ceoArray = tier.faculty.filter(member => member.type === 'CEO');
//     let teamsNeeded = setup.totalTeams - activeOrNot(tier.teams, true).length;
//     let facultyTypes = getFacultyTypes(tier);
    
//     let tierResult = {
//         tier: tier.tier
//     }
    
//     for(let i=0; i<teamsNeeded; i++) activeOrNot(ceoArray, false).forEach(ceo => attemptTeamConstruction(ceo, tier, setup, facultyTypes));
    
//     tierResult.teams = tier.teams.filter(team => team.active === true);
//     tierResult.circuits = tier.circuits;
//     tier.teams.forEach(team => team.drivers.length > 0 ? team.drivers.forEach(driver => !tierResult.drivers ? tierResult.drivers = [] : tierResult.drivers.push(driver)) : '');

//     // tierResult.circuits.forEach(circuit => tierResult.drivers.forEach(driver => !tierResult.result ? tierResult.result = [] : tierResult.result.push(stepCircuit(circuit, driver))));

//     return tierResult;
// }

// export { tierSimulation }
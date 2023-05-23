import { generateGrid } from './generateGrid.js';
import { createChampionshipTiers } from './createChampionshipTiers.js';
import { attemptTeamConstruction } from './attemptTeamConstruction.js';

function generate(paddock, setup, map) {
    let seasonArray = [];
    
    if(!paddock.grid) paddock.grid = generateGrid(paddock, setup, map);
    for(let i=0; i<setup.seasons; i++) seasonArray.push(generateSeason(paddock, map, setup, i));
    
    return seasonArray;
}

function activeOrNot(array, bool) { return array.filter(arrayItem => arrayItem.active === bool)}

function generateSeason(paddock, map, setup, seasonNum) {
    let championshipTiers = createChampionshipTiers(map, setup, paddock);
    let season = {
        name: `Season ${seasonNum + 1}`,
        paddock,
        map,
        championshipTiers
    };

    let result = [];
    championshipTiers.forEach(tier => result.push(tierSimulation(tier, setup)));
    
    console.log('result', result);
    console.log('champTiers', championshipTiers)
        
    return season;
}
    
function tierSimulation(tier, setup) {
    let facultyTypes = getFacultyTypes(tier);
    
    let tierResult = {
        tier: tier.tier
    }
    
    let ceoArray = tier.faculty.filter(member => member.type === 'CEO');

    let teamsNeeded = setup.totalTeams - activeOrNot(tier.teams, true).length;

    for(let i=0; i<teamsNeeded; i++) activeOrNot(ceoArray, false).forEach(ceo => attemptTeamConstruction(ceo, tier, setup, facultyTypes));

    return tierResult;
}

function getFacultyTypes(tier) {
    let types = [];
    let typesInArray = types.find(item => item === member.type);
    
    tier.faculty.forEach(member => !typesInArray ? types.push(member.type) : '');

    return types;
}

export { generate }
import { Team } from './Team.js';
import { settings } from './settings.js';
import { getRandomNumber } from './getRandomNumber.js';

function generateSeason(array, num) {
    let { drivers, teams, vehicles, circuits, staff } = array;
    
    let thisSeason = {
        name: `Season ${num}`,
        drivers: drivers,
        teams: teams,
        vehicles: vehicles,
        circuits: circuits,
        staff: staff,
        circuitResult: [],
        tierResults: []
    }
    
    // Fill Staff ownedTeams array if Staff owns a Team
    let teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
    let initialSeasonGeneration = createSeasonTeams(drivers, teamsToGenerate, thisSeason.staff);
    if(thisSeason.teams.length < teamsToGenerate) { thisSeason.teams = thisSeason.teams.concat(initialSeasonGeneration)}

    let simulatedSeason = simulateSeason(thisSeason);

    for(let circuit of simulatedSeason.circuitResult) {
        let tierResultsCheck = thisSeason.tierResults.filter(result => { return result.rank === circuit.rank });
        let newTier = {
            rank: circuit.rank,
            driverResult: [],
            teamResult: []
        }

        if(tierResultsCheck.length === 0) {
            newTier.driverResult = getTierDriversResults(simulatedSeason.circuitResult);
            newTier.teamResult = getTierTeamResults(simulatedSeason.circuitResult);

            thisSeason.tierResults.push(newTier);
        }
    }    

    // Adds Championship Title to Team
    for(let tierResult of thisSeason.tierResults) {
    }

    // Adds Championship Title to Driver
    for(let tierResult of thisSeason.tierResults) {
        let tierTeamChampion = tierResult.teamResult[0];
        let tierDriverChampion = tierResult.driverResult[0];

        for(let team of thisSeason.teams) {
            if(team.name === tierTeamChampion.name) {
                let teamIndex = thisSeason.teams.indexOf(team);

                let thisTeamChampionship = {
                    season: thisSeason.name,
                    rank: tierResult.rank,
                    result: tierResult
                }

                thisSeason.teams[teamIndex].statistics.titles.push(thisTeamChampionship);
            }
        }

        for(let driver of thisSeason.drivers) {
            if(driver.name === tierDriverChampion.name) {
                let driverIndex = thisSeason.drivers.indexOf(driver);

                // console.log(thisSeason.teams[teamIndex])
                let thisDriverChampionship = {
                    season: thisSeason.name,
                    rank: tierResult.rank,
                    result: tierResult
                };

                thisSeason.drivers[driverIndex].statistics.titles.push(thisDriverChampionship);
            }
        }
    }
    
    return thisSeason;
}

function getTierTeamResults(results) {
    let tierTeamResults = [];

    for(let result of results) {
        for(let driverResult of result.circuitResult) {
            let tierTeamResultsCheck = tierTeamResults.filter(thisResult => { return thisResult.name === driverResult.driver.team.name});

            determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult);
        }
    }

    tierTeamResults.sort((a, b) => {
        return b.points - a.points
    });

    return tierTeamResults;
}

function determineTeamPoints(tierTeamResults, tierTeamResultsCheck, driverResult) {
    if(tierTeamResultsCheck.length === 0) {
        let tierTeam = {
            name: driverResult.driver.team.name,
            points: driverResult.points
        }

        tierTeamResults.push(tierTeam);
    } else {
        tierTeamResults.forEach(thisResult => {
            if(thisResult.name === driverResult.driver.team.name) {
                thisResult.points += driverResult.points
            }
        })
    }

}

function getTierDriversResults(results) {
    let tierDriverResults = [];

    for(let result of results) {
        for(let driverResult of result.circuitResult) {
            let tierDriverResultsCheck = tierDriverResults.filter(thisResult => { return thisResult.name === driverResult.driver.name });
            
            determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult);
        }
    }

    tierDriverResults.sort((a, b) => {
        return b.points - a.points
    });

    return tierDriverResults;
}

function determineDriverPoints(tierDriverResults, tierDriverResultsCheck, driverResult) {
    if(tierDriverResultsCheck.length === 0) {
        let tierDriver = {
            name: driverResult.driver.name,
            points: driverResult.points
        }

        tierDriverResults.push(tierDriver);
    } else {
        tierDriverResults.forEach(thisResult => { 
            if(thisResult.name === driverResult.driver.name) {
                thisResult.points += driverResult.points;
            }
        });
    }
}

let points = {
    1: 10,
    2: 5,
    3: 2,
    4: 1
}

function simulateSeason(season) {
    season.circuits.forEach(circuit => {
        let circuitSimulation = simulateCircuit(circuit, season);

        let result = {
            circuit: circuit,
            rank: circuitSimulation.rank,
            circuitResult: circuitSimulation.circuitResult
        }

        result.circuitResult.sort((a, b) => {
            return b.driverResult - a.driverResult
        });

        result.circuitResult.forEach((thisResult, index) => {
            if(points[index + 1]) thisResult.points += points[index + 1];
        })
        
        if(result.circuitResult.length > 0) season.circuitResult.push(result);
    });

    return season;
}

function simulateCircuit(circuit, season) {
    let eligibleTeams = [];
    let result = {
        circuit: circuit,
        rank: Number,
        circuitResult: []
    };

    circuit.grade.forEach(grade => {
        season.teams.forEach(team => {
            if(team.rank === grade) {
                result.rank = grade;
                eligibleTeams.push(team);
            }
        })
    })

    eligibleTeams.forEach(team => {
        team.drivers.forEach(driver => {
            result.circuitResult.push({
                driver: driver,
                points: 0,
                driverResult: getRandomNumber(0, 10)
            })
        })
    })

    return result;
}

function createSeasonTeams(driverArray, teamsToGenerate, staff) {
    let potentialTeams = [];
    let teamOwnerPool = [];

    for(let i=0; i<teamsToGenerate; i++) {
        let team = new Team(`Team ${i}`);
        let potentialOwner = { funds: 0 };

        teamOwnerPool = staff.filter(member => { 
            let memberToReturn;

            if(member.teamEmployed.length === 0 && member.teamOwned.length === 0) memberToReturn = member;
            return memberToReturn;
        })

        if(teamOwnerPool.length > 0) potentialOwner = teamOwnerPool[Math.floor(Math.random() * teamOwnerPool.length)];
        let potentialDrivers = [];
        let ownerFunds = potentialOwner.funds;


        driverArray.forEach(driver => {
            if(driver.cost <= ownerFunds && potentialDrivers.length < settings.driversPerTeam && !driver.team) {
                potentialDrivers.push(driver);
                ownerFunds -= driver.cost;
            }
        });
        
        for(let driver of potentialDrivers) {
            let contractCost = driver.cost;

            team.owner = potentialOwner;
            driver.team = team;
            team.drivers.push(driver);
            potentialOwner.funds -= contractCost;
            driver.funds += contractCost;
        }

        if(team.drivers.length > 0) potentialTeams.push(team);

        staff.forEach((thisStaff, index) => {
            if(team.owner.name === thisStaff.name) {
                staff[index].teamOwned.push(team);
            }
        });

        team = buyStaffForTeam(team, staff);
    }

    return potentialTeams;
}

function buyStaffForTeam(team, staff) {
    let potentialStaff = [];
    let ownerFunds = team.owner.funds;

    staff.forEach(staffMember => {
        // console.log(staffMember.teamOwned.length + staffMember.teamEmployed.length)
        if(ownerFunds > staffMember.cost && staffMember.teamEmployed.length === 0 && staffMember.teamOwned.length === 0) {
            potentialStaff.push(staffMember);
            ownerFunds -= staffMember.cost;
        }
    });
    
    potentialStaff.forEach(potentialMember => {
        let departmentWithLeastStaff = {};
        team.departments.forEach(department => {
            if(!departmentWithLeastStaff.staff || department.staff.length < departmentWithLeastStaff.staff.length) {
                departmentWithLeastStaff = department;
            }
        })

        team.departments.forEach((department, index) => {
            if(department.name === departmentWithLeastStaff.name) {
                let contractPrice = potentialMember.cost;

                team.owner.funds -= contractPrice;
                potentialMember.funds += contractPrice;
                potentialMember.teamEmployed.push(team);
                team.departments[index].staff.push(potentialMember);
            }
        })
    });


    return team;
}

export { generateSeason }
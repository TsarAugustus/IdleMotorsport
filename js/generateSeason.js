import { Team } from './Team.js';
import { settings } from './settings.js';
import { getRandomNumber } from './getRandomNumber.js';

function generateSeason(array) {
    let { driverArray, teamArray, vehicleArray, circuitArray, staffArray } = array;
    
    let thisSeason = {
        drivers: driverArray,
        teams: teamArray,
        vehicles: vehicleArray,
        circuits: circuitArray,
        staff: staffArray,
        circuitResult: []
    }
    
    // Fill Staff ownedTeams array if Staff owns a Team
    let teamsToGenerate = settings.teamsPerSeason - thisSeason.teams.length;
    thisSeason.teams = createSeasonTeams(driverArray, teamsToGenerate, thisSeason.staff);

    let simulatedSeason = simulateSeason(thisSeason);

    let tierResults = [];
    for(let circuit of simulatedSeason.circuitResult) {
        let tierResultsCheck = tierResults.filter(result => { return result.rank === circuit.rank });
        let newTier = {
            rank: circuit.rank,
            drivers: []
        }

        if(tierResultsCheck.length === 0) {
            newTier.drivers = getTierDriversResults(newTier.rank, thisSeason.drivers, simulatedSeason.circuitResult);

            tierResults.push(newTier);
        }
    }

    return thisSeason;
}

function getTierDriversResults(rank, drivers, results) {
    let tierDriverResults = [];

    for(let result of results) {
        for(let driverResult of result.circuitResult) {
            let tierDriverResultsCheck = tierDriverResults.filter(thisResult => { return thisResult.name === driverResult.driver.name });
            
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
    }

    tierDriverResults.sort((a, b) => {
        return b.points - a.points
    });

    return tierDriverResults;
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
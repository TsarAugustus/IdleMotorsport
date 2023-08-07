import { Departments } from './Departments.js';

function Team(name) {
    let thisTeam = {
        name: name,
        owner: {},
        drivers: [],
        departments: [],
        statistics: {
            wins: [],
            podiums: [],
            fastestLaps: [],
            poles: [],
            titles: [],
            entries: [],
            points: 0
        }
    }

    for(let department of Departments) {
        let teamDepartment = thisTeam.departments.filter(teamDepartment => {
            if(teamDepartment.name === department.name) return true
            else return false
        });

        if(!teamDepartment || teamDepartment.length === 0) {
            let newTeamDepartment = {
                name: department.name,
                head: {},
                staff: []
            }

            thisTeam.departments.push(newTeamDepartment)
        }
    }

    return thisTeam;
}

export { Team }
function Team(name) {
    let thisTeam = {
        name: name,
        drivers: [],
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

    return thisTeam;
}

export { Team }
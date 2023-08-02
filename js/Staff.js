function Staff(name) {
    let thisStaff = {
        name: name,
        team: [],
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

    return thisStaff;
}

export { Staff }
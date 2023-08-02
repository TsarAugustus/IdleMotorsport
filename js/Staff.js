function Staff(name, type) {
    let thisStaff = {
        name: name,
        team: [],
        type: type,
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
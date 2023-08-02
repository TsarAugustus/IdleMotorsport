function Driver(name) {
    let thisDriver = {
        name: name,
        team: [],
        age: 0,
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

    return thisDriver;
}

export { Driver }
function Vehicle(name, team, drivers) {
    let thisVehicle = {
        name: name,
        team: team,
        drivers: drivers,
        statistics: {
            wins: [],
            podiums: [],
            fastestLaps: [],
            poles: [],
            titles: [],
            entries: [],
            points: 0
        },
        specifications: {
            frontSuspension: '',
            rearSuspension: '',
            engine: '',
            engineLayout: '',
            tires: '',
            power: 0,
            weight: 0
        }
    }

    return thisVehicle;
}

export { Vehicle }
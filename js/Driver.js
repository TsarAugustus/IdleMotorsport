import { getRandomNumber } from "./getRandomNumber.js";

function Driver(name) {
    let thisDriver = {
        name: name,
        teamEmployed: [],
        teamOwned: [],
        age: getRandomNumber(16, 16),
        funds: 0,
        cost: getRandomNumber(1, 10),
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
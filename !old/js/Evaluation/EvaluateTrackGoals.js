import { Track } from '../Track/Track.js';
import { TrackList } from '../init.js';

export function EvaluateTrackGoals(thisPerson, goal) {
	let goalStatus = false;
	let iterationCost = 10000;
	let iterationLimit = 10;

	if(goal.ExecutionName === 'Track' && thisPerson.Money >= iterationCost) {
		let potentialTrackList = [];

		for(let i = 0; (thisPerson.Money >= iterationCost && iterationLimit >= i); i++) {
			let thisPotentialTrack = Track(i, [thisPerson]);

			if(thisPotentialTrack.Owner !== undefined) {
				potentialTrackList.push(thisPotentialTrack);
			}

			thisPerson.Money -= iterationCost;
		}

		let bestPotentialTrack = {
			PotentialYears: 0,
			Track: undefined
		};

		potentialTrackList.forEach(track => {
			let thisPersonMoney = thisPerson.Money;
			let totalYears = 0;

			for(let i = 0; thisPersonMoney >= track.CostPerYear.Total; i++) {
				thisPersonMoney -= track.CostPerYear.Total;
				totalYears += 1;
			}

			if(bestPotentialTrack.Track !== undefined && totalYears > bestPotentialTrack.PotentialYears) bestPotentialTrack = { PotentialYears: totalYears, Track: track};
			else if(bestPotentialTrack.Track !== undefined && totalYears === bestPotentialTrack.PotentialYears) {
				if(track.Prestige > bestPotentialTrack.Track.Prestige) {
					bestPotentialTrack = { PotentialYears: totalYears, Track: track};
				}
			} else if(bestPotentialTrack.Track === undefined) bestPotentialTrack = { PotentialYears: totalYears, Track: track};
		});

		if(bestPotentialTrack.Track !== undefined && thisPerson.Money >= bestPotentialTrack.Track.Cost) {
			bestPotentialTrack.Track.Owner = thisPerson;
			thisPerson.Role.push(bestPotentialTrack.Track);
			thisPerson.Money -= bestPotentialTrack.Track.Cost;
			goalStatus = true;
			TrackList.push(bestPotentialTrack.Track);
		}
	}

	return { thisPerson, goalStatus };
}

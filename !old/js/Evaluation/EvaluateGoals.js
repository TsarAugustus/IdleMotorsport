import { Goals } from '../data/Structure/Goals.js';
import { Traits } from '../data/Traits/Traits.js';
import { EvaluateTrackGoals } from './EvaluateTrackGoals.js';
import { EvaluateSeriesGoals } from './EvaluateSeriesGoals.js';
import { EvaluateVehicleGoals } from './EvaluateVehicleGoals.js';
import { EvaluateJoinSeriesGoals } from './EvaluateJoinSeriesGoals.js';

export function EvaluateGoals(thisPerson) {
	let AvailableGoals = Goals.filter(goal => goal.Accepted === false);

	AvailableGoals.forEach(goal => {
		// const thisLikelihood
		if(goal.Type === 'Series') {
			if(goal.ExecutionName === 'JoinSeries') {
				const evaluation = EvaluateJoinSeriesGoals(thisPerson, goal);
				thisPerson = evaluation.thisPerson;
			}

			if(goal.ExecutionName === 'Series') {
				const evaluation = EvaluateSeriesGoals(thisPerson, goal);
				thisPerson = evaluation.thisPerson;

				if(evaluation.goalStatus === true) {
					const goalKeys = Object.keys(goal.Reward);
	
					goalKeys.forEach(reward => {
	
						if(reward === 'Traits') {
							goal.Reward[reward].forEach(item => {
								const thisTrait = Traits[item.Type][item.Name];
								thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
							});
	
						}
	
						if(reward === 'Attributes') {
							goal.Reward[reward].forEach(item => {
								const rewardChance = Math.floor(Math.random() * 100);
								if(item.Chance >= rewardChance) thisPerson.Attributes[item.Name] += item.Amount;
							});
						}
					});
				} else {
					const goalKeys = Object.keys(goal.Penalty);
	
					goalKeys.forEach(penalty => {
						if(penalty === 'Traits') {
							
							goal.Penalty[penalty].forEach(item => {
								const thisTrait = Traits[item.Type][item.Name];
								thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
							});
	
						}
	
						if(penalty === 'Attributes') {
							goal.Penalty[penalty].forEach(item => {
								const penaltyChance = Math.floor(Math.random() * 100);
								if(item.Chance >= penaltyChance) thisPerson.Attributes[item.Name] += item.Amount;
								if(thisPerson.Attributes[item.Name] < 0) thisPerson.Attributes[item.Name] = 0;
							});
						}
					});
				}
			}

		}

		if(goal.Type === 'Track') {
			const evaluation = EvaluateTrackGoals(thisPerson, goal);
			thisPerson = evaluation.thisPerson;

			if(evaluation.goalStatus === true) {
				const goalKeys = Object.keys(goal.Reward);

				goalKeys.forEach(reward => {

					if(reward === 'Traits') {
						goal.Reward[reward].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(reward === 'Attributes') {
						goal.Reward[reward].forEach(item => {
							const rewardChance = Math.floor(Math.random() * 100);
							if(item.Chance >= rewardChance) thisPerson.Attributes[item.Name] += item.Amount;
						});
					}
				});
			} else {
				const goalKeys = Object.keys(goal.Penalty);

				goalKeys.forEach(penalty => {
					if(penalty === 'Traits') {
						
						goal.Penalty[penalty].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(penalty === 'Attributes') {
						goal.Penalty[penalty].forEach(item => {
							const penaltyChance = Math.floor(Math.random() * 100);
							if(item.Chance >= penaltyChance) thisPerson.Attributes[item.Name] += item.Amount;
							if(thisPerson.Attributes[item.Name] < 0) thisPerson.Attributes[item.Name] = 0;
						});
					}
				});
			}
		}

		if(goal.Type === 'Vehicle') {
			const evaluation = EvaluateVehicleGoals(thisPerson, goal);

			thisPerson = evaluation.thisPerson;

			if(evaluation.goalStatus === true) {
				const goalKeys = Object.keys(goal.Reward);

				goalKeys.forEach(reward => {

					if(reward === 'Traits') {
						goal.Reward[reward].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(reward === 'Attributes') {
						goal.Reward[reward].forEach(item => {
							const rewardChance = Math.floor(Math.random() * 100);
							if(item.Chance >= rewardChance) thisPerson.Attributes[item.Name] += item.Amount;
						});
					}
				});
			} else {
				const goalKeys = Object.keys(goal.Penalty);

				goalKeys.forEach(penalty => {
					if(penalty === 'Traits') {
						
						goal.Penalty[penalty].forEach(item => {
							const thisTrait = Traits[item.Type][item.Name];
							thisPerson.Traits.push({Name: item.Name, obj: thisTrait });
						});

					}

					if(penalty === 'Attributes') {
						goal.Penalty[penalty].forEach(item => {
							const penaltyChance = Math.floor(Math.random() * 100);
							if(item.Chance >= penaltyChance) thisPerson.Attributes[item.Name] += item.Amount;
							if(thisPerson.Attributes[item.Name] < 0) thisPerson.Attributes[item.Name] = 0;
						});
					}
				});
			}
		}
	});

	return thisPerson;
}

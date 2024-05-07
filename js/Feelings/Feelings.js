export function Feelings(Person) {
	//Randomize each feeling
	Person.MentalHealth.Feelings.forEach(feeling => {
		feeling.Total = Math.floor(Math.random() * 10);
	});

	Person = determineFeelings(Person);
	Person = determineGoals(Person);


	return Person;
}

function determineGoals(Person) {
	return Person;
}

function determineFeelings(Person) {

	//Determine Feelings Level
	Person.MentalHealth.Feelings.forEach(feeling => {
		if(feeling.Total >= feeling.LevelOne.TotalRequired) feeling.CurrentLevel = 'LevelOne';
		if(feeling.Total >= feeling.LevelTwo.TotalRequired) feeling.CurrentLevel = 'LevelTwo';
		if(feeling.Total >= feeling.LevelThree.TotalRequired) feeling.CurrentLevel = 'LevelThree';
		if(feeling.Total === 0) feeling.CurrentLevel = undefined;

		const thisFeelingLevel = feeling.CurrentLevel;

		if(thisFeelingLevel !== undefined && thisFeelingLevel !== '') {
			const thisFeelingTraits = feeling[thisFeelingLevel].Traits;

			const traitChance = Math.floor(Math.random() * 100);
			if(traitChance >= 50) Person.Traits.push(thisFeelingTraits[Math.floor(Math.random() * thisFeelingTraits.length)]);
		}

		feeling.Combination.forEach(combination => {
			Person.MentalHealth.CombinationFeelings[combination].Total += feeling.Total;

			const thisCombination = Person.MentalHealth.CombinationFeelings[combination];

			if(thisCombination.Total >= thisCombination.LevelOne.TotalRequired) Person.MentalHealth.CombinationFeelings[combination].CurrentLevel = 'LevelOne';
			if(thisCombination.Total >= thisCombination.LevelTwo.TotalRequired) Person.MentalHealth.CombinationFeelings[combination].CurrentLevel = 'LevelTwo';
			if(thisCombination.Total >= thisCombination.LevelThree.TotalRequired) Person.MentalHealth.CombinationFeelings[combination].CurrentLevel = 'LevelThree';
			if(thisCombination.Total === 0) Person.MentalHealth.CombinationFeelings[combination].CurrentLevel = undefined;

			const thisCombinationLevel = Person.MentalHealth.CombinationFeelings[combination].CurrentLevel;

			if(thisCombinationLevel !== undefined && thisCombinationLevel !== '') {
				const thisCombinationTraits = Person.MentalHealth.CombinationFeelings[combination][thisCombinationLevel].Traits;

				const traitChance = Math.floor(Math.random() * 100);
				if(traitChance >= 50) Person.Traits.push(thisCombinationTraits[Math.floor(Math.random() * thisCombinationTraits.length)]);
			}
		});
	});

	Person = determineCurrentFeelings(Person);	

	return Person;
}

function determineCurrentFeelings(Person) {
	//Feelings
	let maxFeelingsArray = [];
	Person.MentalHealth.Feelings.forEach(feeling => {
		if(!maxFeelingsArray.length) maxFeelingsArray.push(feeling);
		else {
			maxFeelingsArray.forEach(thisFeeling => {
				if(feeling.Total === thisFeeling.Total) maxFeelingsArray.push(feeling);
				else if(feeling.Total > thisFeeling.Total) {
					maxFeelingsArray = [];
					maxFeelingsArray.push(feeling);
				}
			});
		}
	});
	const thisFeeling = maxFeelingsArray[Math.floor(Math.random() * maxFeelingsArray.length)];

	Person.MentalHealth.CurrentFeelings.Feelings = thisFeeling[thisFeeling.CurrentLevel].Name;

	//Combination Feelings
	const combinationFeelings = Object.keys(Person.MentalHealth.CombinationFeelings);
	let maxCombinationFeelingsArray = [];

	combinationFeelings.forEach(combination => {
		let thisCombinationFeeling = Person.MentalHealth.CombinationFeelings[combination];

		if(!maxCombinationFeelingsArray.length) maxCombinationFeelingsArray.push(combination);
		else {
			maxCombinationFeelingsArray.forEach(thisMaxCombination => {
				const thisMaxCombinationFeelings = Person.MentalHealth.CombinationFeelings[thisMaxCombination];

				if(thisCombinationFeeling.Total === thisMaxCombinationFeelings.Total) maxCombinationFeelingsArray.push(combination);
				else if(thisCombinationFeeling.Total > thisMaxCombinationFeelings.Total) {
					maxCombinationFeelingsArray = [];
					maxCombinationFeelingsArray.push(combination);
				}
			});
		}
	});

	const thisCombinationFeeling = maxCombinationFeelingsArray[Math.floor(Math.random() * maxCombinationFeelingsArray.length)];
	Person.MentalHealth.CurrentFeelings.CombinationFeelings = thisCombinationFeeling;

	return Person;
}

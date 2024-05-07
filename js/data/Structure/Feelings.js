import { Traits } from '../Traits/Traits.js';

let Feelings = [{
	Total: 0,
	Combination: ['Love', 'Optimism'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Serenity',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Communicative', obj: Traits.Personality.Communicative },
			{ Name: 'Humble', obj: Traits.Personality.Humble },
			{ Name: 'Mindful', obj: Traits.Personality.Mindful },
			{ Name: 'Punctual', obj: Traits.Personality.Punctual },
			{ Name: 'Excited', obj: Traits.Personality.Excited },
			{ Name: 'Flamboyant', obj: Traits.Personality.Flamboyant },
			{ Name: 'Studious', obj: Traits.Personality.Studious }
		]
	},
	LevelTwo: {
		Name: 'Joy',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Calm', obj: Traits.Personality.Calm },
			{ Name: 'Gracious', obj: Traits.Personality.Gracious },
			{ Name: 'Merciful', obj: Traits.Personality.Merciful },
			{ Name: 'Peaceful', obj: Traits.Personality.Peaceful },
			{ Name: 'Tolerant', obj: Traits.Personality.Tolerant },
			{ Name: 'Benevolent', obj: Traits.Personality.Benevolent },
			{ Name: 'Fun-loving', obj: Traits.Personality['Fun-loving'] }
		]
	}, 
	LevelThree: {
		Name: 'Ecstasy',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Diligent', obj: Traits.Personality.Diligent },
			{ Name: 'Generous', obj: Traits.Personality.Generous },
			{ Name: 'Patient', obj: Traits.Personality.Patient },
			{ Name: 'Temperate', obj: Traits.Personality.Temperate },
			{ Name: 'Tranquil', obj: Traits.Personality.Tranquil },
			{ Name: 'Exuberant', obj: Traits.Personality.Exuberant },
			{ Name: 'Industrious', obj: Traits.Personality.Industrious },
			{ Name: 'Serene', obj: Traits.Personality.Serene }
		]
	}
}, {
	Total: 0,
	Combination: ['Love', 'Submission'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Acceptance',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Accepting', obj: Traits.Personality.Accepting },
			{ Name: 'Hopeful', obj: Traits.Personality.Hopeful },
			{ Name: 'Open-minded', obj: Traits.Personality['Open-minded'] },
			{ Name: 'Sympathetic', obj: Traits.Personality.Sympathetic },
			{ Name: 'Cooperative', obj: Traits.Personality.Cooperative },
			{ Name: 'Courteous', obj: Traits.Personality.Courteous }
		]
	},
	LevelTwo: {
		Name: 'Trust',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Fair', obj: Traits.Personality.Fair },
			{ Name: 'Grateful', obj: Traits.Personality.Grateful },
			{ Name: 'Loyal', obj: Traits.Personality.Loyal },
			{ Name: 'Rational', obj: Traits.Personality.Rational },
			{ Name: 'Trusting', obj: Traits.Personality.Trusting },
			{ Name: 'Mellow', obj: Traits.Personality.Mellow },
			{ Name: 'Pleasing', obj: Traits.Personality.Pleasing }
		]
	}, 
	LevelThree: {
		Name: 'Admiration',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Content', obj: Traits.Personality.Content },
			{ Name: 'Faithful', obj: Traits.Personality.Faithful },
			{ Name: 'Just', obj: Traits.Personality.Just },
			{ Name: 'Leader', obj: Traits.Personality.Leader },
			{ Name: 'Noble', obj: Traits.Personality.Noble },
			{ Name: 'Enterprising', obj: Traits.Personality.Enterprising },
			{ Name: 'Visionary', obj: Traits.Personality.Visionary }
		]
	}
}, {
	Total: 0,
	Combination: ['Submission', 'Awe'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Apprehension',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Impatient', obj: Traits.Personality.Impatient },
			{ Name: 'Obedient', obj: Traits.Personality.Obedient },
			{ Name: 'Respectful', obj: Traits.Personality.Respectful },
			{ Name: 'Diplomatic', obj: Traits.Personality.Diplomatic }
		]
	},
	LevelTwo: {
		Name: 'Fear',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Craven', obj: Traits.Personality.Craven },
			{ Name: 'Tactful', obj: Traits.Personality.Tactful },
			{ Name: 'Cautious', obj: Traits.Personality.Cautious },
			{ Name: 'Liberal', obj: Traits.Personality.Liberal }
		]
	}, 
	LevelThree: {
		Name: 'Terror',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Paranoid', obj: Traits.Personality.Paranoid },
			{ Name: 'Cowardly', obj: Traits.Personality.Cowardly },
			{ Name: 'Sensitive', obj: Traits.Personality.Sensitive }
		]
	}
}, {
	Total: 0,
	Combination: ['Awe', 'Disapproval'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Distraction',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Humorous', obj: Traits.Personality.Humorous },
			{ Name: 'Observant', obj: Traits.Personality.Observant },
			{ Name: 'Idealistic', obj: Traits.Personality.Idealistic },
			{ Name: 'Keen', obj: Traits.Personality.Keen },
			{ Name: 'Whimsical', obj: Traits.Personality.Whimsical },
			{ Name: 'Witty', obj: Traits.Personality.Witty }
		]
	},
	LevelTwo: {
		Name: 'Surprise',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Prudent', obj: Traits.Personality.Prudent },
			{ Name: 'Questioning', obj: Traits.Personality.Questioning },
			{ Name: 'Dynamic', obj: Traits.Personality.Dynamic },
			{ Name: 'Intelligent', obj: Traits.Personality.Intelligent },
			{ Name: 'Perceptive', obj: Traits.Personality.Perceptive }
		]
	}, 
	LevelThree: {
		Name: 'Amazement',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Zealous', obj: Traits.Personality.Zealous },
			{ Name: 'Charismatic', obj: Traits.Personality.Charismatic },
			{ Name: 'Clever', obj: Traits.Personality.Clever },
			{ Name: 'Energetic', obj: Traits.Personality.Energetic },
			{ Name: 'Harmonious', obj: Traits.Personality.Harmonious },
			{ Name: 'Smart', obj: Traits.Personality.Smart },
			{ Name: 'Worldly', obj: Traits.Personality.Worldly }
		]
	}
}, {
	Total: 0,
	Combination: ['Disapproval', 'Remorse'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Pensiveness',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Lazy', obj: Traits.Personality.Lazy },
			{ Name: 'Reflective', obj: Traits.Personality.Reflective },
			{ Name: 'Pensive', obj: Traits.Personality.Pensive },
			{ Name: 'Practical', obj: Traits.Personality.Practical }
		]
	},
	LevelTwo: {
		Name: 'Sadness',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Resilient', obj: Traits.Personality.Resilient },
			{ Name: 'Artistic', obj: Traits.Personality.Artistic },
			{ Name: 'Inquisitive', obj: Traits.Personality.Inquisitive }
		]
	}, 
	LevelThree: {
		Name: 'Grief',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Gluttonous', obj: Traits.Personality.Gluttonous },
			{ Name: 'Persevering', obj: Traits.Personality.Persevering },
			{ Name: 'Spiritual', obj: Traits.Personality.Spiritual }
		]
	}
}, {
	Total: 0,
	Combination: ['Remorse', 'Contempt'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Boredom',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Imaginative', obj: Traits.Personality.Imaginative },
			{ Name: 'Objective', obj: Traits.Personality.Objective },
			{ Name: 'Dreamer', obj: Traits.Personality.Dreamer },
			{ Name: 'Plain', obj: Traits.Personality.Plain }
		]
	},
	LevelTwo: {
		Name: 'Disgust',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Arbitrary', obj: Traits.Personality.Arbitrary },
			{ Name: 'Modest', obj: Traits.Personality.Modest },
			{ Name: 'Resourceful', obj: Traits.Personality.Resourceful }
		]
	}, 
	LevelThree: {
		Name: 'Loathing',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Cynical', obj: Traits.Personality.Cynical },
			{ Name: 'Disagreeable', obj: Traits.Personality.Disagreeable },
			{ Name: 'Introverted', obj: Traits.Personality.Introverted },
			{ Name: 'Serious', obj: Traits.Personality.Serious },
			{ Name: 'Simple-minded', obj: Traits.Personality['Simple-minded'] }
		]
	}
}, {
	Total: 0,
	Combination: ['Contempt', 'Aggressiveness'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Annoyance',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Arrogant', obj: Traits.Personality.Arrogant },
			{ Name: 'Creative', obj: Traits.Personality.Creative },
			{ Name: 'Self-reliant', obj: Traits.Personality['Self-reliant'] },
			{ Name: 'Sensible', obj: Traits.Personality.Sensible }
		]
	},
	LevelTwo: {
		Name: 'Anger',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Clamorous', obj: Traits.Personality.Clamorous },
			{ Name: 'Impartial', obj: Traits.Personality.Impartial },
			{ Name: 'Involved', obj: Traits.Personality.Involved }
		]
	}, 
	LevelThree: {
		Name: 'Rage',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Wrathful', obj: Traits.Personality.Wrathful },
			{ Name: 'Judicious', obj: Traits.Personality.Judicious }
		]
	}
}, {
	Total: 0,
	Combination: ['Aggressiveness', 'Optimism'],
	CurrentLevel: '',
	LevelOne: {
		Name: 'Interest',
		TotalRequired: 1,
		Traits: [
			{ Name: 'Adventurous', obj: Traits.Personality.Adventurous },
			{ Name: 'Dutiful', obj: Traits.Personality.Dutiful },
			{ Name: 'Enthusiastic', obj: Traits.Personality.Enthusiastic },
			{ Name: 'Reliable', obj: Traits.Personality.Reliable },
			{ Name: 'Articulate', obj: Traits.Personality.Articulate },
			{ Name: 'Curious', obj: Traits.Personality.Curious }
		]
	},
	LevelTwo: {
		Name: 'Anticipation',
		TotalRequired: 5,
		Traits: [
			{ Name: 'Committed', obj: Traits.Personality.Committed },
			{ Name: 'Determined', obj: Traits.Personality.Determined },
			{ Name: 'Flexible', obj: Traits.Personality.Flexible },
			{ Name: 'Persistent', obj: Traits.Personality.Persistent },
			{ Name: 'Analytical', obj: Traits.Personality.Analytical },
			{ Name: 'Capable', obj: Traits.Personality.Capable }
		]
	}, 
	LevelThree: {
		Name: 'Vigilance',
		TotalRequired: 10,
		Traits: [
			{ Name: 'Accountable', obj: Traits.Personality.Accountable },
			{ Name: 'Dedicated', obj: Traits.Personality.Dedicated },
			{ Name: 'Disciplined', obj: Traits.Personality.Disciplined },
			{ Name: 'Knowledgeable', obj: Traits.Personality.Knowledgeable },
			{ Name: 'Wise', obj: Traits.Personality.Wise },
			{ Name: 'Focused', obj: Traits.Personality.Focused },
			{ Name: 'Stoic', obj: Traits.Personality.Stoic },
			{ Name: 'Valiant', obj: Traits.Personality.Valiant },
			{ Name: 'Vigilant', obj: Traits.Personality.Vigilant }
		]
	}
}];

let CombinationFeelings = {
	Love: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Caring', obj: Traits.Personality.Caring },
				{ Name: 'Considerate', obj: Traits.Personality.Considerate },
				{ Name: 'Empathetic', obj: Traits.Personality.Empathetic },
				{ Name: 'Kind', obj: Traits.Personality.Kind },
				{ Name: 'Sincere', obj: Traits.Personality.Sincere },
				{ Name: 'Kind-hearted', obj: Traits.Personality['Kind-hearted'] }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Conscientious', obj: Traits.Personality.Conscientious },
				{ Name: 'Enduring', obj: Traits.Personality.Enduring },
				{ Name: 'Forgiving', obj: Traits.Personality.Forgiving },
				{ Name: 'Nurturing', obj: Traits.Personality.Nurturing },
				{ Name: 'Accommodating', obj: Traits.Personality.Accommodating },
				{ Name: 'Funny', obj: Traits.Personality.Funny }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Altruistic', obj: Traits.Personality.Altruistic },
				{ Name: 'Discerning', obj: Traits.Personality.Discerning },
				{ Name: 'Loving', obj: Traits.Personality.Loving },
				{ Name: 'Positive', obj: Traits.Personality.Positive },
				{ Name: 'Affectionate', obj: Traits.Personality.Affectionate },
				{ Name: 'Lovable', obj: Traits.Personality.Lovable }
			]
		}
	},
	Submission: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Discreet', obj: Traits.Personality.Discreet },
				{ Name: 'Honest', obj: Traits.Personality.Honest },
				{ Name: 'Supportive', obj: Traits.Personality.Supportive },
				{ Name: 'Dependable', obj: Traits.Personality.Dependable },
				{ Name: 'Relaxed', obj: Traits.Personality.Relaxed },
				{ Name: 'Unbiased', obj: Traits.Personality.Unbiased }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Shy', obj: Traits.Personality.Shy },
				{ Name: 'Understanding', obj: Traits.Personality.Understanding },
				{ Name: 'Appreciative', obj: Traits.Personality.Appreciative },
				{ Name: 'Nonchalant', obj: Traits.Personality.Nonchalant },
				{ Name: 'Reserved', obj: Traits.Personality.Reserved },
				{ Name: 'Unpretentious', obj: Traits.Personality.Unpretentious }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Selfless', obj: Traits.Personality.Selfless },
				{ Name: 'Trustworthy', obj: Traits.Personality.Trustworthy },
				{ Name: 'Nonjudgmental', obj: Traits.Personality.Nonjudgmental },
				{ Name: 'Pitiful', obj: Traits.Personality.Pitiful }
			]
		}
	},
	Awe: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Hard-working', obj: Traits.Personality['Hard-working'] },
				{ Name: 'Balanced', obj: Traits.Personality.Balanced },
				{ Name: 'Friendly', obj: Traits.Personality.Friendly },
				{ Name: 'Insightful', obj: Traits.Personality.Insightful },
				{ Name: 'Passionate', obj: Traits.Personality.Passionate }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Courageous', obj: Traits.Personality.Courageous },
				{ Name: 'Intuitive', obj: Traits.Personality.Intuitive },
				{ Name: 'Virtuous', obj: Traits.Personality.Virtuous },
				{ Name: 'Charming', obj: Traits.Personality.Charming },
				{ Name: 'Innovative', obj: Traits.Personality.Innovative }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Ambitious', obj: Traits.Personality.Ambitious },
				{ Name: 'Brave', obj: Traits.Personality.Brave },
				{ Name: 'Inspiring', obj: Traits.Personality.Inspiring },
				{ Name: 'Bright', obj: Traits.Personality.Bright },
				{ Name: 'Ingenious', obj: Traits.Personality.Ingenious }
			]
		}
	},
	Disapproval: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Independent', obj: Traits.Personality.Independent },
				{ Name: 'Realistic', obj: Traits.Personality.Realistic },
				{ Name: 'Unassuming', obj: Traits.Personality.Unassuming }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Mature', obj: Traits.Personality.Mature },
				{ Name: 'Rebellious', obj: Traits.Personality.Rebellious }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Methodical', obj: Traits.Personality.Methodical },
				{ Name: 'Motivated', obj: Traits.Personality.Motivated },
				{ Name: 'Pioneering', obj: Traits.Personality.Pioneering }
			]
		}
	},
	Remorse: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Quiet', obj: Traits.Personality.Quiet }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Self-critical', obj: Traits.Personality['Self-critical'] }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Timid', obj: Traits.Personality.Timid }
			]
		}
	},
	Contempt: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Greedy', obj: Traits.Personality.Greedy },
				{ Name: 'Frank', obj: Traits.Personality.Frank },
				{ Name: 'Organized', obj: Traits.Personality.Organized }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Logical', obj: Traits.Personality.Logical },
				{ Name: 'Meticulous', obj: Traits.Personality.Meticulous },
				{ Name: 'Pragmatic', obj: Traits.Personality.Pragmatic }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Selfish', obj: Traits.Personality.Selfish },
				{ Name: 'Cold-hearted', obj: Traits.Personality['Cold-hearted'] },
				{ Name: 'Proud', obj: Traits.Personality.Proud },
				{ Name: 'Strategic', obj: Traits.Personality.Strategic }
			]
		}
	},
	Aggressiveness: {
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Adaptable', obj: Traits.Personality.Adaptable },
				{ Name: 'Audacious', obj: Traits.Personality.Audacious },
				{ Name: 'Boisterous', obj: Traits.Personality.Boisterous },
				{ Name: 'Proactive', obj: Traits.Personality.Proactive },
				{ Name: 'Versatile', obj: Traits.Personality.Versatile }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Assertive', obj: Traits.Personality.Assertive },
				{ Name: 'Vengeful', obj: Traits.Personality.Vengeful },
				{ Name: 'Daring', obj: Traits.Personality.Daring },
				{ Name: 'Steadfast', obj: Traits.Personality.Steadfast },
				{ Name: 'Willful', obj: Traits.Personality.Willful }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Deceitful', obj: Traits.Personality.Deceitful },
				{ Name: 'Fearless', obj: Traits.Personality.Fearless },
				{ Name: 'Impulsive', obj: Traits.Personality.Impulsive },
				{ Name: 'Spontaneous', obj: Traits.Personality.Spontaneous },
				{ Name: 'Tenacious', obj: Traits.Personality.Tenacious }
			]
		}
	},
	Optimism: {	
		Total: 0,
		CurrentLevel: '',
		LevelOne: {
			TotalRequired: 10,
			Traits: [
				{ Name: 'Authentic', obj: Traits.Personality.Authentic },
				{ Name: 'Compassionate', obj: Traits.Personality.Compassionate },
				{ Name: 'Encouraging', obj: Traits.Personality.Encouraging },
				{ Name: 'Amiable', obj: Traits.Personality.Amiable },
				{ Name: 'Self-assured', obj: Traits.Personality['Self-assured'] },
				{ Name: 'Simple', obj: Traits.Personality.Simple }
			]
		},
		LevelTwo: {
			TotalRequired: 15,
			Traits: [
				{ Name: 'Charitable', obj: Traits.Personality.Charitable },
				{ Name: 'Principled', obj: Traits.Personality.Principled },
				{ Name: 'Self-confident', obj: Traits.Personality['Self-confident'] },
				{ Name: 'Cheerful', obj: Traits.Personality.Cheerful },
				{ Name: 'Progressive', obj: Traits.Personality.Progressive },
				{ Name: 'Vibrant', obj: Traits.Personality.Vibrant },
				{ Name: 'Warm-hearted', obj: Traits.Personality['Warm-hearted'] }
			]
		},
		LevelThree: {
			TotalRequired: 20,
			Traits: [
				{ Name: 'Confident', obj: Traits.Personality.Confident },
				{ Name: 'Decisive', obj: Traits.Personality.Decisive },
				{ Name: 'Gregarious', obj: Traits.Personality.Gregarious },
				{ Name: 'Optimistic', obj: Traits.Personality.Optimistic },
				{ Name: 'Thoughtful', obj: Traits.Personality.Thoughtful }
			]
		}
	}
};

export {
	Feelings,
	CombinationFeelings
};

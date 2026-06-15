import Technology from "../Models/Technology.js";

export const technologies = {
	gurneyFlap: new Technology({
		id: "gurneyFlap",
		name: "Gurney Flap",
		difficulty: 5,

		influences: {
			frontWing: 10,
			rearWing: 15,
		},
	}),

	canard: new Technology({
		id: "canard",
		name: "Canard",
		difficulty: 10,

		influences: {
			frontWing: 20,
			rearWing: 25,
			gurneyFlap: 10,
		},
	}),

	frontWing: new Technology({
		id: "frontWing",
		name: "Front Wing",
		difficulty: 15,

		influences: {
			groundEffect: 20,
		},
	}),

	rearWing: new Technology({
		id: "rearWing",
		name: "Rear Wing",
		difficulty: 15,

		influences: {
			groundEffect: 20,
		},
	}),

	groundEffect: new Technology({
		id: "groundEffect",
		name: "Ground Effect",
		difficulty: 50,

		influences: {},
	}),
};

import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
	js.configs.recommended,
	prettier,

	{
		languageOptions: {
			globals: {
				console: "readonly",
				document: "readonly",
				setInterval: "readonly",
				clearInterval: "readonly",
			},
		},

		rules: {
			"no-unused-vars": "warn",
			"no-undef": "error",
			eqeqeq: "warn",
			"no-console": "off",
		},
	},
];

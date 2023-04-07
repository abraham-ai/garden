module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		'@typescript-eslint/dot-notation': 'error',
		'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
		indent: ['error', 'tab'],
		'@typescript-eslint/indent': 'off',
		// "quotes": [2, "single", { "avoidEscape": true }],
		// semi: ["error", "never"]
		// "prettier/prettier": ["error", {}, { usePrettierrc: true }]
	},
}

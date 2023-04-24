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
		ecmaFeatures: {
			jsx: true,
		},
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
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'@typescript-eslint/indent': 'off',
		'prettier/prettier': [
			'error',
			{
			  semi: false,
			  singleQuote: true,
			  tabWidth: 2,
			  trailingComma: 'none',
			  bracketSpacing: true,
			  arrowParens: 'avoid',
			  useTabs: true
			},
		],
		// "quotes": [2, "single", { "avoidEscape": true }],
		// semi: ["error", "never"]
		// "prettier/prettier": ["error", {}, { usePrettierrc: true }]
	},
}

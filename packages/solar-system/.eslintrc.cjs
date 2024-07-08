module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'import'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'import/no-restricted-paths': [
			'error',
			{
				zones: [
					// enforce unidirectional codebase:
					{
						target: './src/features',
						from: './src/pages',
					},
					{
						target: [
							'./src/components',
							'./src/hooks',
							'./src/lib',
							'./src/types',
							'./src/utils',
						],
						from: ['./src/features', './src/pages'],
					},
				],
			},
		],
	},
};

module.exports = {
	env: {
		browser: true,
		es2021 : true,
		node   : true
	},
	parserOptions: {
		ecmaVersion: 'latest',
		parser     : '@typescript-eslint/parser',
		sourceType : 'module'
	},
	extends: [
		'plugin:@typescript-eslint/recommended'
	],
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		curly         : ['error', 'multi-or-nest'],
		'comma-dangle': ['error', 'never'],
		indent        : [
			'error',
			'tab',
			{
				VariableDeclarator: 1,
				ObjectExpression  : 'first',
				ArrayExpression   : 'first',
				ImportDeclaration : 'first',
				SwitchCase        : 1,
				ignoredNodes      : ['TemplateLiteral *']
			}
		],
		'no-tabs'        : 'off',
		quotes           : ['error', 'single'],
		semi             : ['error', 'never'],
		'key-spacing'    : ['error', { align: 'colon' }],
		'no-console'     : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger'    : process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-labels'      : 'off',
		'no-multi-spaces': [
			'error',
			{
				exceptions: {
					AssignmentExpression: true,
					ImportDeclaration   : true,
					Property            : true,
					VariableDeclarator  : true
				}
			}
		],
		'space-before-function-paren': [
			'error',
			{
				anonymous : 'never',
				named     : 'always',
				asyncArrow: 'always'
			}
		]
	}
}

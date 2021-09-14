module.exports = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
	],
	rules: {
		// override/add rules settings here, such as:
		'vue/no-unused-vars': 'error',
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 4,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
	},
}

import FindOutMore from '../../components/FindOutMore/index.vue'

export default {
	title: 'Components/Test2',
	component: FindOutMore,
	argTypes: {
		onClick: {},
	},
}

const Template = (args) => ({
	components: { FindOutMore },
	setup() {
		return { args }
	},
	template: `<p>Hello</p>`,
})

export const Test = Template.bind({})
Test.args = {
	label: 'hi',
}

import BaseButton from '../../components/Common/BaseButton.vue'

export default {
	title: 'Components/BaseButton',
	component: BaseButton,
	argTypes: {
		onClick: {},
	},
}

const Template = (args) => ({
	components: { BaseButton },
	setup() {
		return { args }
	},
	template: `
    <base-button v-bind="args">
      <template v-slot:default>
        {{ args.label }}
      </template>
    </base-button>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
	class: 'btn--primary',
	label: 'Primary Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
	class: 'btn--secondary',
	label: 'Secondary Button',
}

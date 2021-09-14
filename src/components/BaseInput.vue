<template>
	<span>
		{{ $attrs }}
		<input
			v-bind="$attrs"
			:value="searchText"
			test="test"
			@input="handleInput"
		/>
	</span>
</template>
<script>
export default {
	inheritAttrs: false,
	props: {
		searchText: {
			type: String,
			default: '',
		},
	},
	emits: ['update:searchText'],
	methods: {
		handleInput(evt) {
			this.$emit('update:searchText', evt.target.value)
		},
	},
}
</script>

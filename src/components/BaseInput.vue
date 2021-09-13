<template>
	<span>
		{{ $attrs }}
		<input v-bind="$attrs" :value="searchText" @input="handleInput" />
	</span>
</template>
<script>
export default {
	inheritAttrs: false,
	props: {
		searchText: String,
	},
	methods: {
		handleInput(evt) {
			ß
			this.$emit('update:searchText', evt.target.value)
		},
	},
}
</script>

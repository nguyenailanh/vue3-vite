<template>
	<button class="btn" @click="$emit('onClick', 'I am a button')">
		<slot />
	</button>
</template>

<script>
export default {
	inheritAttrs: true,
	emits: ['onClick'],
	props: ['test'],
}
</script>
<style lang="scss" src="./base-button.scss"></style>

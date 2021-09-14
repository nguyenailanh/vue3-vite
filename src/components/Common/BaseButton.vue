<template>
	<button class="btn" @click="$emit('onClick', 'I am a button')">
		<slot />
	</button>
</template>

<script>
export default {
	inheritAttrs: true,
	props: ['test'],
	emits: ['onClick'],
}
</script>
<style lang="scss" src="./base-button.scss"></style>

<template>
	<h1
		clas="decoration-clone bg-gradient-to-b from-yellow-400 to-red-500 text-transparent ..."
	>
		{{ msg }}
	</h1>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
	msg: String,
})
</script>

<style scoped>
a {
	color: #42b983;
}
</style>

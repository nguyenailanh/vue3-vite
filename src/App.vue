<template>
	<base-layout>
		<router-view />
	</base-layout>
</template>
<script>
import BaseLayout from './layout/BaseLayout.vue'

export default {
	components: {
		BaseLayout,
	},
}
</script>

<template>
	<div class="wrapper">
		<the-header />
		<main class="page-main">
			<div>
				<slot />
			</div>
		</main>
		<the-footer />
	</div>
</template>
<script>
import TheHeader from '../components/TheHeader/index.vue'
import TheFooter from '../components/TheFooter/index.vue'

export default {
	components: {
		TheHeader,
		TheFooter,
	},
}
</script>

<style scoped>
.page-main {
	height: 3000px;
}
</style>

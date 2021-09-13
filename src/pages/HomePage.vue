<template>
	<div class="home-page">
		<div class="container">
			<div class="row">
				<div class="col">
					<find-out-more></find-out-more>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import FindOutMore from '../components/FindOutMore/index.vue'

export default {
	components: {
		FindOutMore,
	},
	data() {
		return {
			searchText1: 'Hello',
			text: '',
		}
	},
	watch: {
		searchText(val) {
			console.log(val)
			this.text = val
		},
	},
	setup() {
		const store = useStore()

		const fullName = computed(() => {
			return store.getters['user/fullName']
		})

		const firstName = computed({
			set(name) {
				store.dispatch('user/setFirstName', name)
			},
			get() {
				return store.state.user.firstName
			},
		})

		const lastName = computed({
			set(name) {
				store.dispatch('user/setLastName', name)
			},
			get() {
				return store.state.user.lastName
			},
		})

		return { firstName, lastName, fullName }
	},
}
</script>

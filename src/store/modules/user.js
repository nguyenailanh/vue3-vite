export default {
	state: () => ({
		name: 'test',
		firstName: 'Lanh',
		lastName: 'Nguyen',
	}),
	getters: {
		fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
	},
	mutations: {
		setFirstName(state, name) {
			state.firstName = name
		},
		setLastName(state, name) {
			state.lastName = name
		},
	},
	actions: {
		setFirstName({ commit }, name) {
			commit('setFirstName', name)
		},
		setLastName({ commit }, name) {
			commit('setLastName', name)
		},
	},
	namespaced: true,
}

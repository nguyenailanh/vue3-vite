import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'

const routes = [
	{
		path: '/',
		name: 'HomnePage',
		component: HomePage,
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: LoginPage,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

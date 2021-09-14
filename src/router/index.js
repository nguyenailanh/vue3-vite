import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
	{
		path: '/',
		name: 'Homne Page',
		component: HomePage,
	},
	{
		path: '/login',
		name: 'Login Page',
		component: LoginPage,
	},
	{
		path: '/about',
		name: 'About Page',
		component: AboutPage,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router

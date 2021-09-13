import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "./src/scss/apps.scss";
          @import "./src/scss/libs.scss";
          @import "./src/scss/reset.scss";
        `,
			},
		},
	},
})

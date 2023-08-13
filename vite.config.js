import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
    build: {
        lib: {
          entry: 'src/Components/CurrencyInput.vue',
          name: 'VueSimpleCurrency',
          formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['vue'],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
});

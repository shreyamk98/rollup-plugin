import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import kombaiPlugin from './src/plugin'; // Ensure the path is correct

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		//@ts-ignore
		kombaiPlugin(), // Use the custom plugin here
	],
	build: {
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name][extname]',
			},
		},
	},
});

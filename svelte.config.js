import adapter from '@sveltejs/adapter-vercel'; // Ganti adapter-auto ke adapter-vercel
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Sekarang secara eksplisit menggunakan adapter Vercel
		adapter: adapter()
	}
};

export default config;

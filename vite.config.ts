import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// ORIGINAL (preserved, not deleted — disabled by comment):
// export default defineConfig({ plugins: [tailwindcss()], base: './' });
export default defineConfig({
  plugins: [tailwindcss()],
  base: './',
  // ORIGINAL (preserved, not deleted — disabled by comment): build: { rolldownOptions: { onwarn(warning, defaultHandler) {
  build: { rollupOptions: { onwarn(warning, defaultHandler) {
    // This is a client-only Vite app; the React Server Components directive has no runtime role.
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
    defaultHandler(warning);
  } } },
});

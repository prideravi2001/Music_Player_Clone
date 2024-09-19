import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//   }
// })


/**
 * The below code is used for adding the .env properties to the files.
 * https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg
 */
export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
    },
    define: {
      'process.env.RAPID_API_KEY': JSON.stringify(env.RAPID_API_KEY)
    }
  }
})

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import tsconfigPaths from 'vite-tsconfig-paths';
import { port } from '../DevConfig.json';

export default defineConfig({
  plugins: [
    electron({
      entry: ['src/main/main.ts', 'src/main/preload.ts'],
      onstart: (options) => {
        /** Start Electron App */
        options.startup(['.', '--no-sandbox', '--inspect=5858', '--remote-debugging-port=9227']);
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    port,
  },
});

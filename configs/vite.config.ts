/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import { port } from '../DevConfig.json';

export default defineConfig({
  plugins: [
    EnvironmentPlugin('all', { prefix: '' }),
    electron({
      entry: ['src/main/main.ts', 'src/main/preload.ts'],
      onstart: (options) => {
        options.startup(['.', '--inspect=5858', '--remote-debugging-port=9227']);
      },
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    port,
  },
});

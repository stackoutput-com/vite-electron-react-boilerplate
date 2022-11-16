/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';
import { builtinModules } from 'module';
import { port } from '../DevConfig.json';

export default defineConfig({
  base: './',
  root: resolve('./src/renderer'),
  publicDir: resolve('./src/renderer/public'),
  clearScreen: false,
  build: {
    assetsDir: '', // See: https://github.com/electron-vite/electron-vite-vue/issues/287
    outDir: resolve('./app/dist/renderer'),
  },
  plugins: [
    EnvironmentPlugin('all', { prefix: '' }),
    eslintPlugin(),
    electron({
      entry: ['src/main/main.ts', 'src/main/preload.ts'],
      onstart: (options) => {
        options.startup(['.', '--inspect=5858', '--remote-debugging-port=9227']);
      },
      vite: {
        plugins: [
          EnvironmentPlugin('all', { prefix: '' }),
          tsconfigPaths({ projects: [resolve(__dirname, '../tsconfig.json')] }),
        ],
        build: {
          assetsDir: '.',
          outDir: 'app/dist/main',
          rollupOptions: { external: ['electron', ...builtinModules] },
        },
      },
    }),
    react(),
    tsconfigPaths({ projects: [resolve(__dirname, '../tsconfig.json')] }),
  ],
  server: {
    port,
  },
});

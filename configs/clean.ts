import { rmSync } from 'fs';

const clean = ['node_modules', 'dist', 'dist-electron', 'release/build', 'package-lock.json'];

switch (process.argv[2]) {
  case '--clean':
    clean.forEach((dir) => {
      rmSync(dir, { recursive: true, force: true });
    });
    break;
  case '--dist':
    rmSync('dist', { recursive: true, force: true });
    rmSync('dist-electron', { recursive: true, force: true });
    break;
  case '--build':
    rmSync('release/build', { recursive: true, force: true });
    break;
  default:
    // eslint-disable-next-line no-console
    console.log('Empty action received');
}

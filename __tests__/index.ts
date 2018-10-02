import depsCheck from '../src/function';

import { resolve } from 'path';

it('handles good case', () => {
  depsCheck(resolve(__dirname, 'good'));
});

it('handles missing node_modules', () => {
  expect(() => depsCheck(resolve(__dirname, 'noNodeModules'))).toThrow();
});

it('handles old node_modules', () => {
  try {
    depsCheck(resolve(__dirname, 'oldNodeModules'));
    throw new Error('depsCheck did not throw');
  } catch (e) {
    expect(e.mismatch.length).toBe(7);
    expect(e.inYarnLockOnly.length).toBe(7);
    expect(e.inYarnIntegrityOnly.length).toBe(0);
  }
});

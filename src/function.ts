import * as fs from 'fs';
import assign from 'lodash/assign';
import difference from 'lodash/difference';
import * as lockfile from '@yarnpkg/lockfile';
import pkgDir from 'pkg-dir';
import { resolve } from 'path';

function findRootPackageDirectory(): string {
  const thisPkgDir = pkgDir.sync(__dirname);
  if (!thisPkgDir) {
    throw new Error(
      "Should not happen: Failed to find this package's directory"
    );
  }
  let dir = thisPkgDir;
  while (true) {
    const nextDir = resolve(dir, '..', '..');
    const nextDirPkg = resolve(nextDir, 'package.json');
    if (!fs.existsSync(nextDirPkg)) {
      break;
    }
    dir = nextDir;
  }
  return dir;
}

export default function depsCheck(
  rootPkgDir: string = findRootPackageDirectory()
) {
  const yarnIntegrity = JSON.parse(
    fs.readFileSync(
      resolve(rootPkgDir, 'node_modules', '.yarn-integrity'),
      'utf8'
    )
  );
  const yarnIntegrityAllPackages = Object.keys(yarnIntegrity.lockfileEntries);

  const yarnLock = lockfile.parse(
    fs.readFileSync(resolve(rootPkgDir, 'yarn.lock'), 'utf8')
  );
  const yarnLockAllPackages = Object.keys(yarnLock.object);

  const inYarnLockOnly = difference(
    yarnLockAllPackages,
    yarnIntegrityAllPackages
  );
  const inYarnIntegrityOnly = difference(
    yarnIntegrityAllPackages,
    yarnLockAllPackages
  );
  const mismatch = [...inYarnLockOnly, ...inYarnIntegrityOnly];
  if (mismatch.length) {
    const err = new Error(
      'Dependencies check failed. Please run "yarn" to fix.'
    );
    assign(err, {
      inYarnLockOnly,
      inYarnIntegrityOnly,
      mismatch
    });
    throw err;
  }
}

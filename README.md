# yarn-deps-check

Simple module to check that your project's node_modules directory is up-to-date
with your project's `yarn.lock` Yarn lockfile. This module can be used in your
build system to enforce that builds are done with the current versions of your
dependencies. This protects against the case where a developer `git pull`s some
commits including changes to `yarn.lock` and tries to build or run the
application before running `yarn` to update the node_modules directory of
dependencies.

## Usage

- Put it at the top of your build system's javascript (such as a gulpfile):

```
import 'yarn-deps-check';
```

- Or run it as an independent executable from your project's directory:

```
yarn yarn-deps-check
```

- Or import it as a function and call it only when you need to:

```
import depsCheck from 'yarn-deps-check/function';

// ...
if (...) {
  depsCheck();
}
```

# yarn-deps-check

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/yarn-deps-check/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/yarn-deps-check.svg?style=flat)](https://www.npmjs.com/package/yarn-deps-check) [![CircleCI Status](https://circleci.com/gh/Macil/yarn-deps-check.svg?style=shield)](https://circleci.com/gh/Macil/yarn-deps-check)

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

## Types

[TypeScript](https://www.typescriptlang.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.

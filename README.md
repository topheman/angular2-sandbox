angular2-sandbox
================
[![Build Status](https://travis-ci.org/topheman/angular2-sandbox.svg?branch=master)](https://travis-ci.org/topheman/angular2-sandbox)

<img src="https://cdn.rawgit.com/topheman/angular2-sandbox/master/src/assets/images/angular-logo.svg" width="200"><img src="https://cdn.rawgit.com/topheman/angular2-sandbox/master/src/assets/images/rxjs-logo.png" width="200"><img src="https://cdn.rawgit.com/topheman/angular2-sandbox/master/src/assets/images/webpack-logo.png" width="200"><img src="https://cdn.rawgit.com/topheman/angular2-sandbox/master/src/assets/images/TypeScript-logo.svg" width="200">

The goal of this project is to get better at **Angular2**, **TypeScript** and **RxJS**. I have a background on multiple projects with both Angular1 and [React (with Redux)](https://github.com/topheman/react-es6-redux), using Babel / Webpack and other tools.

To bootstrap this project, I've used my own boilerplate [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) that I have adapted from **Babel** / **Eslint** to **TypeScript** / **TSLint**.

This is still a work in progress. At this time, I've released an example of **state management** via [@ngrx/store](https://github.com/ngrx/store) (a redux-like in RxJS), coupled with **RxJS Observable streams** wired to **Angular2 components**. The next step will be to add some network requests involved.

I've kept the development workflow **exactly** the same as [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter)'s (build tasks, deployment ...).

What's in there ?

* Development / Build / Lint tasks
* [TypeScript](https://www.typescriptlang.org/) transpiler
* [TSLint](http://palantir.github.io/tslint/)
* [Angular2](https://angular.io/) / [RxJS](https://github.com/ReactiveX/rxjs) / [@ngrx/store](https://github.com/ngrx/store)
* Sass support
* Ship a version of your site with sourcemaps (see demo)

**[ONLINE DEMO](https://topheman.github.io/angular2-sandbox/)**

###Install

```shell
git clone https://github.com/topheman/angular2-sandbox.git
cd angular2-sandbox
npm install
```

###Run

```shell
npm start
```

Goto [http://localhost:8080](http://localhost:8080)

If you need to access from a remote device (such as a smartphone on the same network), just `LOCALHOST=false npm start` and your site will be accessible via your IP (which will be output on the terminal at launch).

###Build

The `./build` directory is ignored by git, it will contain a `dist` directory which holds the distribution version of your website (the one that you will ship once built ([more infos on topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter/wiki#deploy)).

All the build tasks will create a built version of the project in the `./build/dist` folder, cleaning it before making the build.

* `npm run build`
* `npm run build-prod` optimized / uglified version
* `npm run build-prod-all` will build:
	* production version (optimized / uglified)
	* a debuggable version accessible at `/devtools` shipping all the sourcemaps, to ease sharing transpiled source code

`npm run serve-dist` will serve your `./build/dist` folder at [http://localhost:3000](http://localhost:3000) so that you could test the built version you just made.

###Linter

* **tslint** is running while you're developping, check your console for errors
* you can also launch it via `npm run lint`
* see `tslint.json` for the configuration, inspired by [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter/blob/master/tslint.json)'s

###Customizations

You can customize the behavior of the scripts by specifying environments vars:

* `NODE_ENV` by default at `development`, `NODE_ENV=production` when you `npm run build-prod`
* `LINTER=false` will disable the linter (enabled by default, ex: `LINTER=false npm start`)
* `STATS=true` will write `stats.json` profiling file on disk from webpack at build (disabled by default, ex: `STATS=true npm run build`)
* `FAIL_ON_ERROR=true` will break the build if any errors occurs (useful for CIs such as travis - at `false` in dev-server, at `true` when building)
* `LOCALHOST=false` to access via IP from other devices on the same network (ex: `LOCALHOST=false npm start` - default `true`)
* `DEVTOOLS`: By default at `null`. Used internally by `npm run build-prod-all` (you may not need that if you don't do OSS)

###More

More infos about the workflow on [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) (slight difference: this project uses TypeScript / TSLint over Babel / ESLint 😉).

Copyright 2016 © Christophe Rosset

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.
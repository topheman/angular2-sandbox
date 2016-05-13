import {bootstrap} from '@angular/platform-browser-dynamic';

import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {provideStore} from '@ngrx/store';
import reducers from './store/reducers';

import {enableProdMode} from '@angular/core';

// only import this module for typing - will be removed during TypeScript compilation since not directly used
import ngRxStore = require('@ngrx/store');
import ngRxDevtools = require('@ngrx/devtools');

import App from './containers/App/App.ts';

/* This is how you use the environments variables passed by the webpack.DefinePlugin */

/**
 * The linter can be disabled via LINTER=false env var - show a message in console to inform if it's on or off
 * Won't show in production
 */
/* tslint:disable */
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.LINTER) {
    console.warn('Linter disabled, make sure to run your code against the linter, otherwise, if it fails, your commit will be rejected.');
  }
  else {
    console.info('Linter active, if you meet some problems, you can still run without linter, just set the env var LINTER=false.');
  }
}
else {
  // remove the console.log + set the app in prod mode - in dev mode, angular does extra checks see link bellow
  // https://angular.io/docs/ts/latest/api/core/ApplicationRef-class.html
  enableProdMode();
  if (process.env.DEVTOOLS) {
    console.info('Turn on the "Sources" tab of your devtools to inspect original source code - thanks to sourcemaps!');
  }
}

/**
 * You could setup some mocks for tests
 * Won't show in production
 */
if (process.env.NODE_ENV === 'mock') {
  console.info('MOCK mode');
}

if (process.env.DEVTOOLS && process.env.NODE_ENV !== 'production') {
  console.info(`You're on DEVTOOLS mode, you may have access to tools enhancing developer experience - off to you to choose to disable them in production ...`);
}
/* tslint:enable */

/** This is where the "real code" start */

const providers = [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provideStore(reducers)
];

// Thanks to webpack DefinePlugin, the following will be dropped at transpilation if process.env.DEVTOOLS === false
// any modules required in it won't be part of the bundle
if (process.env.DEVTOOLS) {
  // any module required needs to be typed - yeah, this is TypeScript ;) !
  const {usePreMiddleware, usePostMiddleware} = <typeof ngRxStore>require('@ngrx/store');
  const {instrumentStore} = <typeof ngRxDevtools>require('@ngrx/devtools');
  // this is the logger middleware
  const actionLog: ngRxStore.Middleware = action => { // action is the store which acts like an observable
    return action.do(val => { // .do() is only a side-effect, it doesn't affect the value of the stream itself
      console.group(val.type);
      console.log('will dispatch', val);
    });
  };
  const stateLog: ngRxStore.Middleware = state => {
    return state.do(val => {
      console.log('state after dispatch', val);
      console.groupEnd();
    });
  };
  providers.push(usePreMiddleware(actionLog));
  providers.push(usePostMiddleware(stateLog));

  // this is the devtools part middleware
  providers.push(instrumentStore());
}

bootstrap(App, providers);

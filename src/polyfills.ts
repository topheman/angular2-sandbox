// inspired by https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/polyfills.ts

// ES6+ polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';

// zone.js (execution context management, persisted over async tasks - needed for angular2, can also be used in other frameworks)
require('zone.js/dist/zone');

// Typescript emit helpers polyfill (manages decorators amongst other things)
// turn noEmitHelpers to true in tsconfig.json
// see more at https://github.com/ngParty/ts-helpers
import 'ts-helpers';

if (process.env.NODE_ENV === 'development') {
  Error.stackTraceLimit = Infinity;
  // watch Brian Ford talk at NgConf https://www.youtube.com/watch?v=3IqtmUscE_U
  require('zone.js/dist/long-stack-trace-zone'); // retrieve a evolved, "async" stacktrace
}

/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

// containers
import Home from '../Home/Home.ts';
import ColorInterval from '../ColorInterval/ColorInterval.ts';

// components
import Header from '../../components/Header/Header.ts';
import Footer from '../../components/Footer/Footer.ts';

// only import this module for typing - will be removed during TypeScript compilation since not directly used
import ngRxDevtools = require('@ngrx/devtools');

// default template, without devtools
let template = `
<topheman-header title="Angular2 Sandbox"></topheman-header>
<div class="container">
  <router-outlet></router-outlet>
</div>
<topheman-footer></topheman-footer>`;

if (process.env.DEVTOOLS) {
  /* tslint:disable */
  console.info('ngrx/devtools are active, to hide the panel: ctrl+H, to change position: ctrl+Q - for more infos', 'https://github.com/ngrx/devtools');
  /* tslint:enable */
  template = `
<div>
  <topheman-header title="Angular2 Sandbox"></topheman-header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  <topheman-footer></topheman-footer>
  <ngrx-devtools toggle-command="ctrl-H" position-command="ctrl-Q"></ngrx-devtools>
</div>`;
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None, // no style encapsulation: https://angular.io/docs/js/latest/api/core/ViewEncapsulation-enum.html
  template,
  directives : [
    ROUTER_DIRECTIVES,
    Header,
    Footer
  ].concat((() => {
    // TypeScript doesn't let us prepare an array of directives outside of the Component decorator ... :(
    // Thanks to webpack DefinePlugin, the following will be dropped at transpilation if process.env.DEVTOOLS === false
    // any modules required in it won't be part of the bundle
    if (process.env.DEVTOOLS) {
      /* tslint:disable */ // tslint complaining about variable not being in camelcase or uppercase
      const {Devtools} = <typeof ngRxDevtools>require('@ngrx/devtools'); // this needs to be typed (yeah this is TypeScript! ;) )
      return [Devtools];
      /* tslint:enable */
    }
    return [];
  })())
})
@RouteConfig([
  { path: '/', name: 'Home', component: Home, useAsDefault: true },
  { path: '/color-interval', name: 'ColorInterval', component: ColorInterval },
  { path: '/**', redirectTo: ['Home']}
])
export default class App {
  name = 'Angular2 Sandbox';
  ngOnInit() {
    console.log('App started');
  }
}

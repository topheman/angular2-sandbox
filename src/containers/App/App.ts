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

// default template, without devtools
let template = `
<topheman-header title="Angular2 Sandbox"></topheman-header>
<div class="container">
  <router-outlet></router-outlet>
</div>
<topheman-footer></topheman-footer>`;

// if TypeScript could do conditional imports via require,
// we wouldn't include all those modules in the final bundle ...
import {Devtools} from '@ngrx/devtools';

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
  ].concat(process.env.DEVTOOLS ? [ // TypeScript doesn't let us prepare an array of directives outside of the Component decorator ... :(
    Devtools
  ] : [])
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

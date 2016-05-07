/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

// containers
import Home from '../Home/Home.ts';
import About from '../About/About.ts';
import ColorInterval from '../ColorInterval/ColorInterval.ts';

// components
import Header from '../../components/Header/Header.ts';
import Footer from '../../components/Footer/Footer.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None, // no style encapsulation: https://angular.io/docs/js/latest/api/core/ViewEncapsulation-enum.html
  template: `
  <topheman-header title="Angular2 Sandbox"></topheman-header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  <topheman-footer></topheman-footer>`,
  directives: [ROUTER_DIRECTIVES, Header, Footer]
})
@RouteConfig([
  { path: '/', name: 'Home', component: Home, useAsDefault: true },
  { path: '/about', name: 'About', component: About },
  { path: '/color-interval', name: 'ColorInterval', component: ColorInterval },
  { path: '/**', redirectTo: ['Home']}
])
export default class App {
  name = 'Angular2 Sandbox';
  ngOnInit() {
    console.log('App started');
  }
}

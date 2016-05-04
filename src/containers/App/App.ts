/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import Home from '../Home/Home.ts';
import About from '../About/About.ts';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None, // no style encapsulation: https://angular.io/docs/js/latest/api/core/ViewEncapsulation-enum.html
  template: `
  <header>
    <nav>
      <ul>
        <li>
          <a [routerLink]="['Home']">Home</a>
        </li>
        <li>
          <a [routerLink]="['About']">About</a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-outlet></router-outlet>
  </main>
  <footer>
    Footer
  </footer>`,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'Home', component: Home, useAsDefault: true },
  { path: '/about', name: 'About', component: About },
  { path: '/**', redirectTo: ['Home']}
])
export default class App {
  name = 'Angular2 Sandbox';
  ngOnInit() {
    console.log('App started');
  }
}

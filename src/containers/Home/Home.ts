import {Component} from '@angular/core';

@Component({
  selector: 'home',
  template: require('./Home.html').toString()
})
export default class Home {
  DEVTOOLS = process.env.DEVTOOLS;
}

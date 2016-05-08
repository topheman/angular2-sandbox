import {Component} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'home',
  template: require('./Home.html').toString(),
  directives: [RouterLink]
})
export default class Home {
  DEVTOOLS = process.env.DEVTOOLS;
}

import {Component} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'topheman-footer',
  template: require('./Footer.html').toString()
})
export default class Footer {
  date = new Date();
}

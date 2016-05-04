import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'topheman-header',
  template: require('./Header.html').toString(),
  directives: [RouterLink]
})
export default class Header {
  @Input() title;
  menuCollapsed = true;
}

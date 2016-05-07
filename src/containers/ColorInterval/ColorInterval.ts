import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

import {createItem, clearAll} from '../../store/reducers/colorInterval.ts';
import {generateRandomColorInterval} from '../../utils/index.ts';

@Component({
  selector: 'color-interval',
  template: `
    <form class="form-inline" (submit)="create$.next({color: inputColor.value, interval: inputInterval.value})">
      <div class="form-group">
        <label for="input-color">Color</label>
        <input #inputColor id="input-color" class="form-control" type="text" placeholder="Enter a valid color code"/>
      </div>
      <div class="form-group">
        <label for="input-intervall">Interval</label>
        <input #inputInterval id="input-interval" class="form-control" type="number" placeholder="Enter an interval"/>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
      <button type="button" class="btn btn-primary" (click)="create$.next(generateRandomColorInterval())">Random</button>
      <button type="button" class="btn btn-primary" (click)="clearAll$.next()">Clear All</button>
    </form>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 items-display items-list">
      <table class="table-condensed">
        <thead>
          <tr>
            <th>Color</th>
            <th>Interval</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items | async">
            <td [style.backgroundColor]="item.color">{{item.color}}</td>
            <td>{{item.interval}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 items-display items-log">
      <table class="table-condensed">
        <thead>
          <tr>
            <th>Color</th>
            <th>Interval</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items | async">
            <td [style.backgroundColor]="item.color">{{item.color}}</td>
            <td>{{item.interval}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `
})
export default class ColorInterval {
  private items;
  private create$;
  private clearAll$;
  private generateRandomColorInterval;
  constructor(store: Store<any>) {
    this.generateRandomColorInterval = generateRandomColorInterval;
    this.items = store.select('colorInterval');
    this.create$ = new Subject();
    this.clearAll$ = new Subject();
    const subCreate = this.create$.subscribe(item => store.dispatch(createItem(item)));
    const subClearAll = this.clearAll$.subscribe(item => store.dispatch(clearAll()));
  }
}

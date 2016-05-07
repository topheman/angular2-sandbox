import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/merge';

import {createItem, clearAll, deleteItem} from '../../store/reducers/colorInterval.ts';
import {generateRandomColorInterval} from '../../utils/index.ts';
import {compileTickObservable}  from '../../store/observables/tick.ts';

@Component({
  selector: 'color-interval',
  template: `
<div class="ColorInterval">
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
    <button type="button" class="btn btn-primary pull-right hidden-xs hidden-sm disabled">Pause</button>
    <button type="button" class="btn btn-primary pull-right hidden-xs hidden-sm disabled" [style.marginRight]="'5px'">Restart</button>
  </form>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 items-display items-list">
      <h4>List</h4>
      <table class="table-condensed">
        <thead>
          <tr>
            <th>Color</th>
            <th>Interval</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items | async" [id]="item.id">
            <td [style.backgroundColor]="item.color">{{item.color}}</td>
            <td>{{item.interval}}ms</td>
            <td><span class="glyphicon glyphicon-remove cursor-pointer" aria-hidden="true" (click)="delete$.next({id: item.id})"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 items-display items-log">
      <h4>Log</h4>
      <button type="button" class="btn btn-primary hidden-md hidden-lg disabled">Pause</button>
      <button type="button" class="btn btn-primary hidden-md hidden-lg disabled">Restart</button>
      <ul>
        <li *ngFor="let log of logs">
          [<i>{{log.timer}}ms</i>]
          <span *ngFor="let item of log.items" [style.color]="item.color">{{item.color}}&nbsp;</span>
        </li>
      </ul>
    </div>
  </div>
</div>`
})
export default class ColorInterval {
  private items;
  private create$;
  private delete$;
  private clearAll$;
  private generateRandomColorInterval;
  private tick$;
  private logs = [];
  constructor(store: Store<any>) {
    this.generateRandomColorInterval = generateRandomColorInterval;
    this.items = store.select('colorInterval');
    this.create$ = new Subject();
    this.delete$ = new Subject();
    this.clearAll$ = new Subject();
    this.tick$ = compileTickObservable(this.items);
    const subCreate = this.create$.subscribe(item => store.dispatch(createItem(item)));
    const subDelete = this.delete$.subscribe(item => store.dispatch(deleteItem(item)));
    const subClearAll = this.clearAll$.subscribe(item => store.dispatch(clearAll()));
    const subTick = this.tick$.subscribe(item => {
      this.logs = [item, ...this.logs].slice(0, 15);
    });
  }
}

/* tslint:disable */
console.info('Pause/Restart stream are not yet implemented');
/* tslint:enable */

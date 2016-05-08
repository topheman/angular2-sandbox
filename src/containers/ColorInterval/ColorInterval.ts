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
  <p>The state of the list of items is managed via <a href="https://github.com/ngrx/store" title="@ngrx/store on github">@ngrx/store</a> (a redux-like in RxJS) then shared in real time via <strong>RxJS Observable streams</strong> which are finally wired to <strong>Angular2 components</strong>.</p>
  <p>Just add some colors in the list, they will then appear at the right time in the log. <small>(Interval can't be lesser than 500ms and will be adjusted).</small></p>
  <form class="form-inline" (submit)="create$.next({color: inputColor.value, interval: inputInterval.value})">
    <div class="form-group">
      <label for="input-color">Color</label>
      <input #inputColor id="input-color" class="form-control" type="text" placeholder="Enter a valid color code"/>
    </div>
    <div class="form-group">
      <label for="input-intervall">Interval</label>
      <div class="input-group">
        <input #inputInterval id="input-interval" class="form-control" type="number" placeholder="Enter an interval"/>
        <div class="input-group-addon">ms</div>
      </div>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
    <button type="button" class="btn btn-primary" (click)="create$.next(generateRandomColorInterval())">Random</button>
    <button type="button" class="btn btn-primary" (click)="clearAll$.next()">Clear All</button>
    <button type="button" [class]="'btn btn-primary pull-right hidden-xs hidden-sm' + (itemsPopulated ? '' : ' disabled')" [disabled]="!itemsPopulated" (click)="toggleStartStop()">{{playing ? 'Stop' : 'Restart'}}</button>
  </form>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 items-display items-list" *ngIf="itemsPopulated">
      <h4>List</h4>
      <table class="table-condensed table-responsive">
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
      <button type="button" [class]="'btn btn-primary hidden-md hidden-lg' + (itemsPopulated ? '' : ' disabled')" [disabled]="!itemsPopulated" (click)="toggleStartStop()">{{playing ? 'Stop' : 'Restart'}}</button>
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
  private items; // @ngrx/store containing the items, passed to Observables for realtime logging
  private itemsPopulated: boolean; // true if items store is populated
  private create$; // RxJS Subject connected to the create button - dispatching createItem() action
  private delete$; // RxJS Subject connected to the delete button - dispatching deleteItem({id}) action
  private clearAll$; // RxJS Subject connected to the "Clear All" button - dispatching clearAll() action
  private generateRandomColorInterval: Function;
  private tick$; // Observable combining a timer and items, returns a stream of aggregates
  private logs = [];
  private playing: boolean; // simple boolean to know if the tick$ Observable is started or stoped
  private toggleStartStop: Function;
  constructor(store: Store<any>) {
    this.generateRandomColorInterval = generateRandomColorInterval;
    this.items = store.select('colorInterval');
    this.items.subscribe(items => this.itemsPopulated = items.length > 0);
    this.create$ = new Subject();
    this.delete$ = new Subject();
    this.clearAll$ = new Subject();
    const stop$ = new Subject();
    const start$ = new Subject();
    this.playing = true;
    this.toggleStartStop = () => {
      if (this.playing) {
        this.playing = false;
        return stop$.next(true);
      }
      this.playing = true;
      return start$.next(true);
    };
    this.tick$ = compileTickObservable(this.items, stop$, start$);
    const subCreate = this.create$.subscribe(item => store.dispatch(createItem(item)));
    const subDelete = this.delete$.subscribe(item => store.dispatch(deleteItem(item)));
    const subClearAll = this.clearAll$.subscribe(item => store.dispatch(clearAll()));
    const subTick = this.tick$.subscribe(item => {
      this.logs = [item, ...this.logs].slice(0, 20);
    });
  }
}

import {Observable} from 'rxjs/Rx'; // use this instead of 'rxjs/Observable' to be able to add operators
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/distinct';

import {minInterval} from '../../utils';

const matchItemsIntervalToTimer = (items, time) => {
  return items.reduce((matchedItem, currentItem) => {
    if (time % currentItem.interval === 0) {
      matchedItem.push(currentItem);
    }
    return matchedItem;
  }, []);
};

/**
 *
 * @param {Subject} items$
 * @param {Subject} stop$
 * @param {Subject} start$
 * @returns {Observable<R>}
 */
export const compileTickObservable = (items$, stop$, start$) => {

  /**
   * Observable stream that emits the number of ms passed since it's started at interval of minInterval
   */
  const timer$ = Observable.interval(minInterval)
    .map(val => val * minInterval);

  /**
   * This observable combines both the timer stream and the stream injected from the store (which contains the items)
   * Outputs the items whose interval match the time
   */
  const matchedItems$ = Observable.combineLatest(
    items$,
    timer$,
    (items, timer) => ({items: items, timer: timer}) // mapping for combineLatest as last param
  )
    .takeUntil(stop$) // stop the stream when receiving incoming from the stop$ stream (a click)
    .filter(data => {
      return matchItemsIntervalToTimer(data.items, data.timer).length; // filter the timers without any matches
    })
    .distinct((previousData, nextData) => previousData.timer === nextData.timer) // make sure we dont emit twice the same timer
    .map(data => ({items: matchItemsIntervalToTimer(data.items, data.timer), timer: data.timer })); // only return the matches for this time

  // we return a stream that will start when start$ receives incomming
  return start$
    .startWith({}) // start automatically the stream when incomming data at init
    .switchMapTo(matchedItems$); // simply pass the logic above
};

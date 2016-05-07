import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/merge';

import {minInterval} from '../../utils';

const matchItemsIntervalToTimer = (items, time) => {
  return items.reduce((matchedItem, currentItem) => {
    if (time % currentItem.interval === 0) {
      matchedItem.push(currentItem);
    }
    return matchedItem;
  }, []);
};

export const compileTickObservable = (items$) => {

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
    .filter(data => {
      return matchItemsIntervalToTimer(data.items, data.timer).length; // filter the timers without any matches
    })
    .map(data => ({items: matchItemsIntervalToTimer(data.items, data.timer), timer: data.timer })); // only return the matches for this time

  return matchedItems$;
};

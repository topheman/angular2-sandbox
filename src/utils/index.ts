import colorNames from './colorNames.ts';
import {minInterval} from '../store/models/ColorIntervalItem.ts';

export const generateRandomColorInterval = (interval = minInterval, maxInterval = 5000) => ({
  color: colorNames[Math.floor(Math.random() * (colorNames.length - 1) )],
  interval: (() => {
    const rand = Math.floor(Math.random() * maxInterval);
    return rand - rand % interval || interval;
  })()
});

import colorNames from './colorNames.ts';

export const generateRandomColorInterval = (interval = 500, maxInterval = 5000) => ({
  color: colorNames[Math.floor(Math.random() * (colorNames.length - 1) )],
  interval: (() => {
    const rand = Math.floor(Math.random() * maxInterval);
    return rand - rand % interval || interval;
  })()
});

import colorNames from './colorNames.ts';

const minInterval = 500;
const maxInterval = 5000;

export const generateRandomColor = () => (colorNames[Math.floor(Math.random() * (colorNames.length - 1) )]);

export const normalizeInterval = (interval) => (interval - interval % minInterval || minInterval);

export const generateRandomInterval = () => normalizeInterval(Math.floor(Math.random() * maxInterval));

export const generateRandomColorInterval = () => ({
  color: generateRandomColor(),
  interval: generateRandomInterval()
});

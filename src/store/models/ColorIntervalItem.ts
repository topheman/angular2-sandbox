/* tslint:disable */
const generateId = (): string => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
/* tslint:enable */

export const minInterval = 500;

export default class ColorIntervalItem {
  constructor(public color: string, public interval: number, public id?: string) {
    this.interval = interval - interval % minInterval || minInterval;
    this.id = id || generateId();
  }
}

import {makeAutoObservable, observable} from 'mobx';
import {v4} from 'uuid';

export class Notification {
  toastBuffer = observable.map();
  pointsBuffer = observable.map();
  constructor() {
    makeAutoObservable(this);
  }

  addToPointsBuffer = (pageX, pageY) => {
    const key = v4();
    this.pointsBuffer.set(key, {
      key,
      pageX,
      pageY,
    });
  };

  removeFromPointsBuffer = (key) => {
    this.pointsBuffer.delete(key);
  };

  addToToastBuffer = (title) => {
    const key = v4();
    this.toastBuffer.set(key, {
      key,
      title,
    });
  };

  removeFromToastBuffer = (key) => {
    this.toastBuffer.delete(key);
  };

  get pointsBufferAsArray() {
    return [...this.pointsBuffer.values()];
  }
  get toastBufferAsArray() {
    return [...this.toastBuffer.values()];
  }
}

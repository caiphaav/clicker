import {ignore} from 'mobx-sync';
import {Notification} from './NotificationStore';
import {GameStore} from './GameStore';

class Store {
  constructor() {
    this.notification = new Notification();
    this.game = new GameStore(this);

    /// persist black list
    ignore(this.game, 'store');
  }
}

export const store = new Store();

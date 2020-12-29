import {makeAutoObservable, reaction} from 'mobx';
import {CHARACTERS_DATA} from '@constants';

export class GameStore {
  store = null;
  points = 0;
  level = 1;
  charactersPagerPosition = 0;
  constructor(store) {
    makeAutoObservable(this, {store: false});
    this.store = store;
    reaction(
      () => ({
        points: this.points,
        pointsToTheNextLevel: this.pointsToTheNextLevel,
        level: this.level,
      }),
      ({level, points, pointsToTheNextLevel}) => {
        if (points === pointsToTheNextLevel) {
          switch (level) {
            case CHARACTERS_DATA[1].level: {
              this.store.notification.addToToastBuffer(
                `${CHARACTERS_DATA[1].name} UNLOCKED!`,
              );
              break;
            }
            case CHARACTERS_DATA[2].level: {
              this.store.notification.addToToastBuffer(
                `${CHARACTERS_DATA[2].name} UNLOCKED!`,
              );
              break;
            }
            default:
              break;
          }
        }
      },
    );
  }

  incrementPoints = () => {
    this.points++;
    if (this.points >= this.nextLevelMeasure) {
      this.level++;
      this.store.notification.addToToastBuffer(`Level ${this.level} UP!`);
    }
  };

  setCharactersPagerPosition = (position) => {
    this.charactersPagerPosition = position;
  };

  get pagerDelta() {
    return this.charactersPagerPosition * -1;
  }

  get nextLevelMeasure() {
    return 10 * Math.pow(2, this.level - 1);
  }

  get pointsToTheNextLevel() {
    return this.nextLevelMeasure - this.points;
  }

  get launchTitle() {
    return this.points > 0 ? 'CONTINUE' : 'START GAME';
  }
}

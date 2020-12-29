// polyfill for uuid
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {registerScreens, setDefaultOptions} from '@navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncTrunk} from 'mobx-sync';
import {store} from '@store';

registerScreens();
setDefaultOptions();

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
});

const launchRoot = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'Launch',
          },
        },
      ],
    },
  },
};

Navigation.events().registerAppLaunchedListener(async () => {
  trunk.init().then(() => Navigation.setRoot(launchRoot));
});

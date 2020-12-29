import {Colors} from 'app/styles';
import {Navigation} from 'react-native-navigation';

export const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    layout: {
      backgroundColor: Colors.PRIMARY,
      componentBackgroundColor: Colors.PRIMARY,
      orientation: ['portrait'],
    },
    topBar: {
      visible: false,
    },
  });
};

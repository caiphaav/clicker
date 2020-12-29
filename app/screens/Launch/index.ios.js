import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {useCallbackOne} from 'use-memo-one';
import {Navigation} from 'react-native-navigation';
import {observer} from 'mobx-react';
import {store} from '@store';
import {areEqualStatic} from '@utils';
import {Colors, Typography, Spacing, hdp} from '@styles';

export const Launch = observer(({componentId}) => {
  /// storage values
  const {
    game: {launchTitle},
  } = store;

  /// memoized values
  const onPress = useCallbackOne(
    () =>
      Navigation.push(componentId, {
        component: {
          name: 'Game',
          options: {
            topBar: {
              visible: true,
              title: {
                text: 'Go Back',
                fontSize: hdp(17),
                color: Colors.WHITE,
                fontFamily: 'HanaleiFill-Regular',
              },
              background: {
                color: Colors.PRIMARY,
              },
              backButton: {
                color: Colors.WHITE,
              },
            },
            animations: {
              push: {
                sharedElementTransitions: [
                  {
                    fromId: 'startText',
                    toId: 'pointsText',
                    interpolation: {type: 'spring'},
                  },
                ],
              },
              pop: {
                sharedElementTransitions: [
                  {
                    fromId: 'pointsText',
                    toId: 'startText',
                    interpolation: {type: 'spring'},
                  },
                ],
              },
            },
          },
        },
      }),
    [componentId],
  );

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View nativeID={'startText'}>
          <Animated.Text style={styles.title}>{launchTitle}</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}, areEqualStatic);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: Spacing.DEVICE_WIDTH,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: Spacing.HORIZONTAL_LG,
    ...Spacing.CENTER_PROPS,
  },
  title: {
    ...Typography.FONT_XL,
    color: Colors.WHITE,
    textAlign: 'center',
    fontSize: hdp(56),
  },
});

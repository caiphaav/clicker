import React, {useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useCallbackOne, useMemoOne} from 'use-memo-one';
import {Navigation} from 'react-native-navigation';
import {observer} from 'mobx-react';
import {store} from '@store';
import {areEqualStatic} from '@utils';
import {Colors, Typography, Spacing, hdp} from '@styles';

/// constants
const INITIAL_FONT_SIZE = hdp(56);
const DESTINATION_FONT_SIZE = hdp(64);

export const Launch = observer(({componentId}) => {
  /// storage values
  const {
    game: {launchTitle},
  } = store;

  /// animated values
  const fontSize = useSharedValue(INITIAL_FONT_SIZE);
  const useAnimatedTitleStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
  }));

  /// memoized values
  const titleStyle = useMemoOne(() => [styles.title, useAnimatedTitleStyle], [
    useAnimatedTitleStyle,
  ]);
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
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'HanaleiFill-Regular'
                    : 'hanalei_font',
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
                  },
                ],
              },
              pop: {
                sharedElementTransitions: [
                  {
                    fromId: 'pointsText',
                    toId: 'startText',
                  },
                ],
              },
            },
          },
        },
      }),
    [componentId],
  );

  /// side-effects
  useEffect(() => {
    fontSize.value = withRepeat(
      withTiming(DESTINATION_FONT_SIZE, {duration: 750}),
      null,
      true,
    );
  }, [fontSize.value]);
  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View nativeID={'startText'}>
          <Animated.Text style={titleStyle}>{launchTitle}</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}, areEqualStatic);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: Spacing.HORIZONTAL_LG,
    ...Spacing.CENTER_PROPS,
  },
  title: {
    ...Typography.FONT_XL,
    color: Colors.WHITE,
    fontSize: hdp(56),
  },
});

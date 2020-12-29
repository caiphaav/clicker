import {Text, StyleSheet} from 'react-native';
import React, {memo, useEffect} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';
import {hdp, Spacing, Colors, Typography, wdp} from '@styles';

/// constants
const TOAST_WIDTH = wdp(110);
const OFFSET_X = (TOAST_WIDTH + Spacing.HORIZONTAL_LG * 2) * -1;

export const Toast = memo(({item: {key, title}, removeFromToastBuffer}) => {
  /// animated values
  const translateX = useSharedValue(OFFSET_X);
  const height = useSharedValue(40);
  const useAnimatedToastStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    height: height.value,
  }));

  /// memoized values
  const toastStyle = useMemoOne(() => [styles.toast, useAnimatedToastStyle], [
    useAnimatedToastStyle,
  ]);

  /// side-effects
  useEffect(() => {
    translateX.value = withSequence(
      withSpring(0),
      withDelay(
        750,
        withSpring(OFFSET_X, null, () => {
          height.value = withTiming(0, null, () => {
            runOnJS(removeFromToastBuffer)(key);
          });
        }),
      ),
    );
  }, [height.value, key, removeFromToastBuffer, translateX.value]);
  return (
    <Animated.View style={toastStyle}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  toast: {
    width: TOAST_WIDTH,
    height: hdp(35),
    marginBottom: Spacing.VERTICAL_SM,
    backgroundColor: Colors.PINK_DARK,
    ...Spacing.CENTER_PROPS,
    overflow: 'hidden',
  },
  text: {
    ...Typography.FONT_SM,
    color: Colors.WHITE,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

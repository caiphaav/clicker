import React, {memo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useMemoOne as useMemo} from 'use-memo-one';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {store} from '@store';
import {Colors, hdp, Typography, Spacing} from '@styles';

/// constants
const TIMING_COFIG = {
  duration: 1000,
};

export const Point = memo(({item: {pageX, pageY, key}}) => {
  /// storage values
  const {
    notification: {removeFromPointsBuffer},
  } = store;

  /// animated values
  const top = useSharedValue(pageY);
  const right = useSharedValue(Spacing.DEVICE_WIDTH - pageX);
  const opacity = useSharedValue(1);
  const useAnimatedStyles = useAnimatedStyle(() => ({
    top: top.value,
    right: right.value,
    opacity: opacity.value,
  }));

  /// memoized values
  const style = useMemo(() => [styles.overlay, useAnimatedStyles], [
    useAnimatedStyles,
  ]);
  const destinationOffset = useMemo(() => pageY - hdp(300), [pageY]);

  /// side-effects
  useEffect(() => {
    opacity.value = withTiming(0.1, TIMING_COFIG);
    right.value = withTiming(Spacing.HORIZONTAL_LG * 2, TIMING_COFIG);
    top.value = withTiming(Spacing.HORIZONTAL_LG, TIMING_COFIG, (finished) => {
      if (finished) {
        runOnJS(removeFromPointsBuffer)(key);
      }
    });
  }, [
    destinationOffset,
    top.value,
    opacity.value,
    removeFromPointsBuffer,
    key,
    right.value,
  ]);
  return (
    <Animated.View style={style} pointerEvents="none">
      <Text style={styles.text}>+1</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: hdp(36),
    height: hdp(36),
    borderRadius: hdp(36),
    backgroundColor: Colors.YELLOW,
    //borderRadius: hdp(24),
    ...Spacing.CENTER_PROPS,
  },
  text: {
    ...Typography.FONT_XL_BOLD,
    color: Colors.WHITE,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {Colors, Spacing, hdp, wdp} from '@styles';
import {useCallbackOne, useMemoOne} from 'use-memo-one';
import {store} from '@store';
import {observer} from 'mobx-react';

/// constants
const GLASSES_TOP_INITIAL = hdp(48);
const GLASSES_TOP_DESTINATION = hdp(40);
const TIMING_CONFIG = {
  duration: 50,
};

export const Gringo = observer(() => {
  /// storage values
  const {
    notification: {addToPointsBuffer},
    game: {incrementPoints},
  } = store;

  /// animated values
  const glassesTop = useSharedValue(GLASSES_TOP_INITIAL);
  const useAnimatedGlassesStyle = useAnimatedStyle(() => ({
    top: glassesTop.value,
  }));

  /// memoized values
  const glassesStyle = useMemoOne(
    () => [styles.glasses, useAnimatedGlassesStyle],
    [useAnimatedGlassesStyle],
  );
  const onPress = useCallbackOne(
    ({nativeEvent: {pageX, pageY}}) => {
      glassesTop.value = withSequence(
        withTiming(GLASSES_TOP_DESTINATION, TIMING_CONFIG),
        withTiming(GLASSES_TOP_INITIAL, TIMING_CONFIG),
      );
      addToPointsBuffer(pageX, pageY);
      incrementPoints();
    },
    [addToPointsBuffer, incrementPoints, glassesTop.value],
  );
  return (
    <Pressable onPress={onPress}>
      <Animated.View style={styles.cookie}>
        <Animated.View style={styles.mouth}>
          <View style={styles.lips}>
            <View style={styles.lipsInner} />
          </View>
        </Animated.View>
        <Animated.View style={glassesStyle}>
          <View style={styles.glass}>
            <View style={styles.glassLight} />
          </View>
          <View style={styles.rectangle} />
          <View style={styles.glass}>
            <View style={styles.glassLight} />
          </View>
        </Animated.View>
        <View style={styles.head} />
        <View style={styles.body}>
          <View style={styles.scarf} />
        </View>
        <View style={styles.waist} />
        <View style={styles.legs}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cookie: {
    alignItems: 'center',
  },
  head: {
    marginBottom: -Spacing.VERTICAL_LG,
    width: wdp(96),
    height: hdp(60),
    borderTopStartRadius: wdp(96),
    borderTopEndRadius: wdp(96),
    borderBottomStartRadius: wdp(20),
    borderBottomEndRadius: wdp(20),
    backgroundColor: Colors.PINK,
  },
  body: {
    width: wdp(40),
    height: hdp(222),
    backgroundColor: Colors.BROWN,
    ...Spacing.CENTER_PROPS,
  },
  scarf: {
    width: wdp(40),
    height: hdp(24),
    backgroundColor: Colors.PINK,
  },
  glasses: {
    position: 'absolute',
    top: hdp(56),
    left: 0,
    right: 0,
    zIndex: 1,
    ...Spacing.CENTER_PROPS_ROW,
  },
  glass: {
    width: hdp(48),
    height: hdp(48),
    borderRadius: hdp(48),
    backgroundColor: Colors.BLACK,
    marginHorizontal: Spacing.HORIZONTAL_SM,
  },
  glassLight: {
    width: hdp(24),
    height: hdp(16),
    marginTop: Spacing.VERTICAL_MD,
    marginLeft: Spacing.HORIZONTAL_SM,
    borderTopStartRadius: wdp(24),
    borderTopEndRadius: wdp(24),
    backgroundColor: Colors.WHITE,
    transform: [{rotate: '-45deg'}],
  },
  rectangle: {
    position: 'absolute',
    width: hdp(12),
    height: hdp(12),
    backgroundColor: Colors.BLACK,
  },
  mouth: {
    position: 'absolute',
    top: hdp(90),
    left: 0,
    right: 0,
    zIndex: 3,
    ...Spacing.CENTER_PROPS_ROW,
  },
  lips: {
    width: wdp(20),
    height: hdp(20),
    borderTopLeftRadius: wdp(10),
    borderTopRightRadius: wdp(10),
    borderBottomLeftRadius: wdp(24),
    borderBottomRightRadius: wdp(24),
    backgroundColor: Colors.PINK_DARK,
    ...Spacing.CENTER_PROPS,
  },
  lipsInner: {
    width: wdp(24),
    height: hdp(16),
    borderTopLeftRadius: wdp(10),
    borderTopRightRadius: wdp(10),
    borderBottomLeftRadius: wdp(16),
    borderBottomRightRadius: wdp(16),
    backgroundColor: Colors.BLACK,
  },
  waist: {
    width: wdp(40),
    height: hdp(24),
    borderBottomStartRadius: wdp(100),
    borderBottomEndRadius: wdp(100),
    backgroundColor: Colors.DARK,
    marginBottom: -Spacing.VERTICAL_LG,
    zIndex: 2,
  },
  legs: {
    flexDirection: 'row',
    width: wdp(24),
    justifyContent: 'space-between',
  },
  leg: {
    width: wdp(10),
    height: hdp(48),
    backgroundColor: Colors.SECONDARY,
    borderBottomStartRadius: Spacing.VERTICAL_SM,
    borderBottomEndRadius: Spacing.VERTICAL_SM,
  },
});

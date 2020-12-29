import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useCallbackOne, useMemoOne} from 'use-memo-one';
import {observer} from 'mobx-react';
import {store} from '@store';
import {Colors, Spacing, hdp, wdp} from '@styles';

/// constants
const INITIAL_HEIGHT = wdp(96);
const DESTINATION_HEIGHT = wdp(128);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...Spacing.CENTER_PROPS,
  },
  hairHolder: {
    height: DESTINATION_HEIGHT,
    justifyContent: 'flex-end',
  },
  hair: {
    width: wdp(36),
    height: wdp(96),
    borderTopStartRadius: Spacing.HORIZONTAL_LG,
    borderTopEndRadius: Spacing.HORIZONTAL_LG,
    backgroundColor: Colors.BLACK,
  },
  head: {
    width: wdp(159),
    height: wdp(159),
    borderTopStartRadius: wdp(40),
    borderTopEndRadius: wdp(40),
    backgroundColor: Colors.YELLOW,
    ...Spacing.CENTER_PROPS,
  },
  eye: {
    width: wdp(80),
    height: wdp(100),
    borderRadius: wdp(100),
    backgroundColor: Colors.WHITE,
    ...Spacing.CENTER_PROPS,
  },
  pupil: {
    width: wdp(32),
    height: wdp(36),
    borderRadius: wdp(32),
    backgroundColor: Colors.BLACK,
  },
  neck: {
    width: wdp(192),
    height: wdp(24),
    backgroundColor: Colors.SECONDARY,
    ...Spacing.CENTER_PROPS,
  },
  stubs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    height: Spacing.HORIZONTAL_LG,
  },
  stub: {
    width: Spacing.HORIZONTAL_LG,
    height: Spacing.HORIZONTAL_LG,
    borderRadius: Spacing.HORIZONTAL_LG,
    backgroundColor: Colors.PINK_DARK,
  },
  hips: {
    width: wdp(192),
    height: wdp(80),
    backgroundColor: Colors.BROWN,
    borderBottomStartRadius: hdp(20),
    borderBottomEndRadius: hdp(20),
    ...Spacing.CENTER_PROPS,
  },
  hipsButton: {
    width: Spacing.HORIZONTAL_LG,
    height: Spacing.HORIZONTAL_LG,
    borderRadius: Spacing.HORIZONTAL_LG,
    backgroundColor: Colors.YELLOW,
    marginBottom: Spacing.VERTICAL_LG,
  },
  pressable: {
    ...Spacing.CENTER_PROPS,
  },
});

export const Django = observer(() => {
  /// storage values
  const {
    notification: {addToPointsBuffer},
    game: {incrementPoints},
  } = store;

  /// animated values
  const height = useSharedValue(INITIAL_HEIGHT);
  const translateY = useSharedValue(0);
  const useHairStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));
  const useEyeStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  /// animated events
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetY = translateY.value;
    },
    onActive: ({translationY}, ctx) => {
      translateY.value =
        ctx.offsetY +
        Math.max(
          Math.min(Spacing.VERTICAL_LG, translationY),
          -Spacing.VERTICAL_LG,
        );
    },
    onEnd: () => {
      translateY.value = withSpring(0);
    },
  });
  /// memoized values
  const hairStyle = useMemoOne(() => [styles.hair, useHairStyle], [
    useHairStyle,
  ]);
  const eyeStyle = useMemoOne(() => [styles.eye, useEyeStyle], [useEyeStyle]);
  const onPress = useCallbackOne(
    ({nativeEvent: {pageX, pageY}}) => {
      height.value = withSequence(
        withTiming(DESTINATION_HEIGHT),
        withTiming(INITIAL_HEIGHT),
      );
      addToPointsBuffer(pageX, pageY);
      incrementPoints();
    },
    [addToPointsBuffer, incrementPoints],
  );
  return (
    <Pressable onPress={onPress}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        minDist={Spacing.HORIZONTAL_MD}>
        <Animated.View style={styles.wrapper}>
          <View style={styles.hairHolder}>
            <Animated.View style={hairStyle} />
          </View>
          <View style={styles.head}>
            <Animated.View style={eyeStyle}>
              <View style={styles.pupil} />
            </Animated.View>
          </View>
          <View style={styles.neck}>
            <View style={styles.stubs}>
              <View style={styles.stub} />
              <View style={styles.stub} />
              <View style={styles.stub} />
            </View>
          </View>
          <View style={styles.hips}>
            <View style={styles.hipsButton} />
            <View style={styles.hipsButton} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
});

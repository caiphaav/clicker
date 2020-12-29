import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';
import {observer} from 'mobx-react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {canvas2Polar, polar2Canvas} from 'react-native-redash';
import {useCallbackOne, useMemoOne} from 'use-memo-one';
import {store} from '@store';
import {Colors, Spacing, hdp, wdp} from '@styles';

const styles = StyleSheet.create({
  head: {
    width: wdp(192),
    height: wdp(192),
    borderRadius: wdp(192),
    backgroundColor: Colors.WHITE,
    ...Spacing.CENTER_PROPS,
  },
  face: {
    width: wdp(156),
    height: wdp(156),
    borderTopLeftRadius: wdp(156),
    borderTopRightRadius: wdp(156),
    borderBottomRightRadius: wdp(128),
    borderBottomLeftRadius: wdp(128),
    backgroundColor: Colors.ORANGE,
    marginTop: Spacing.VERTICAL_LG,
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hdp(12),
  },
  eye: {
    width: wdp(36),
    height: wdp(44),
    borderRadius: wdp(36),
    backgroundColor: Colors.WHITE,
    ...Spacing.CENTER_PROPS,
    overflow: 'hidden',
  },
  pupil: {
    position: 'absolute',
    bottom: -Spacing.VERTICAL_SM,
    width: wdp(32),
    height: wdp(36),
    borderRadius: wdp(32),
    backgroundColor: Colors.BLACK,
  },
  mouth: {
    width: wdp(24),
    height: hdp(16),
    borderBottomLeftRadius: wdp(8),
    borderBottomRightRadius: wdp(8),
    alignSelf: 'center',
    marginTop: Spacing.VERTICAL_SM,
    backgroundColor: Colors.BLACK,
  },
});

const TIMING_CONFIG = {duration: 75};
const HEAD_RADIUS = wdp(96);
const HEAD_CENTER_COORD = {x: HEAD_RADIUS, y: HEAD_RADIUS};

export const Albert = observer(() => {
  /// storage values
  const {
    notification: {addToPointsBuffer},
    game: {incrementPoints},
  } = store;

  // animated values
  const theta = useSharedValue(0);
  const scale = useSharedValue(1);
  const deg = useDerivedValue(() =>
    interpolate(theta.value, [-Math.PI, Math.PI], [180, -180]),
  );
  const useHeadStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: deg.value + 'deg'}, {scale: scale.value}],
    };
  });

  /// animated events
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      const {x, y} = polar2Canvas(
        {
          theta: theta.value,
          radius: HEAD_RADIUS,
        },
        HEAD_CENTER_COORD,
      );
      ctx.offsetX = x;
      ctx.offsetY = y;
    },
    onActive: ({translationX, translationY}, ctx) => {
      const x = ctx.offsetX + translationX;
      const y = ctx.offsetY + translationY;
      theta.value = canvas2Polar({x, y}, HEAD_CENTER_COORD).theta;
    },
  });

  /// memoized values
  const onPress = useCallbackOne(
    ({nativeEvent: {pageX, pageY}}) => {
      scale.value = withSequence(
        withTiming(1.1, TIMING_CONFIG),
        withTiming(1, TIMING_CONFIG),
      );
      addToPointsBuffer(pageX, pageY);
      incrementPoints();
    },
    [addToPointsBuffer, incrementPoints, scale.value],
  );
  const headStyle = useMemoOne(() => [styles.head, useHeadStyle], [
    useHeadStyle,
  ]);
  return (
    <Pressable onPress={onPress}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        minDist={Spacing.HORIZONTAL_MD}>
        <Animated.View style={headStyle}>
          <View style={styles.face}>
            <View style={styles.eyes}>
              <View style={styles.eye}>
                <View style={styles.pupil} />
              </View>
              <View style={styles.eye}>
                <View style={styles.pupil} />
              </View>
            </View>
            <View style={styles.mouth} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Pressable>
  );
});

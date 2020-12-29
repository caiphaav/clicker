import React, {memo, useContext, useEffect} from 'react';
import {View, StyleSheet, Button, Platform} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import {useCallbackOne, useMemoOne} from 'use-memo-one';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import {Gringo, AnimatedButton, Albert, Django} from '@atoms';
import {CHARACTERS_DATA} from '@constants';
import {areEqualStatic} from '@utils';
import {store} from '@store';
import {Colors, Typography, Spacing, hdp, wdp} from '@styles';

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    flexDirection: 'row',
    width: Spacing.DEVICE_WIDTH * 3,
    alignItems: 'center',
  },
  page: {
    flex: 1,
    width: Spacing.DEVICE_WIDTH,
    ...Spacing.CENTER_PROPS,
  },
  buttonsHolder: {
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? hdp(20) : 0,
    left: Spacing.HORIZONTAL_LG,
    right: Spacing.HORIZONTAL_LG,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hdp(48),
  },
  button: {
    width: wdp(110),
    height: hdp(48),
    backgroundColor: Colors.PINK_DARK,
    ...Spacing.CENTER_PROPS,
  },
  buttonTitle: {
    ...Typography.FONT_SM,
    color: Colors.WHITE,
  },
});

/// constants
const TIMING_CONFIG = {
  duration: 175,
  easing: Easing.bezier(0.36, 0, 0.66, -0.56),
};

const PagerContext = React.createContext();

const Page = memo((props) => {
  return <View style={styles.page}>{props.children}</View>;
}, areEqualStatic);

const FooterButton = observer(({item, index}) => {
  const delta = useContext(PagerContext);

  /// storage values
  const {
    game: {level, setCharactersPagerPosition, charactersPagerPosition},
  } = store;
  const isAvailable = computed(() => level >= item.level).get();
  const isSelected = computed(() => charactersPagerPosition === index).get();

  /// animated values
  const opacity = useSharedValue(0.5);
  const isSelectedAnimation = useSharedValue(0);
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      isSelectedAnimation.value,
      [0, 1],
      [0xffc91e24, 0xfffcbd6b],
    ),
  );
  const useAnimatedButtonStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    backgroundColor: backgroundColor.value,
  }));

  /// memoized values
  const onPress = useCallbackOne(() => {
    setCharactersPagerPosition(index);
    delta.value = withTiming(index * -1);
  }, [delta.value, index, setCharactersPagerPosition]);
  const animatedButtonStyle = useMemoOne(
    () => [styles.button, useAnimatedButtonStyle, {opacity: 0.35}],
    [useAnimatedButtonStyle],
  );

  /// side-effects
  useEffect(() => {
    opacity.value = isAvailable
      ? withTiming(1, TIMING_CONFIG)
      : withTiming(0.5, TIMING_CONFIG);
  }, [isAvailable, opacity.value]);
  useEffect(() => {
    isSelectedAnimation.value = isSelected
      ? withTiming(1, TIMING_CONFIG)
      : withTiming(0, TIMING_CONFIG);
  }, [isSelected, isSelectedAnimation.value]);
  return (
    <AnimatedButton
      disabled={!isAvailable}
      onPress={onPress}
      title={item.name}
      style={animatedButtonStyle}
      titleStyle={styles.buttonTitle}
    />
  );
});

const PagerFooter = memo((props) => {
  return (
    <View style={styles.buttonsHolder}>
      {CHARACTERS_DATA.map((item, index) => (
        <FooterButton item={item} index={index} key={item.name} />
      ))}
    </View>
  );
}, areEqualStatic);

export const CharactersPager = observer(() => {
  const {
    game: {pagerDelta},
  } = store;
  const delta = useSharedValue(pagerDelta, false);
  const translateX = useDerivedValue(() => delta.value * Spacing.DEVICE_WIDTH);
  const usePagerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  const pagerStyle = useMemoOne(() => [styles.pager, usePagerStyle], [
    usePagerStyle,
  ]);
  return (
    <PagerContext.Provider value={delta}>
      <Animated.View style={pagerStyle}>
        <Page>
          <Gringo />
        </Page>
        <Page>
          <Albert />
        </Page>
        <Page>
          <Django />
        </Page>
      </Animated.View>
      <PagerFooter />
    </PagerContext.Provider>
  );
});

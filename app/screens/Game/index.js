import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {ToastsWidget, PointsWidget, CharactersPager} from '@molecules';
import {Colors, Typography, Spacing, hdp, wdp} from '@styles';
import {areEqualStatic} from '@utils';
import {store} from '@store';
import {ICLevel, ICPoints, ICPointsLeft} from '@assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  title: {
    ...Typography.FONT_XL,
    color: Colors.WHITE,
    fontSize: hdp(64),
    padding: hdp(5),
  },
  pointsHolder: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: Spacing.VERTICAL_LG,
    right: Spacing.HORIZONTAL_LG,
    left: Spacing.HORIZONTAL_LG,
  },
  points: {
    ...Typography.FONT_XL,
    color: Colors.WHITE,
  },
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
  iconHolder: {
    width: wdp(76),
    marginLeft: Spacing.HORIZONTAL_LG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

/// constants
const ICON_SIZE = hdp(32);

const GameInfo = observer(() => {
  const {
    game: {points, pointsToTheNextLevel, level},
  } = store;
  return (
    <View style={styles.pointsHolder}>
      <View style={styles.iconHolder}>
        <ICLevel width={ICON_SIZE} height={ICON_SIZE} />
        <Text style={styles.points}>{level}</Text>
      </View>
      <View style={styles.iconHolder}>
        <ICPointsLeft width={ICON_SIZE} height={ICON_SIZE} />
        <Text style={styles.points}>{pointsToTheNextLevel}</Text>
      </View>
      <View style={styles.iconHolder} nativeID={'pointsText'}>
        <ICPoints width={ICON_SIZE} height={ICON_SIZE} />
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  );
});

export const Game = memo(() => {
  return (
    <View style={styles.screen}>
      <GameInfo />
      <ToastsWidget />
      <CharactersPager />
      <PointsWidget />
    </View>
  );
}, areEqualStatic);

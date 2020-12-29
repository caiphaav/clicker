import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useCallbackOne} from 'use-memo-one';
import {observer} from 'mobx-react';
import {Point} from '@atoms';
import {store} from '@store';
import {Spacing} from 'app/styles';

const styles = StyleSheet.create({
  widget: {
    ...StyleSheet.absoluteFillObject,
    width: Spacing.DEVICE_WIDTH,
    height: 200,
    //zIndex: 2,
  },
  toasts: {
    flex: 1,
  },
});

export const PointsWidget = observer(() => {
  /// storage values
  const {
    notification: {pointsBufferAsArray, removeFromPointsBuffer},
  } = store;

  /// memoized values
  const renderItem = useCallbackOne(
    (item) => (
      <Point
        item={item}
        key={item.key}
        removeFromPointsBuffer={removeFromPointsBuffer}
      />
    ),
    [removeFromPointsBuffer],
  );
  return (
    <View style={styles.widget}>
      <View style={styles.toasts}>{pointsBufferAsArray.map(renderItem)}</View>
    </View>
  );
});

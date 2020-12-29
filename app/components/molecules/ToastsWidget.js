import React from 'react';
import {View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {useCallbackOne} from 'use-memo-one';
import {Toast} from '@atoms';
import {store} from '@store';
import {Spacing} from '@styles';

const styles = StyleSheet.create({
  widget: {
    ...StyleSheet.absoluteFillObject,
    top: Spacing.VERTICAL_LG,
    left: Spacing.HORIZONTAL_LG,
  },
  toasts: {
    flex: 1,
  },
});

export const ToastsWidget = observer(() => {
  /// storage values
  const {
    notification: {toastBufferAsArray, removeFromToastBuffer},
  } = store;

  /// memoized values
  const renderItem = useCallbackOne(
    (item) => (
      <Toast
        item={item}
        key={item.key}
        removeFromToastBuffer={removeFromToastBuffer}
      />
    ),
    [removeFromToastBuffer],
  );
  return (
    <View style={styles.widget}>
      <View style={styles.toasts}>{toastBufferAsArray.map(renderItem)}</View>
    </View>
  );
});

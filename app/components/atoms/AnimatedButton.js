import React, {memo} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
export const AnimatedButton = memo(
  ({title, titleStyle, style, onPress, disabled = false}) => {
    return (
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        <Animated.View style={style}>
          <Animated.Text style={titleStyle}>{title}</Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  },
);

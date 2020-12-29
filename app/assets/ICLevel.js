import {Colors} from 'app/styles';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M0 0h512v512H0z" />
      <Path
        d="M338.8 31.81c-5 19.51-9.9 38.69-14.9 57.64-45.3 7.27-90.5 7.28-135.8 0-5-18.95-9.9-38.13-14.9-57.64 54.9 22.58 110.7 22.58 165.6 0zm17.3 4.59l34.4 45.95c-14 96.25-40 204.15-77.5 302.95-10.7-12.4-25.2-21.3-41.8-24.7 28.3-111.3 56.6-212.3 84.9-324.2zm-200.2 0c28.3 111.9 56.6 212.9 84.9 324.2-16.6 3.4-31.1 12.3-41.8 24.7-37.5-98.8-63.5-206.7-77.5-302.95zM256 377c31.6 0 57 25.4 57 57s-25.4 57-57 57-57-25.4-57-57 25.4-57 57-57z"
        fill={Colors.SECONDARY}
      />
    </Svg>
  );
}

export const ICLevel = React.memo(SvgComponent);

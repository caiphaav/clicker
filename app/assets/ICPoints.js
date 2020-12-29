import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '@styles';

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <Path d="M0 0h512v512H0z" />
      <Path
        d="M322.248 85.684L61.432 224.717l-41.145 109.94 7.233 3.85 153.673 81.8 308.495-164.215-37.752-99.903-129.688-70.506zm119.035 95.187l25.11 66.45-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182 72.195-118.62 36.225-19.175zM72.38 248.78l28.21 14.933-54.012 54.012L72.38 248.78zm210.827 15.767L211.19 382.87l.26.16-17.208 9.16 5.795-83.618 83.17-44.025zm-165.334 8.312l16.963 8.98-60.445 60.445-16.93-9.012 60.413-60.414zM181.42 306.9l-6.174 89.07-54.1-28.798L181.42 306.9z"
        fill={Colors.YELLOW}
      />
    </Svg>
  );
}

export const ICPoints = React.memo(SvgComponent);

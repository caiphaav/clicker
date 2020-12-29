import {wdp, hdp} from './dp';
import {Dimensions} from 'react-native';
import {WHITE} from './colors';
let {width, height} = Dimensions.get('screen');

//spacing with device width
export const HORIZONTAL_SM = wdp(5);
export const HORIZONTAL_MD = wdp(10);
export const HORIZONTAL_LG = wdp(15);
export const BASIC_ICON_WIDTH = wdp(24);

//spacing with device height
export const VERTICAL_SM = hdp(5);
export const VERTICAL_MD = hdp(10);
export const VERTICAL_LG = hdp(15);
export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;

export const CENTER_PROPS = {
  justifyContent: 'center',
  alignItems: 'center',
};
export const CENTER_PROPS_ROW = {
  flexDirection: 'row',
  ...CENTER_PROPS,
};
export const SVG_PROPS = {
  width: wdp(24),
  height: wdp(24),
  fill: WHITE,
};

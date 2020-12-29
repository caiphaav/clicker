import {Platform} from 'react-native';
import {hdp} from './dp';

export const FONT_XL = {
  fontFamily: Platform.OS === 'ios' ? 'HanaleiFill-Regular' : 'hanalei_font',
  fontSize: hdp(20),
};
export const FONT_MD = {
  fontFamily: Platform.OS === 'ios' ? 'HanaleiFill-Regular' : 'hanalei_font',
  fontSize: hdp(14),
};
export const FONT_SM = {
  fontFamily: Platform.OS === 'ios' ? 'HanaleiFill-Regular' : 'hanalei_font',
  fontSize: hdp(13),
};

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on the iPhone X
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const base = (size) => (longDimension / guidelineBaseHeight) * size;
export const wdp = (size) => (shortDimension / guidelineBaseWidth) * size;
export const hdp = (size) => size + (base(size) - size) * 0.01;

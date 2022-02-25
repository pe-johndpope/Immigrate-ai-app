import {Dimensions, PixelRatio} from 'react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 11s's scale
const scalew = SCREEN_WIDTH / 828;
const scaleh = SCREEN_HEIGHT / 1792;

export function nh(size) {
  const newSize = size * scaleh;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function nw(size) {
  const newSize = size * scalew;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
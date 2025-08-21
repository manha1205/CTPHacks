import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of <head> so they load before other styles
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
export const ADD_SWATCH = 'ADD_SWATCH';
export const REMOVE_SWATCH = 'REMOVE_SWATCH';

export function saveSwatch(foreground, background) {
  if (foreground && background) {
    return {
      type: ADD_SWATCH,
      foreground,
      background,
    };
  }
}

export function deleteSwatch(swatch) {
  if (swatch) {
    return {
      type: REMOVE_SWATCH,
      swatch,
    };
  }
}
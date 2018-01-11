export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SET_FOREGROUND = 'SET_FOREGROUND';
export const SWAP_COLORS = 'SWAP_COLORS';

export function setForeground(color = '#000') {
  return {
    type: SET_FOREGROUND,
    color,
  };
}

export function setBackground(color = '#fff') {
  return {
    type: SET_BACKGROUND,
    color,
  };
}

export function swapColors() {
  return {
    type: SWAP_COLORS,
  };
}
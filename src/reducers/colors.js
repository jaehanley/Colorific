import {
  SET_BACKGROUND,
  SET_COLOR_BLIND,
  SET_FOREGROUND,
  SWAP_COLORS,
  SET_CONTROLS_SHOWN,
} from 'actions/colors';

const initialState = {
  background: '#FFFFFF',
  foreground: '#000000',
  blindness: 'common',
  controlsShown: false,
  setting: null,
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BACKGROUND:
      return {
        ...state,
        background: action.color,
      };
    case SET_COLOR_BLIND:
      return {
        ...state,
        blindness: action.blindness,
        setting: action.setting || null,
      };
    case SET_FOREGROUND:
      return {
        ...state,
        foreground: action.color,
      };
    case SWAP_COLORS:
      return {
        ...state,
        background: state.foreground,
        foreground: state.background,
      };
    case SET_CONTROLS_SHOWN:
      return {
        ...state,
        controlsShown: action.shown,
      }
    default:
      return state;
  }
}
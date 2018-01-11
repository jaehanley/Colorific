import {
  SET_BACKGROUND,
  SET_FOREGROUND,
  SWAP_COLORS
} from 'actions/colors';

const initialState = {
  background: '#FFFFFF',
  foreground: '#000000',
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BACKGROUND:
      return {
        ...state,
        background: action.color
      };
    case SET_FOREGROUND:
      return {
        ...state,
        foreground: action.color
      };
    case SWAP_COLORS:
      return {
        ...state,
        background: state.foreground,
        foreground: state.background,
      };
    default:
      return state;
  }
}
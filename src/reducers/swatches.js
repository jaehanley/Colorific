import {
  ADD_SWATCH,
  REMOVE_SWATCH,
} from 'actions/swatches';

const initialState = {
  swatches: [],
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_SWATCH:
      return {
        ...state,
        swatches: [
          ...state.swatches,
          {
            foreground: action.foreground,
            background: action.background,
          }
        ],
      };
    case REMOVE_SWATCH:
      return {
        ...state,
        swatches: state.swatches.filter(swatch => swatch !== action.swatch),
      };
    default:
      return state;
  }
}
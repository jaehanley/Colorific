import {
  createStore,
  compose
} from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from '../reducers';

function applyReduxDevToolsExtension() {
  // eslint-disable-next-line max-len
  if (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    return window.devToolsExtension();
  }
  return function(f) { return f; };
}
const store = createStore(
  rootReducer,
  compose(
    applyReduxDevToolsExtension(),
    offline(offlineConfig)
  )
);

export default store;

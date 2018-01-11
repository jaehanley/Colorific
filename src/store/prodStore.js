import {
  createStore,
  compose
} from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    offline(offlineConfig)
  )
);

export default store;

import React, { Component } from 'react';
import store from 'store/configureStore.js';
import { Provider } from 'react-redux';
import Preview from 'components/preview';
import Controls from 'components/controls';
import style from  './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={style.app}>
          <Preview />
          <Controls />
        </div>
      </Provider>
    );
  }
}

export default App;

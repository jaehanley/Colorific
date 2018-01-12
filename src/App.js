import React, { Component } from 'react';
import store from 'store/configureStore.js';
import { Provider } from 'react-redux';
import Preview from 'components/preview';
import Controls from 'components/controls';
import Chrome from 'components/chrome';
import ColorBlindOptions from 'components/colorBlindOptions';
import isElectron from 'utils/isElectron';
import style from  './App.css';

class App extends Component {
  render() {
    console.log(isElectron);
    return (
      <Provider store={store}>
        <div className={style.app}>
          <Chrome />
          <ColorBlindOptions />
          <Preview />
          <Controls />
        </div>
      </Provider>
    );
  }
}

export default App;

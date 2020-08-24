import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createBrowserHistory as createHistory} from 'history';
import App from './components/App';
import configureStore from './configureStore';

const history = createHistory();
const {store} = configureStore(history, window.REDUX_STATE);

const render = (App) => {
  const root = document.getElementById('root');

  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default;

    render(App);
  });
}

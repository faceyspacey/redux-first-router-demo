import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './configureStore'

const { store } = configureStore(window.REDUX_STATE)

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

render(App)

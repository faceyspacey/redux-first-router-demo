import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import App from 'components/App'

export default path => {
  const store = configureStore(path)
  const root = document.getElementById('app')

  ReactDOM.unmountComponentAtNode(root) // only needed for this codepen

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

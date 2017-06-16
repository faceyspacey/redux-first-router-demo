import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'

import * as reducers from './reducers'
import { fetchData } from './api'

export default path => {
  const history = createHistory()
  const { reducer, middleware, enhancer } = connectRoutes(history, {
    HOME: '/',
    LIST: { 
      path: '/list/:category', 
      thunk: (dispatch, getState) => {
        const { category } = getState().location.payload
        fetchData(`/api/videos/${category}`)
          .then(payload => dispatch({ type: 'VIDEOS_FETCHED', payload }))
      }
    },
    VIDEO: '/video/:slug',
    PLAY: '/video/:slug/play',
    PAGE: '/page',
    PAGE2: '/page2'
  }, {
    onAfterChange: () => {
      console.log('ON CHANGE')
    }
  })

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = applyMiddleware(middleware)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(rootReducer, composeEnhancers(enhancer, middlewares))
}


import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createMemoryHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'pure-redux-router'
import restoreScroll from 'redux-first-router-restore-scroll'

import * as reducers from './reducers'
import { fetchData } from './api'

const configureStore = (path) => {
  // outside of webpackpin/SSR/tests/RN you use `createBrowserHistory()`
  const history = createMemoryHistory()
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
    // scrollTop: true,
    restoreScroll: restoreScroll()
    // onChange: () => {
    //   console.log('ON CHANGE')
    //   scrollBehavior.updateScroll(1, 2)
    // }
  })
  window.HIST = history
  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = applyMiddleware(middleware)
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(rootReducer, composeEnhancers(enhancer, middlewares))
}

export default configureStore


// const createScrollBehavior = history => {
//   const listen = (handler) => {
//     // window.addEventListener('hashchange', () => console.log('HASH') || handler(), false)
//     history.listen(() => console.log('HISTORY') || handler())
//   }

//   const storage = new SessionStorage
//   window.STORAGE = storage

//   const scrollBehavior = new ScrollBehavior({
//     addTransitionHook: listen,
//     stateStorage: storage,
//     getCurrentLocation: () => {
//       return {
//         ...history.location,
//         action: history.action
//       }
//     },
//     shouldUpdateScroll: (prev, curr) => {
//       return true
//     }
//   })

//   window.addEventListener('hashchange', () => console.log('HASH') || scrollBehavior.updateScroll(1, 2), false)
//   return scrollBehavior
// }

// const STATE_KEY_PREFIX = '@@scroll|';

// class SessionStorage {
//   read(location, key) {
//     const stateKey = this.getStateKey(location, key);
//     const value = sessionStorage.getItem(stateKey);
//     return JSON.parse(value);
//   }

//   save(location, key, value) {
//     const stateKey = this.getStateKey(location, key);
//     const storedValue = JSON.stringify(value);
//     sessionStorage.setItem(stateKey, storedValue);
//   }

//   getStateKey(location, key) {
//     const locationKey = location.key || location.hash;
//     const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
//     return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
//   }
// }
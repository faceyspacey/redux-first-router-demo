import { redirect, NOT_FOUND } from 'redux-first-router'
import { fetchData, isAllowed, isServer } from './utils'

export default {
  HOME: '/',
  LIST: {
    path: '/list/:category',
    thunk: async (dispatch, getState) => {
      const {
        jwToken,
        location: { payload: { category } },
        videosByCategory: { categories }
      } = getState()

      if (categories[category]) return
      const videos = await fetchData(`/api/videos/${category}`, jwToken)

      if (videos.length === 0) {
        return dispatch({ type: NOT_FOUND })
      }

      dispatch({ type: 'VIDEOS_FETCHED', payload: { videos, category } })
    }
  },
  VIDEO: {
    path: '/video/:slug',
    thunk: async (dispatch, getState) => {
      // TASK FOR YOU. YES, YOU!
      //
      // visit a VIDEO page in the app, then refresh the page, then make
      // this work when visited directly by copying the LIST route above and
      // using fetchData(`/api/video/${slug}`) and by dispatching
      // the the corresponding action type which I'll leave up to you to find
      // in ../reducers/index.js :)
    }
  },
  PLAY: {
    path: '/video/:slug/play',
    thunk: (dispatch, getState) => {
      if (typeof window === 'undefined') {
        const { slug } = getState().location.payload
        const action = redirect({ type: 'VIDEO', payload: { slug } })

        dispatch(action)
      }
    }
  },
  LOGIN: '/login',
  ADMIN: {
    path: '/admin', // TRY: visit this path or dispatch ADMIN
    role: 'admin' // + change jwToken to 'real' in server/index.js
  }
}

export const options = {
  onBeforeChange: (dispatch, getState, action) => {
    const allowed = isAllowed(action.type, getState())

    if (!allowed) {
      const action = redirect({ type: 'LOGIN' })
      dispatch(action)
    }
  },
  onAfterChange: (dispatch, getState) => {
    const { type } = getState().location

    if (type === 'LOGIN' && !isServer) {
      setTimeout(() => {
        alert(
          "NICE, You're adventurous! Try changing the jwToken cookie from 'fake' to 'real' in server/index.js to access the Admin Panel. Then 'onBeforeChange' will let you in."
        )
      }, 1500)
    }
  }
}

// DON'T GO DOWN THERE!
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// ▼

// ANSWER: videoRoute.thunk.body:
/* HURRAY! You found the answers on the back of the cereal box!

const { jwToken, location: { payload: { slug } } } = getState()
const video = await fetchData(`/api/video/${slug}`, jwToken)

if (!video) {
  return dispatch({ type: NOT_FOUND })
}

dispatch({ type: 'VIDEO_FOUND', payload: video })
*/

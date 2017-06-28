import { NOT_FOUND } from 'redux-first-router'

// forget a switch, use a hash table for perf:

const components = {
  HOME: 'Home',
  LIST: 'List',
  VIDEO: 'Video',
  ADMIN: 'Admin',
  LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound'
}

// the primary reducer demonstrating Redux-First Router:

export const page = (state = 'HOME', action = {}) =>
  components[action.type] || state

export const slug = (state = '', action = {}) =>
  action.type === 'VIDEO' ? action.payload.slug : state

export const playing = (state = false, action = {}) => action.type === 'PLAY'

export const title = (state = 'RFR Demo', action = {}) => {
  switch (action.type) {
    case 'HOME':
      return 'RFR Demo'
    case 'LIST':
      return `RFR: ${capitalize(action.payload.category)}`
    case 'VIDEO':
      return `RFR: ${capitalize(action.payload.slug)}`
    case 'LOGIN':
      return 'RFR Login'
    case 'ADMIN':
      return 'RFR Admin'
    default:
      return state
  }
}

// eg: videoHash = { 'slug-1': video1, 'slug-2': video2 }:

export const videoHash = (state = {}, action = {}) => {
  switch (action.type) {
    case 'VIDEOS_FETCHED':
      const { videos } = action.payload
      return videos.reduce((videos, video) => {
        state[video.slug] = video
        return videos
      }, state)
    case 'VIDEO_FOUND':
      const video = action.payload
      state[video.slug] = video
      return state
    default:
      return state
  }
}

// eg: videosByCategory = { category: 'fp', categories: { fp: ['slug-1', 'slug-2'] } }

const initialState = { category: '', categories: {} }

export const videosByCategory = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LIST': {
      const { category } = action.payload
      return { ...state, category }
    }
    case 'VIDEOS_FETCHED': {
      const { category, videos } = action.payload
      const slugs = videos.map(video => video.slug)

      return {
        category, // selected category
        categories: {
          ...state.categories,
          [category]: slugs
        }
      }
    }
    default:
      return state
  }
}

// this is just a fun reducer to determine sliding direction
// as applied via a CSS className; don't worry about it too much:

export const direction = (state = 'next', action = {}) => {
  if (!action.meta || !action.meta.location) {
    return state
  }

  const type = action.type
  const prevType = action.meta.location.prev.type

  if (type === prevType) {
    return state
  }
  if (type === 'HOME') {
    return 'back'
  }
  else if (type === 'LIST' && prevType === 'HOME') {
    return 'next'
  }
  else if (type === 'LIST' && prevType === 'VIDEO') {
    return 'back'
  }
  else if (type === 'LIST' && prevType === 'PLAY') {
    return 'back'
  }
  else if (type === 'VIDEO' && prevType === 'LIST') {
    return 'next'
  }

  return state
}

// DEVTOOLS:

export const actions = (state = [], action = {}) => {
  // this isn't a reducer you are likely to have in your app, since it's for
  // "devTools." Don't worry that it does some weird things. The reason is:
  // since we have SSR, we don't want these actions displayed in HTML
  // or checksums won't match up since the server doesnt have them,
  // but usually you don't send an array of actions over the wire.
  if (action.type === '@@redux/INIT' || action.type === '@@INIT') {
    return state
  }

  return [action, ...state]
}

// JWT mock:

export const jwToken = (state = null, action = {}) =>
  (action.type === 'TOKEN' && action.payload) || state

// UTILS:

const capitalize = str =>
  str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

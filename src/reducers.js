import { NOT_FOUND } from 'redux-first-router'

// the primary reducer demonstrating Redux-First Router:
export const page = (state = 'HOME', action = {}) => {
  switch(action.type) {
    case 'HOME':
      return 'Home'
    case 'LIST':
      return 'List'
    case 'VIDEO':
      return 'Video'
    case 'PAGE':
      return 'Page'
    case 'PAGE2':
      return 'Page2'
    case NOT_FOUND:
      return 'NotFound'
    default:
      return state
  }
}

export const direction = (state = 'next', action = {}) => {
  if(!action.meta || !action.meta.location) {
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
  else if (type === 'VIDEO' && prevType === 'LIST') {
     return 'next' 
  }
  else if (type === 'HOME' && prevType === 'LIST') {
     return 'back' 
  }
  else if (type === 'LIST' && prevType === 'VIDEO') {
     return 'back' 
  }
  
  return 'next'
}

export const videoList = (state = [], action = {}) => {
  switch(action.type) {
    case 'LIST':
      return [] // naive: always refresh state to show spinner on List page load
    case 'VIDEOS_FETCHED':
      return action.payload.map(video => video.slug)
    default:
      return state
  }
}

export const videos = (state = {}, action = {}) => {
  switch(action.type) {
    case 'VIDEOS_FETCHED':
      return action.payload.reduce((videos, video) =>{
        state[video.slug] = video
        return videos
      }, state)
    default:
      return state
  }
}

export const playing = (state = false, action = {}) =>
  action.type === 'PLAY' ? true : false

export const slug = (state = '', action = {}) =>
  action.type === 'VIDEO' ? action.payload.slug : state

export const actions = (state = [], action = {}) =>
  [action, ...state]
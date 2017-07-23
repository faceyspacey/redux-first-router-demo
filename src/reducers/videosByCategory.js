const initialState = { category: '', categories: {} }

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LIST': {
      const { category } = action.payload
      return {
        ...state,
        category,
        isLoading: !state.categories[category] // if prev state has cat, its loaded already
      }
    }
    case 'VIDEOS_FETCHED': {
      const { category, videos } = action.payload
      const slugs = videos.map(video => video.slug)

      const categories = {
        ...state.categories,
        [category]: slugs
      }

      // This avoids race condition where you change tabs too quickly.
      // What we do is accept the new data without changing the category
      // and without setting isLoading to false :)
      if (category !== state.category) return { ...state, categories }

      return { category, isLoading: false, categories }
    }
    default:
      return state
  }
}

// eg: { category: 'fp', categories: { fp: ['slug-1', 'slug-2'] } }

// This is a "real" reducer. I.e. something closer to the complexity you might
// see in a real app. Pay close attention to how the `category` is extracted
// from the payload + path params. And how it's used to inidcate the current
// array of video slugs once they are fetched.

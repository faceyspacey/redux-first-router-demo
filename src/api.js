export const fetchData = (path) => {
  let data = []

  switch(path) {
    case '/api/videos/fp':
      data = fpVideos
      break
    case '/api/videos/react-redux':
      data = reactReduxVideos
      break
    case '/api/videos/db-graphql':
      data = dbGraphqlVideos
      break
  }
 
  return new Promise((res, rej) => {
    setTimeout(() => res(data), 1000)
  })
}

const fpVideos = [
  { 
    youtubeId: '6mTbuzafcII', 
    slug: 'transducers', 
    title: 'Transducers', 
    by: 'Rich Hickey',
    category: 'Functional Programming', 
    color: 'blue',
    tip: `Pure Redux Router does not require you to embed actual links into the page 
            to get the benefit of a synced address bar. Regular actions if matched
            will change the URL.`
  },
  { 
    youtubeId: 'zBHB9i8e3Kc', 
    slug: 'introduction-to-elm', 
    title: 'Introduction to Elm', 
    by: 'Richard Feldman',
    category: 'Functional Programming',
    color: 'blue',
    tip: `Redux reducers programmatically allow you to produce any state you need.
          So logically Route Matching components such as in React Reacter only
          allow you to do LESS, but with an increasingly MORE complicated API.`
  },
  { 
    youtubeId: 'mty0RwkPmE8', 
    slug: 'next-five-years-of-clojurescript', 
    title: 'The Next Five Years of ClojureScript ', 
    by: 'David Nolen',
    category: 'Functional Programming',
    color: 'blue',
    tip: `In your actions.meta.location key passed to your reducers you have all sorts
          of information: the previous route, its type and payload, history, whether
          the browser back/next buttons were used and if the action was dispatched on load.`
  }
]

const reactReduxVideos = [
  { 
    youtubeId: 'qa72q70gAb4', 
    slug: 'unraveling-navigation-in-react-native', 
    title: 'Unraveling Navigation in React Native', 
    by: 'Adam Miskiewicz',
    category: 'React & Redux', 
    color: 'red',
    tip: `Pure Redux Router tries in all cases to mirror the Redux API. There is no need
          to pass your thunk :params such as in an express request or the like. Just grab it
          from the payload stored in the location state.`
  },
  { 
    youtubeId: 'zD_judE-bXk', 
    slug: 'recomposing-your-react-application', 
    title: 'Recomposing your React application at react-europe ', 
    by: 'Andrew Clark',
    category: 'React & Redux', 
    color: 'red',
    tip: `Pure Redux Router requires your payload to be objects, as its keys are directionally extracted
          and from your URLs and passed from payloads to URL path segments. Your free
          to use whatever payload you like for redux actions not connected to your routes. Not all
          actiosn need to be connected to routes.`
  },
  { 
    youtubeId: 'uvAXVMwHJXU', 
    slug: 'the-redux-journey', 
    title: 'The Redux Journey', 
    by: 'Dan Abramov',
    category: 'React & Redux', 
    color: 'red',
    tip: `The <Link /> component embeds paths in hrefs for SEO, but you don't need to use it
          to get the benefits of a changing address bar. Actions that match routes will
          trigger the corresponding URL even if you dispatch them directly.`
  }
]

const dbGraphqlVideos = [
  { 
    youtubeId: 'fU9hR3kiOK0', 
    slug: 'turning-the-db-inside-out', 
    title: 'Turning the database inside out', 
    by: 'Martin Kleppmann',
    category: 'Database & GraphQL',
    color: 'orange',
    tip: `The 'thunk' feature is optional. You can asyncronously request your data in
          componentDidMount (not recommended), using Apollo or Relay, or manually dispatch
          your async actions any time you need. Using our 'thunk' feature allows you to
          to define it in one place though for routes reached from multiple parts of your app.`
  },
  { 
    youtubeId: '_5VShOmnfQ0', 
    slug: 'normalized-caching-in-apollo-ios', 
    title: 'Normalized Caching in Apollo iOS', 
    by: 'Martijn Walraven',
    category: 'Database & GraphQL',
    color: 'orange',
    tip: `Structure your reducers so that less actions are used to trigger the same state. 
          Your connected actions will become more 'page-like' and its recommended to
          set their types as the capitalized noun name of the page.`
  },
  { 
    youtubeId: 'm-hre1tt9C4', 
    slug: 'first-thoughts-on-apollo-and-graphql', 
    title: 'First Thoughts On Apollo and GraphQL', 
    by: 'Sacha Greif',
    category: 'Database & GraphQL',
    color: 'orange',
    tip: `Using a hash of slugs within one of your reducers is the recommended approach to 
          maintain a normalized set of entities to get the benefits of SEO. This is as opposed
          to using IDs.`
  }
]
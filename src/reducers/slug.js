export default (state = '', action = {}) =>
  action.type === 'VIDEO' ? action.payload.slug : state

// Using RFR is all about effectively making use of path segments. For good
// SEO, slugs will become your best friend.
//
// Make note of the simplicity of how path parameters become your payload.

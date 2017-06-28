import React from 'react'
import universal from 'react-universal-component'
import NotFound from './NotFound'
import styles from '../css/Switcher'

export default ({ page, isLoading }) => {
  const Component = components[page] || NotFound
  return <Component isLoading={isLoading} />
}

const loading = <div className={styles.loading}><div /></div>

const components = {
  Home: universal(() => import('./Home'), {
    resolve: () => require.resolveWeak('./Home'),
    minDelay: 500, // match sliding animation duration
    loading
  }),
  List: universal(() => import('./List'), {
    resolve: () => require.resolveWeak('./List'),
    minDelay: 500, // for silky smooth animations
    loading
  }),
  Video: universal(() => import('./Video'), {
    resolve: () => require.resolveWeak('./Video'),
    minDelay: 500, // i.e. no re-renders during animation
    loading
  }),
  Admin: () => <div className={styles.a}>YOU FIGURED OUT HOW TO DO AUTH!</div>,
  NotFound
}

// NOTE: `resolve` option wont be needed in upcoming babel-plugin

// THE FUTURE:
// https://github.com/webpack/webpack/issues/4993
// when Webpack fixes the above issue with `resolveWeak` dynamic requires,
// we can skip the wrapping component and just export this:
//
// export default universal(({ page }) => import(`./${page}`), {
//  minDelay: 500,
//  loading,
//  error: NotFound
// })
//
// :)

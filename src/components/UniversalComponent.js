import React from 'react'
import universal from 'react-universal-component'
import { spinner, admin, login, notFound } from '../css/Switcher'

export default ({ page, isLoading }) => {
  const Component = components[page] || NotFound
  return <Component isLoading={isLoading} />
}

const loading = () => <div className={spinner}><div /></div>
const Admin = () => <div className={admin}>U FIGURED OUT HOW TO DO AUTH!</div>
const Login = () => <div className={login}>YOU ARE NOT ALLOWED IN!</div>
const NotFound = () => <div className={notFound}>PAGE NOT FOUND - 404</div>

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
  Admin,
  Login,
  NotFound
}

// NOTE: `require.resolveWeak` is Webpack method to require a module without
// creating a dependency, which powers synchronous rendering when available.
// The `resolve` option soon wont be needed thanks to an upcoming babel-plugin.
// Don't stress it.

// THE FUTURE:
// https://github.com/webpack/webpack/issues/4993
// when Webpack fixes the above issue with `resolveWeak` dynamic requires,
// we can also skip the wrapping component and just export this:
//
// export default universal(({ page }) => import(`./${page}`), {
//  minDelay: 500,
//  loading,
//  error: NotFound
// })
//
// :)

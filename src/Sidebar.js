import React from 'react'
import { connect } from 'react-redux'
import Link from 'pure-redux-router-link'

import styles from './Sidebar.css'

const Sidebar = ({ onClick, path }) =>
  <div className={styles.sidebar}>
    <h2>SEO-FRIENDLY LINKS</h2>
    <Link className={active(path, '/')} href="/">HOME</Link>
    <Link className={active(path, '/page')} href="/page">PAGE</Link>
    <Link className={active(path, '/list/db-graphql')} href="/list/db-graphql">DB & GRAPHQL</Link>
    <Link className={active(path, '/list/react-redux')} href={['list', 'react-redux']}>REACT & REDUX</Link>
    <Link 
      className={active(path, '/list/fp')} 
      href={{ type: 'LIST', payload: { category: 'fp' } }}
    >
      FP
    </Link>

    <div style={{height: 20}} />

    <h2>EVENT HANDLERS</h2>
    <span className={active(path, '/')} onClick={() => onClick('HOME')}>HOME</span>
    <span className={active(path, '/list/db-graphql')} onClick={() => onClick('LIST', 'db-graphql')}>
      DB & GRAPHQL
    </span>
    <span className={active(path, '/list/react-redux')} onClick={() => onClick('LIST', 'react-redux')}>
      REACT & REDUX
    </span>
    <span className={active(path, '/list/fp')} onClick={() => onClick('LIST', 'fp')}>
      FP
    </span>

    <h2 style={{fontSize: 12, textShadow: 'none', marginTop: 15}}>
      IMPORTANT: the address bar mirrors a real address bar. When you use its
      back/next buttons, no actions are directly dispatched. Instead, the browser
      history API is used as normal.
    </h2>
  </div>

const active = (currentPath, path) =>
  currentPath === path ? styles.active : ''

const createAction = (type, category) => {
  return {
    type,
    payload: category && { category }
  }
}

const mapDispatch = { onClick: createAction }
const mapState = ({ location }) => ({ path: location.pathname })

export default connect(mapState, mapDispatch)(Sidebar)
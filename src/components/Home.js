import React from 'react'
import styles from '../css/Home'

const Home = () =>
  <div className={styles.home}>
    <h1>HOME</h1>

    <h2>
      NOTE: The app is intended to be viewed with the console or redux
      devtools open as a sidebar, making the app less wide.
    </h2>
    <div style={{ height: 20 }} />

    <span>
      {'HREF STRING: <Link to="/list/db-graphql">DB & GRAPHQL</Link>'}
    </span>
    <span>
      {"PATH SEGMENTS: <Link to={['list', 'react-redux']}>REACT & REDUX</Link>"}
    </span>
    <span>
      {
        "ACTION: <Link to={{ type: 'LIST', payload: { category: 'fp' } }}>FP</Link>"
      }
    </span>

    <h1>EVENT HANDLERS DISPATCH ACTION (NO SEO BENEFITS)</h1>

    <pre>
      {`
const goToPage = (type, category) => {
  return {
    type,
    payload: category && { category }
  }
}

dispatch(goToPage('LIST', 'react-redux'))
      `}
    </pre>

    <h2>
      {`DIRECTIONS: inspect the sidebar tabs to see the top set are real <a> tag links and the
        bottom set not, yet the address bar changes for both. The decision is up to you.
        When using the <Link /> component, if you provide an action as the \`href\` prop, you never
        need to worry if you change the static path segments (e.g: \`/list\`) in the routes passed 
        to \`connectRoutes\`.`}
    </h2>
  </div>

export default Home

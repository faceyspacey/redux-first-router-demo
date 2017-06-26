import React from 'react'
import { connect } from 'react-redux'
import { back, next } from 'redux-first-router'

import createApp from 'createApp'
import styles from './AddressBar.css'

const AddressBar = ({ path, index, length }) =>
  <div className={styles.addressBar}>
    <div className={styles.buttons}>
      <span className={backClassName(index)} onClick={back} />
      <span className={nextClassName(index, length)}  onClick={next} />
      <span className='ion-refresh' onClick={() => createApp(path)} />
    </div>

    <input className={styles.searchInput} value={path} onChange={() => null} />
  </div>

const backClassName = (index) =>
  index === 0 ? `ion-arrow-left-c ${styles.disabled}` : `ion-arrow-left-c`

const nextClassName = (index, length) =>
  index === length - 1 ? `ion-arrow-right-c ${styles.disabled}` : `ion-arrow-right-c`

const mapState = ({ location }) => ({
  path: location.pathname,
  index: location.history.index,
  length: location.history.length
})

export default connect(mapState)(AddressBar)

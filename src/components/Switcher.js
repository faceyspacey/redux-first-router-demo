import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'transition-group'

import UniversalComponent from './UniversalComponent'
import styles from '../css/Switcher'

const Switcher = ({ page, direction, isLoading }) =>
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix='fade'
  >
    <Transition key={page}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>

const mapState = ({ page, direction, videosByCategory: { isLoading } }) => ({
  page,
  direction,
  isLoading
})

export default connect(mapState)(Switcher)

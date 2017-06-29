import React from 'react'
import { connect } from 'react-redux'
import {
  AnimatedTransitionGroup,
  AnimatedChild
} from 'animated-transition-group'

import UniversalComponent from './UniversalComponent'
import styles from '../css/Switcher'

const Switcher = ({ page, direction, isLoading }) =>
  <AnimatedTransitionGroup
    component='div'
    className={`${styles.switcher} ${direction}`}
    duration={500}
    debounce={500}
    prefix='fade'
  >
    <AnimatedChild key={page}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </AnimatedChild>
  </AnimatedTransitionGroup>

const mapState = ({ page, direction, videosByCategory }) => {
  const { category, categories } = videosByCategory
  const isLoading = page === 'List' && !categories[category]
  return { page, direction, isLoading }
}

export default connect(mapState)(Switcher)

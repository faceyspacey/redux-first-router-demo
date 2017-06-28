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
    prefix='fade'
  >
    <AnimatedChild key={debouncedKey(page, isLoading)}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </AnimatedChild>
  </AnimatedTransitionGroup>

const debouncedKey = (page, isLoading) =>
  isLoading ? page : page + +new Date()

const mapState = ({ page, direction, videosByCategory }) => {
  const { category, categories } = videosByCategory
  const isLoading = page === 'List' && !categories[category]
  return { page, direction, isLoading }
}

export default connect(mapState)(Switcher)

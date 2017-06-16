import React from 'react'
import { connect } from 'react-redux'
import { AnimatedTransitionGroup, AnimatedChild } from 'animated-transition-group'

import Home from './Home'
import List from './List'
import Video from './Video'
import Page, { Page2 } from './Page'

import styles from './Switcher.css'

const Switcher = ({ page, direction }) =>
  <AnimatedTransitionGroup 
    component="div" 
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix='fade'
  >
    <AnimatedChild key={page}>
      {getComponent(page)}
    </AnimatedChild>
  </AnimatedTransitionGroup>

const getComponent = page => {
  switch(page) {
    case 'Home':  
      return <Home />
    case 'List':  
      return <List />
    case 'Video':  
      return <Video />
    case 'Page':
      return <Page />
    case 'Page2':
      return <Page2 />
    case 'NotFound':
      return <div className={styles.notFound}>PAGE NOT FOUND - 404</div>
    default: 
      return <Home />
  }
}

const mapState = ({ page, direction }) => ({ page, direction })
export default connect(mapState)(Switcher)

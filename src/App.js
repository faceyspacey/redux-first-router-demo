import React from 'react'

import AddressBar from './AddressBar'
import DevTools from './DevTools'
import Sidebar from './Sidebar'
import Switcher from './Switcher'

import styles from './App.css'

const AppReal = () =>
  <div>
    <AddressBar />
  
    <div className={styles.app}>
      <Sidebar />
      <Switcher />
    </div>
  
    <DevTools />
  </div>

export default class App extends React.Component {
  componentDidUpdate(prev) {
    console.log('UPDATE APP', prev, this.props)
  }

  render() {
    return (
      <div>
        <div className={styles.app}>
          <Sidebar />
          <Switcher />
        </div>
      
        <DevTools />
      </div>
    )
  }
}



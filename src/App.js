import React from 'react'

import AddressBar from './AddressBar'
import DevTools from './DevTools'
import Sidebar from './Sidebar'
import Switcher from './Switcher'

import styles from './App.css'

export default () =>
  <div>
    <div className={styles.app}>
      <Sidebar />
      <Switcher />
    </div>
  
    <DevTools />
  </div>



// for deploying to Webpackbin.com where we use a fake address bar
// since the app is served in an iframe (make sure to use memory history):

// const AppWebpackBin = () =>
//   <div>
//     <AddressBar /> // fake address bar!
  
//     <div className={styles.app}>
//       <Sidebar />
//       <Switcher />
//     </div>
  
//     <DevTools />
//   </div>


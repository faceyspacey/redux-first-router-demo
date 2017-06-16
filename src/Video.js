import React from 'react'
import { connect } from 'react-redux'

import Player from './Player'
import styles from './Video.css'

const Video = ({ slug, title, youtubeId, category, by, color, tip }) =>
  <div className={styles.video}>
    <Player slug={slug} youtubeId={youtubeId} color={color} />

    <div className={styles.infoContainer}>
      <span className={styles.title}>{title}</span>

      <div className={styles.infoRow}>
        <div className={styles.category} style={{backgroundColor: color}}>
          <span>{category}</span>
        </div>

        <span className={styles.byText}>by: {by}</span>
      </div>

      <div className={styles.separator} />

      <span className={styles.tipTitle}>Tip</span>
      <div className={styles.tip}>
        {slug 
          ? tip
          : <span style={{color: 'red'}}>
              YOU FOUND A MISSING FEATURE!
              There is no data because you Refreshed the video page, 
              whose data is fetched on the previous page. Try adding a thunk
              to this route in `configureStore.js` to insure when
              visited directly this page has its data as well. You can either
              request the same data again or redirect to another route, eg: 
              <span style={{color: 'blue'}}> {`dispatch({ type: 'HOME' })`}</span>
            </span>
        }
      </div>
    </div>
  </div>

const mapState = state => state.videos[state.slug]

export default connect(mapState)(Video)
import React from 'react'
import { connect } from 'react-redux'
import Link from 'pure-redux-router-link'

import styles from './List.css'

const List = ({ videos }) =>
  <div className={styles.list}>
    {videos.length === 0
      ? <div className={styles.loader} />
      : videos.map((video, key) => <Row {...video} key={key} />)
     }
  </div>

const Row = ({ slug, title, youtubeId, category, by, color }) =>
  <Link
    className={styles.row}
    href={`/video/${slug}`}
    style={{ backgroundImage: youtubeBackground(youtubeId) }}
  >
    <div className={styles.avatar} style={{ backgroundColor: color }}>
      {initials(by)}
    </div>
    <span className={styles.title}>{title}</span>

    <div className={styles.gradient} />
    <span className={styles.by}>by: {by}</span>
  </Link>

const youtubeBackground = youtubeId =>
  `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`

const initials = by =>
  by.split(' ').map(name => name[0]).join('')

const mapState = state => ({ 
  videos: state.videoList.map(slug => state.videos[slug]) 
})

export default connect(mapState)(List)
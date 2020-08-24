import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Link from 'redux-first-router-link';

import styles from '../css/List';

const List = ({videos}) => (
  <div className={styles.list}>
    {videos.map((video, key) => (
      <Row {...video} key={key} />
    ))}
  </div>
);

List.propTypes = {
  videos: PropTypes.any,
};

const Row = ({slug, title, youtubeId, by, color}) => (
  <Link
    className={styles.row}
    to={`/video/${slug}`}
    style={{backgroundImage: youtubeBackground(youtubeId)}}
  >
    <div className={styles.avatar} style={{backgroundColor: color}}>
      {initials(by)}
    </div>
    <span className={styles.title}>{title}</span>

    <div className={styles.gradient} />
    <span className={styles.by}>by: {by}</span>
  </Link>
);

Row.propTypes = {
  slug: PropTypes.any,
  title: PropTypes.any,
  youtubeId: PropTypes.any,
  by: PropTypes.any,
  color: PropTypes.any,
};

const youtubeBackground = (youtubeId) =>
  `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`;

const initials = (by) =>
  by
    .split(' ')
    .map((name) => name[0])
    .join('');

const mapState = ({category, videosByCategory, videosHash}) => {
  const slugs = videosByCategory[category] || [];
  const videos = slugs.map((slug) => videosHash[slug]);
  return {videos};
};
export default connect(mapState)(List);

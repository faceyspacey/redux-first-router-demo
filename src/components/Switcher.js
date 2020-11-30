import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import isLoading from '../selectors/isLoading';
import styles from '../css/Switcher';
import UniversalComponent from './UniversalComponent';

const Switcher = ({page, direction, isLoading}) => (
  <div className={`${styles.switcher}`}>
    <UniversalComponent page={page} isLoading={isLoading} />
  </div>
);

Switcher.propTypes = {
  page: PropTypes.any,
  direction: PropTypes.any,
  isLoading: PropTypes.bool,
};

const mapState = ({page, direction, ...state}) => ({
  page,
  direction,
  isLoading: isLoading(state),
});

export default connect(mapState)(Switcher);

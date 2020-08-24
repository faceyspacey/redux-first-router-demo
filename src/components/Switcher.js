import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TransitionGroup, Transition} from 'transition-group';
import universal from 'react-universal-component';

import Loading from './Loading';
import Err from './Error';
import isLoading from '../selectors/isLoading';
import styles from '../css/Switcher';

const load = (props) =>
  Promise.all([
    import(/* webpackChunkName: '[request]' */ `./${props.page}`),
  ]).then((proms) => proms[0]);

const UniversalComponent = universal(load, {
  chunkName: (props) => props.page,
  resolve: (props) => require.resolveWeak(`./${props.page}`),
  minDelay: 500,
  loading: Loading,
  error: Err,
});

const Switcher = ({page, direction, isLoading}) => (
  <TransitionGroup
    className={`${styles.switcher} ${direction}`}
    duration={500}
    prefix="fade"
  >
    <Transition key={page}>
      <UniversalComponent page={page} isLoading={isLoading} />
    </Transition>
  </TransitionGroup>
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

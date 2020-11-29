import universal from 'react-universal-component';
import Loading from './Loading';
import Err from './Error';
import PropTypes from 'prop-types';

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

UniversalComponent.propTypes = {
    loading: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.bool
    ]),
    error: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.bool
    ]),
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    timeout: PropTypes.number,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    minDelay: PropTypes.number,
    alwaysDelay: PropTypes.bool,
    loadingTransition: PropTypes.bool
  }

export default UniversalComponent;

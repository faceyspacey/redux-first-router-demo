module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'development')
      ? 'mongodb://mongodb/development-rfr'
      : 'mongodb://mongodb/production-rfr',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'development' ? 1 : 10),
    length: 128,
    digest: 'sha512',
  },
};

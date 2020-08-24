module.exports = function (serve) {
  return {
    plugins: [serve.attach()],
  };
};

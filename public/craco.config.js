module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
          }
        }
      }
    }
  };
  
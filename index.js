module.exports = process.env.GPXPARSE_COV
  ? require('./lib-cov/rescheme')
  : require('./lib/rescheme');

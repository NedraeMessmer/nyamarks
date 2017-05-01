const env = process.env.NODE_ENV;

const log = {};

for (const method in console) {
  if (env === 'development') {
    // eslint-disable-next-line
    log[method] = console[method];
  }
}

export default log;

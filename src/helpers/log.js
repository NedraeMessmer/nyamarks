const env = process.env.NODE_ENV;

const log = {};

for (const method in console) {
  if (env === 'development') {
    log[method] = console[method];
  }
}

export default log;

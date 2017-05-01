const env = process.env.NODE_ENV;

const log = {};

for (const method in console) {
  let func = () => {};

  if (env === 'development') {
    // eslint-disable-next-line
    func = console[method];
  }

  log[method] = func;
}

export default log;

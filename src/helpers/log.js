const env = process.env.NODE_ENV;

const log = {...console};

if (env !== 'development') {
  for (const method in console) {
    log[method] = () => {}
  }
}

export default log;

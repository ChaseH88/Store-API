const logger = (req, res, next) => {
  const { headers, url, method, protocol, get, originalUrl } = req;
  let data = `METHOD: ${method} --- URL: ${url} --- DATE: ${new Date()} --- HEADERS: ${JSON.stringify(headers)}`;
  console.log(`======================================================================================\n${data}`);

  next();
}

module.exports = logger;
exports.logger = (req, res, next) => {
  const { headers, url, method } = req;
  let data = `METHOD: ${method} --- URL: ${url} --- DATE: ${new Date()} --- HEADERS: ${JSON.stringify(headers)}`;
  console.log(`======================================================================================\n${data}`);

  next();
}
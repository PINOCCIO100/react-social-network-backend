const colors = require('colors');

exports.logger = (req, res, next) => {
  console.group(`${colors.red.bold('Request:')} ${colors.cyan.bold(req.originalUrl)}`);
  console.log(`${colors.red.bold('Params:')} ${colors.cyan.bold(req.params)}`)
  console.log(`${colors.red.bold('Body:')} ${colors.cyan.bold(req.body)}`)
  console.groupEnd();
  next();
}
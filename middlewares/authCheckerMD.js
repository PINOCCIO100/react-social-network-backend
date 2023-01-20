const authChecker = require("../utility/authChecker");

module.exports = async function (req, res, next) {
  await authChecker(req) ? next() : res.status(400).send('You are not authorized!');
}
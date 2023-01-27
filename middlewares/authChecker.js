const { getUserSession } = require("../utility/authUtility");

//TODO: Надо переиспользовать функцию

module.exports = async function (req, res, next) {
  const userSession = await getUserSession(req.signedCookies?.session);
  userSession !== null ? next() : res.status(400).send(userSession.message);
}

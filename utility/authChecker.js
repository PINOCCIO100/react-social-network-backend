const Session = require("../models/Session");

// Через signedCookie в запросе ищется id сессии, если в БД имеется такой id, то true, иначе false
module.exports = async function (req) {
  const session = req.signedCookies.session;
  return session != null && await Session.findOne({ session: session }) != null
}
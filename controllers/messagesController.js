const Messages = require("../models/Messages");
const { getUserSession } = require("../utility/authUtility");

exports.getAllMessages = async (req, res) => {
  const senderID = (await getUserSession(req.signedCookies.session)).id
  const messages = await Messages.find({ senderID })
  res.json(messages)
}

exports.getAddressedMessages = async (req, res) => {
  const { accepterID } = req.params;
  const senderID = (await getUserSession(req.signedCookies.session)).id
  const messages = await Messages.find({ senderID, accepterID })
  res.json(messages)
}

exports.getUsersIDWithDialogs = async (req, res) => {
  const senderID = (await getUserSession(req.signedCookies.session)).id
  const usersID = await Messages.distinct('accepterID', { senderID });
  res.json(usersID)
}

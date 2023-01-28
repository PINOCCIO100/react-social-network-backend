const Messages = require("../models/Messages");
const { getUserSession } = require("../utility/authUtility");

exports.getAllSendedMessages = async (req, res) => {
  try {
    const senderID = (await getUserSession(req.signedCookies.session)).id
    const messages = await Messages.find({ senderID })
    res.json(messages)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.getAddressedMessages = async (req, res) => {
  try {
    const { accepterID } = req.params;
    const senderID = (await getUserSession(req.signedCookies.session)).id
    const messages = await Messages.find({
      $or:
        [
          { senderID: senderID, accepterID },
          { accepterID: senderID, senderID: accepterID } // TODO: Не нравится путаница с senderID и accepterID
        ]
    }, { _id: 0, __v: 0 }).sort({ sendDate: 1 })
    res.json(messages)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.getUsersIDWithDialogs = async (req, res) => {
  try {
    const senderID = (await getUserSession(req.signedCookies.session)).id
    const usersID = await Messages.distinct('accepterID', { senderID });
    res.json(usersID)
  } catch (e) {
    console.log(e.messages);
  }
}

exports.sendMessage = async (req, res) => {
  const senderID = req.session.id;
  const { accepterID, message } = req.body;
  try {
    if (message == '' || !message) throw new Error('Empty message!')
    await Messages.create({
      senderID,
      accepterID,
      message,
      sendDate: Date.now()
    })
    res.json({
      resultCode: 0,
      message: []
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}
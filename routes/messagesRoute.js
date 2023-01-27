const { Router } = require("express");
const { getAddressedMessages, getAllMessages, getUsersIDWithDialogs } = require("../controllers/messagesController");

const messagesRoute = Router();

messagesRoute.get('/', getAllMessages)

messagesRoute.get('/users', getUsersIDWithDialogs)

messagesRoute.get('/:accepterID', getAddressedMessages)

exports.messagesRoute = messagesRoute;
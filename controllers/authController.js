const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserInfo = require('../models/UserInfo');
const Session = require('../models/Session');

async function setSessionID(id) {
  const sessionID = uuid.v4();
  const session = await Session.findOne({ id: id });
  if (session) {
    session.session = sessionID;
    session.save();
  } else {
    await Session.create({
      id,
      session: sessionID,
    })
  }
  return sessionID
}

exports.authUser = async (req, res) => {
  // console.log(bcrypt.hashSync('pass', 10));
  const userData = req.body;
  try {
    const user = await UserInfo.findOne({ email: userData.email });
    if (!user) {
      console.log(`There no users with email "${userData.email}"`);
      res.send(false);
    } else if (!bcrypt.compareSync(userData.password, user.password)) {
      // Проверка  захэшированного пароля
      console.log(`Wrong password!`);
      res.send(false);
    } else {
      res.cookie('session', await setSessionID(user.id), {
        signed: true,
        // maxAge: 90000
      })
      console.log(`${user.name} logged successfully`);
      res.send(true);
    }
  } catch (e) {
    console.log(e.message);
  }
}

exports.authStatus = async (req, res) => {
  const session = req.signedCookies.session;
  if (!session) {
    res.send(false)
  } else if (await Session.findOne({ session: session }) == null) {
    res.send(false);
  } else {
    res.send(true);
  }
}
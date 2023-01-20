const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserInfo = require('../models/UserInfo');
const Session = require('../models/Session');

async function setSessionID(user) {
  // user - документ из коллекции usersInfo 
  const sessionID = uuid.v4();
  const session = await Session.findOne({ id: user.id });
  if (session) {
    session.session = sessionID;
    session.save();
  } else {

    await Session.create({
      id: user.id,
      email: user.email,
      name: user.name,
      session: sessionID,
    })
  }
  return sessionID
}

// Формируется статус аутентификации в зависимости от cookie и session в БД
function createAuthStatus(sessionByCookie, sessionByBackend) {
  const authStatus = {
    message: [],
    data: {},
  }
  if (!sessionByCookie || !sessionByBackend) {
    authStatus.message.push('You are not authorized');
    authStatus.resultCode = 1;
  } else {
    authStatus.data.id = sessionByBackend.id;
    authStatus.data.email = sessionByBackend.email;
    authStatus.data.name = sessionByBackend.name;
    authStatus.resultCode = 0;
  }
  return authStatus
}

exports.authUser = async (req, res) => {
  // console.log(bcrypt.hashSync('pass', 10));
  const userData = req.body;
  try {
    const user = await UserInfo.findOne({ email: userData.email });
    if (!user) {
      // Проверка наличия пользователя с такой почтой
      console.log(`There no users with email "${userData.email}"`);
      res.send(false);
    } else if (!bcrypt.compareSync(userData.password, user.password)) {
      // Проверка  захэшированного пароля
      console.log(`Wrong password!`);
      res.send(false);
    } else {
      res.cookie('session', await setSessionID(user), {
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
  const sessionByCookie = req?.signedCookies?.session;
  const sessionByBackend = await Session.findOne({ session: sessionByCookie });
  res.json(createAuthStatus(sessionByCookie, sessionByBackend));
}

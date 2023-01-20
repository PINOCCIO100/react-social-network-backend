const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserInfo = require('../models/UserInfo');
const Session = require('../models/Session');

//
async function setSession(user) {
  // user - документ из коллекции usersInfo 
  const sessionID = uuid.v4();
  let session = await Session.findOne({ id: user.id });
  if (session) {
    session.session = sessionID;
    session.save();
  } else {
    session = await Session.create({
      id: user.id,
      email: user.email,
      name: user.name,
      session: sessionID,
    })
  }
  return session
}



// Формируется статус аутентификации 
function createAuthStatus(resultCode, userSession) {
  authStatus = {
    message: [],
    data: {},
  }
  switch (resultCode) {
    case 0:
      authStatus.data.id = userSession.id;
      authStatus.data.email = userSession.email;
      authStatus.data.name = userSession.name;
      authStatus.resultCode = 0;
      break;
    case 1:
    default:
      authStatus.message.push('You are not authorized');
      authStatus.resultCode = 1;
      break;
  }

  return authStatus
}

exports.authUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await UserInfo.findOne({ email: userData.email });
    const userSession = await setSession(user);
    if (!user) {
      // Проверка наличия пользователя с такой почтой
      console.log(`There no users with email "${userData.email}"`);
      res.send(false);
    } else if (!bcrypt.compareSync(userData.password, user.password)) {
      // Проверка  захэшированного пароля
      const authStatus = createAuthStatus(1, userSession);
      console.log(`Wrong password!`);
      // res.send(false);
      res.json(authStatus);
    } else {
      const authStatus = createAuthStatus(0, userSession);
      res.cookie('session', userSession.session, {
        signed: true,
        // maxAge: 90000
      })
      console.log(`${user.name} logged successfully`);
      // res.send(true);
      res.json(authStatus);
    }
  } catch (e) {
    console.log(e.message);
  }
}

exports.authStatus = async (req, res) => {
  const clientSessionID = req.signedCookies?.session;
  const userSession = await Session.findOne({ session: clientSessionID });
  !clientSessionID || !userSession ?
    res.json(createAuthStatus(1, userSession)) :
    res.json(createAuthStatus(0, userSession));
}

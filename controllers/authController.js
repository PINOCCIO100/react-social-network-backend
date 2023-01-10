const { readFileSync } = require('fs');
const path = require('path');

const getAuthData = () => {
  return JSON.parse(readFileSync(path.resolve('models', 'usersAuthData.json')));
}

exports.authController = (req, res) => {
  console.log(req.body);
  const authData = getAuthData();
  if (authData.some(user => (
    user.email == req.body.email && user.password == req.body.password
  ))) {
    console.log(`User "${req.body.email}" logged`);
    res.send(true);
  } else {
    console.log(`User "${req.body.email}" refused`);
    res.status(400).send(false);
  }
}

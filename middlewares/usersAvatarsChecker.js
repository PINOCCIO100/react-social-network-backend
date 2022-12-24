const { existsSync } = require('fs');

exports.usersAvatarsChecker = (req, res) => {
  if (!existsSync(req.originalUrl)) {
    console.log(req.originalUrl);
    res.send(undefined);
  } else {
    res.sendFile(req.originalUrl);
  }
}
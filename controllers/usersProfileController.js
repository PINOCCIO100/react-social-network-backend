const path = require('path');
const { readFileSync } = require('fs');

const getUsersProfileInfo = () => {
  return JSON.parse(readFileSync(path.resolve('models', 'usersProfileInfo.json')));
}

exports.getUsersList = (req, res) => {
  const usersProfileInfoParsed = getUsersProfileInfo();
  const totalCount = usersProfileInfoParsed.length
  const page = req.query.page;
  const count = req.query.count;
  res.json({
    usersProfileInfo: usersProfileInfoParsed.slice(count * (page - 1), count * page),
    totalCount
  });
};

exports.getUserProfile = (req, res) => {
  const { userID } = req.params;
  const usersProfileInfoParsed = getUsersProfileInfo();
  res.json(usersProfileInfoParsed.find(p => p.id == userID));
}

const UserInfo = require('../models/UserInfo');

exports.getUsersList = async (req, res) => {
  const page = req.query.page;
  const count = req.query.count;
  res.json({
    usersProfileInfo: await UserInfo.find().sort({ id: -1 }).skip((page - 1) * count).limit(count),
    totalCount: await UserInfo.count(),
  });
};

exports.getUserProfile = async (req, res) => {
  res.json(await UserInfo.findOne({ id: req.params.userID }))
}

const Follows = require('../models/Follows.js');
const { getUserSession } = require('../utility/authUtility.js');


exports.getFollowStatus = async (req, res) => {
  const userSession = await getUserSession(req.signedCookies?.session);
  const userID = Number(req.params.userID);
  const followsDoc = await Follows.findOne({ id: userSession.id });
  res.send(followsDoc.follows.some(id => id === userID));
}


// TODO: followUser и unfollowUser во многом дублируются. Нужно зарефакторить
exports.followUser = async (req, res) => {
  const userSession = await getUserSession(req.signedCookies?.session);
  const userID = Number(req.params.userID);
  try {
    const followsDoc = await Follows.findOne({ id: userSession.id });
    if (!followsDoc.follows.some(id => userID == id)) {
      followsDoc.follows.push(userID);
      followsDoc.save();
      res.json({
        resultCode: 0,
        message: []
      })
    } else {
      res.json({
        resultCode: 1,
        message: [`This user already followed`]
      })
    }
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}

exports.unfollowUser = async (req, res) => {
  const userSession = await getUserSession(req.signedCookies?.session);
  const userID = Number(req.params.userID);
  try {
    const followsDoc = await Follows.findOne({ id: userSession.id });
    if (followsDoc.follows.some(id => userID == id)) {
      followsDoc.follows = followsDoc.follows.filter(id => id !== userID);
      followsDoc.save();
      res.json({
        resultCode: 0,
        message: []
      })
    } else {
      res.json({
        resultCode: 1,
        message: [`This user not followed`]
      })
    }
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}
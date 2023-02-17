exports.getUserStatus = (req, res) => {
  const { userID } = req.params;
  res.send(`get for ${userID}`)
}

exports.createUserStatus = (req, res) => {
  const { userID } = req.params;
  const { text } = req.body;
  res.send(`create for ${userID} & ${text}`)
}

exports.deleteUserStatus = (req, res) => {
  const { userID } = req.params;
  res.send(`delete for ${userID}`)
}
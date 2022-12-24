import path from 'path';
import { readFileSync } from 'fs';

const __dirname = path.resolve();

const getUsersProfileInfo = () => {
  return JSON.parse(readFileSync(path.resolve(__dirname, 'models', 'usersProfileInfo.json')));
}

export const getUsersList = (req, res) => {
  const usersProfileInfoParsed = getUsersProfileInfo();
  const totalCount = usersProfileInfoParsed.length
  const page = req.query.page;
  const count = req.query.count;
  res.json({
    usersProfileInfo: usersProfileInfoParsed.slice(count * (page - 1), count * page),
    totalCount
  });
};

export const getUserProfile = (req, res) => {
  const { userID } = req.params;
  const usersProfileInfoParsed = getUsersProfileInfo();
  res.json(usersProfileInfoParsed.find(p => p.id == userID));
}

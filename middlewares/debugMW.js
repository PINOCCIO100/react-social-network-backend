import { readFileSync } from 'fs';
import path from 'path';
// import usersProfileInfo from '../models/usersProfileInfo.json' assert {type: "json"};

const __dirname = path.resolve();
export const debugMW = async (req, res, next) => {
  const usersProfileInfo = JSON.parse(readFileSync(path.resolve(__dirname, 'models', 'usersProfileInfo.json')));
  console.log(usersProfileInfo);
  next();
}
import { existsSync } from "fs";


export const usersAvatarsChecker = (req, res) => {
  imp
  
  if (!existsSync(req.originalUrl)) {
    console.log(req.originalUrl);
    res.send(undefined);
  } else {
    res.sendFile(req.originalUrl);
  }
}
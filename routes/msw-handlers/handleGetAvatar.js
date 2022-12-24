import { rest } from "msw";

function importAvatar(userID) {
  return require(`../db/media/profilePhoto/${userID}/avatar.jpg`)
}

async function createAvatarURL(userID) {
  let base64Image;
  try { base64Image = importAvatar(userID) } catch { return };
  const imageBuffer = await fetch(base64Image).then(res => res.arrayBuffer());
  const arrayBufferView = new Uint8Array(imageBuffer);
  const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(blob);
}

export const handleGetAvatars = [

  rest.post('api/avatars', async (req, res, ctx) => {
    const usersID = await req.json();
    const imagesUrl = [];
    for (let i = 0; i < usersID.length; i++) {
      imagesUrl[i] = await createAvatarURL(usersID[i]);
    }
    return res(
      ctx.json(imagesUrl),
    );
  }),

  rest.get('api/avatars/:userID', async (req, res, ctx) => {
    return res(
      ctx.json(await createAvatarURL(req.params.userID)),
    );
  })

];

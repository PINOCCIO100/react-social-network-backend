import { rest } from "msw";
import usersData from '../db/usersData.json';

class StorageInfo {

  static add = (storageName, key, data) => {
    const storage = JSON.parse(localStorage.getItem(storageName)) ?? {};
    storage[key] = data;
    localStorage.setItem(storageName, JSON.stringify(storage));
  }
  static get = (storageName, key) => {
    const storage = JSON.parse(localStorage.getItem(storageName)) ?? {};
    return storage[key];
  }
  static remove = (storageName, key) => {
    const storage = JSON.parse(localStorage.getItem(storageName)) ?? {};
    if (!storage[key]) return;
    delete storage[key];
    localStorage.setItem(storageName, JSON.stringify(storage));
  }
  static clear = (storageName) => {
    localStorage.removeItem(storageName);
  }
}

class Sessions {
  static get storageName() { return 'sessions' };
  static add = (key, data) => StorageInfo.add(this.storageName, key, data);
  static get = (key) => StorageInfo.get(this.storageName, key);
  static remove = (key) => StorageInfo.remove(this.storageName, key);
  static clear = () => StorageInfo.clear(this.storageName);
}

class UsersData {
  static get storageName() { return 'usersData' };
  static add = (key, data) => StorageInfo.add(this.storageName, key, data);
  static get = (key) => StorageInfo.get(this.storageName, key);
  static remove = (key) => StorageInfo.remove(this.storageName, key);
  static clear = () => StorageInfo.clear(this.storageName);
}

export const handleAuth = [

  rest.post('/api/auth', async (req, res, ctx) => {

    const { login, password } = await req.json();
    const user = usersData.find(user => user.login === login);

    if (!user) return res(ctx.text('Error'), ctx.status(400, 'User not found!'));
    if (password != user.password) return res(ctx.text('Error'), ctx.status(400, 'Wrong password!'));

    const now = new Date(Date.now());
    const sessionID = `${login}_${now.toLocaleDateString('ru', { year: "2-digit", month: "2-digit", day: "2-digit" })}`;

    Sessions.add(sessionID, user);

    return res(
      ctx.cookie('session', sessionID, {
        expires: new Date('01.01.2025'),
      })
    );
  }),

  rest.get('/api/auth/me', async (req, res, ctx) => {
    const { session } = req.cookies;
    if (!Sessions.get(session)) return res(ctx.body(false));
    return res(
      ctx.body(true)
    )
  }),

  rest.get('/api/auth/logout', (req, res, ctx) => {
    const { session } = req.cookies;
    if (Sessions.get(session)) {
      Sessions.remove(session);
      return res();
    };
    return res(ctx.status(400, 'Could not logout'));
  })
]
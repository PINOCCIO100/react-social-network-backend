import { rest } from "msw";

import usersProfileInfoJSON from '../db/usersProfileInfo.json';

export const handleGetUsersProfileInfo =
  [

    // Возвращает профиля пользователей на конкретной странице page (с определенным их количеством  на странице count)
    rest.get('api/users', async (req, res, ctx) => {
      const totalCount = usersProfileInfoJSON.length
      const page = req.url.searchParams.get('page');
      const count = req.url.searchParams.get('count');
      //TODO: Разобраться, почему json файл парсится автоматически 
      const usersProfileInfo = usersProfileInfoJSON.slice(count * (page - 1), count * page);
      return res(ctx.json({
        usersProfileInfo,
        totalCount,
      }))
    }),

    // Возвращает профиль пользователя по userID
    rest.get('api/users/:userID', async (req, res, ctx) => {
      //TODO: Разобраться, почему json файл парсится автоматически 
      return res(ctx.json(
        usersProfileInfoJSON.find(p => req.params.userID == p.id)
      ))
    }),

  ]
import { Router } from 'express';

import { getUsersList, getUserProfile } from '../controllers/usersProfileController.js';

export const usersProfileRoute = Router();

usersProfileRoute.get('/', getUsersList);
usersProfileRoute.get('/:userID', getUserProfile);

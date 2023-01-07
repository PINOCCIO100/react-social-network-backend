const { Router } = require('express');
const { getUsersAvatarsController } = require('../controllers/usersAvatarsController');

const usersAvatarsRoute = Router();

usersAvatarsRoute.get('/:userID', getUsersAvatarsController);

exports.usersAvatarsRoute = usersAvatarsRoute;
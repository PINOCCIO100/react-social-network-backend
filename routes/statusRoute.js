const { Router } = require("express");
const { getUserStatus, createUserStatus, deleteUserStatus } = require("../controllers/statusController");

const statusRoute = Router();

statusRoute.get('/:userID', getUserStatus);

statusRoute.post('/:userID', createUserStatus);

statusRoute.delete('/:userID', deleteUserStatus);

exports.statusRoute = statusRoute;
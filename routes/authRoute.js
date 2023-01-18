const { Router } = require("express");
const { authUser, authStatus } = require("../controllers/authController");

const authRouter = Router();

authRouter.post('/', authUser);

authRouter.get('/me', authStatus);

exports.authRouter = authRouter;
const { Router } = require("express");
const { authController } = require("../controllers/authController");

const authRouter = Router();

authRouter.post('/', authController)

exports.authRouter = authRouter;
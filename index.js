import express from "express";

import { cors } from "./middlewares/CORS.js";
import { logger } from './middlewares/logger.js';
import { debugMW } from './middlewares/debugMW.js';
import { usersAvatarsChecker } from "./middlewares/usersAvatarsChecker.js";

import { usersProfileRoute } from './routes/usersProfileRoute.js';
import path from "path";
// const PORT = process.env.PORT ?? 3001;

const PORT = 3001;
const __dirname = path.resolve();
const app = express();

// app.use(logger);
// app.use(debugMW);

app.use(cors);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.get('//avatars/*', usersAvatarsChecker);

app.use(express.static('public'));

app.use('/api/users/', usersProfileRoute);



app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);
});

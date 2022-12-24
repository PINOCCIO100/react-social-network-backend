const express = require('express');
const { cors } = require('./middlewares/CORS.js');
const { logger } = require('./middlewares/logger.js');
const { debugMW } = require('./middlewares/debugMW.js');
const { usersAvatarsChecker } = require("./middlewares/usersAvatarsChecker.js");
const { usersProfileRoute } = require('./routes/usersProfileRoute.js');
const path = require("path");

// const PORT = process.env.PORT ?? 3001;

const PORT = 3001;
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

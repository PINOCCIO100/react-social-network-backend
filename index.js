const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { logger } = require('./middlewares/logger.js');
const { debugMW } = require('./middlewares/debugMW.js');
const { usersProfileRoute } = require('./routes/usersProfileRoute.js');
const { usersAvatarsRoute } = require('./routes/usersAvatarsRoute.js');
const { authRouter } = require('./routes/authRoute.js');

// const PORT = process.env.PORT ?? 3001;

const PORT = 3001;
const app = express();

// app.use(logger);
// app.use(debugMW);

app.use(cors({ origin: 'http://localhost:3000' }));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing cookies
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/avatars', usersAvatarsRoute);

app.use('/api/users', usersProfileRoute);

app.use(express.static('public'));

app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);
});

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { logger } = require('./middlewares/logger.js');
const { usersProfileRoute } = require('./routes/usersProfileRoute.js');
const { usersAvatarsRoute } = require('./routes/usersAvatarsRoute.js');
const { authRouter } = require('./routes/authRoute.js');
const authCheckerMD = require('./middlewares/authCheckerMD.js');

const MONGODB_SERVER_URL = 'mongodb://127.0.0.1:27017/MongoDB_for_React';

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/MongoDB_for_React', () => {
  console.log(`Server connected to database ${MONGODB_SERVER_URL}...`);
});

// const PORT = process.env.PORT ?? 3001;

const PORT = 3001;
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing cookies
app.use(cookieParser('secret'));

// app.use(logger);

app.use('/api/auth', authRouter);

//Проверка на авторизованность пользователя по кукам (корректный id сессии)
app.use(authCheckerMD);

app.use('/api/avatars', usersAvatarsRoute);

app.use('/api/users', usersProfileRoute);

app.use(express.static('public'));

app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);
});

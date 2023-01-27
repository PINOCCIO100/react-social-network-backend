const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { logger } = require('./middlewares/logger.js');
const { usersProfileRoute } = require('./routes/usersProfileRoute.js');
const { usersAvatarsRoute } = require('./routes/usersAvatarsRoute.js');
const { authRoute } = require('./routes/authRoute.js');
const { followRoute } = require('./routes/followRoute.js');
const authChecker = require('./middlewares/authChecker');
const { messagesRoute } = require('./routes/messagesRoute.js');

const MONGODB_URL = `${process.env.MONGODB_SERVER}/${process.env.MONGODB_COLLECTION}`;

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URL, () => {
  console.log(`Server connected to database ${MONGODB_URL}...`);
},
  (e) => {
    console.log(`Error on connect to ${MONGODB_URL}`);
    console.log(e.message);
  }
);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: process.env.REACT_HOST, credentials: true, }));

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing cookies
app.use(cookieParser('secret'));

// app.use(logger);

app.use('/api/auth', authRoute);

//Проверка на авторизованность пользователя по кукам (корректный id сессии)
app.use(authChecker);

app.use('/api/avatars', usersAvatarsRoute);

app.use('/api/users', usersProfileRoute);

app.use('/api/follow', followRoute);

app.use('/api/messages', messagesRoute);

app.use(express.static('public'));

app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);
});

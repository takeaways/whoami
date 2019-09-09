const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const talkAPIRouter = require('./routes/talk');
const talksAPIRouter = require('./routes/talks');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
  },
  name: 'wai',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/talk', talkAPIRouter);
app.use('/api/talks', talksAPIRouter);


app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

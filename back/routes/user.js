const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

//로드유저
router.get('/', (req, res) => { // /api/user/
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다.');
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

//회원가입
router.post('/', async (req, res, next) => {
  try {
    const userCheck = await db.User.findOne({
      where:{
        email:req.body.email
      }
    });
    if(userCheck) return res.status(400).send('Registered Email!');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname:req.body.nickname,
      email:req.body.email,
      password:hashedPassword,
    });
    return res.send('SUCCESS REGISTER ACCOUNT');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//로그인
router.post('/login', (req, res, next) => { // POST /api/user/login
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ['id', 'nickname', 'email'],
        });
        console.log(fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

//로그아웃
router.post('/logout', (req, res) => { // /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('logout 성공');
});

module.exports = router;

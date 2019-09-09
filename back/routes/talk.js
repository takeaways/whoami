const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post
  try {
    const newTalk = await db.Talk.create({
      content: req.body.text,
      UserId: req.user.id,
    });
    const fullPost = await db.Talk.findOne({
      where: { id: newTalk.id },
      include: [{
        model: db.User,
        attributes:['id','nickname','email']
      },{
        model: db.Comment
      }],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => { // POST /api/post
  try {
    if(!req.user) return res.status(403).send('로그인이 필요합니다.');
    const talk = await db.Talk.findOne({where:{id:parseInt(req.params.id)}});
    if(!talk) return res.status(404).send('Not Found Talk');
    await db.Talk.destroy({
      where:{
        id:req.params.id
      }
    });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => { // POST /api/post
  try {
    if(!req.user) return res.status(403).send('로그인이 필요합니다!!');
    const talk = await db.Talk.findOne({
      where:{
        id:req.params.id
      }
    });
    if(!talk) return res.status(404).send('수정할 내용이 없습니다.');
    await db.Talk.update({
      content:req.body.content,
    },{
      where:{
        id:req.params.id
      }
    });
    res.send(req.body.content);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/comment', async (req, res, next) => { // POST /api/post
  try {
    if(!req.user) return res.status(403).send('로그인이 필요합니다.')
    const talk = await db.Talk.findOne({where:{id:req.body.postId}})
    if(!talk) return res.status(404).send('Not Found Talk');
    const newComment = await db.Comment.create({
      TalkId:talk.id,
      UserId:req.user.id,
      content:req.body.content
    });
    const comment = await db.Comment.findOne({
      where:{
        id:newComment.id,
      },
      include:[{
        model:db.User,
        attributes:['id','nickname','email']
      }]
    });
    res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

import React, {useCallback, useState, useEffect} from 'react';
import {Avatar, Button, Comment, Card, Icon, List, Popover} from 'antd';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';

import CommentForm from './CommentForm';
import CommentList from './CommentList'
import FixForm from './FixForm';
import {
  DELETE_TALK_REQUEST
} from '../reducers/talk'

const ShowText = ({post}) =>{
  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const {editedTalk} = useSelector(state => state.talk);
  const [open, setOpen] = useState(false);
  const [openFix, setOpenFix] = useState(false);
  const [click, setClick] = useState(false);
  const onOpenCommentForm = useCallback( () => setOpen(pre => !pre) ,[]);

  const onDelete = useCallback( (id) => () => {
    dispatch({
      type:DELETE_TALK_REQUEST,
      data:id
    })
  },[]);

  const onOpenFix = useCallback(()=> setOpenFix(pre=>!pre),[]);

  useEffect(()=>{
    if(editedTalk){
      setOpenFix(false);
    }
  },[editedTalk === true]);

  return (
    <div>
      <Card style={{marginTop:'20px',marginRight:'20px',marginLeft:'20px'}}
        actions={[
          <Popover key='popupMessage' content={me && me.id ? '댓글은 삭제할 수 없습니다. 신중하게 작성부탁 드립니다 :)' : '댓글 보기 :) - 로그인 하시면 댓글 작성 가능합니다.'}>
            <Icon type="message" key="message" onClick={onOpenCommentForm}/>
          </Popover>,
          <Popover key="fix" content={(
            <Button.Group>
              { me && me.id === post.User.id ? (<>
                <Button type="primary" onClick={onOpenFix}>수정</Button>
                <Button type="info" onClick={onDelete(post.id)} >삭제</Button>
              </>) : <Button type="danger"><Link href="https://github.com/nomadGeonilJang"><a>DEVJANG - GITHUB</a></Link></Button>}
            </Button.Group>
          )}>
          <Icon type="ellipsis" key="ellipsis"/>
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={(<Link href={`/`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>)}
          title={<Popover key='userEmail' content={post.User.email}>{post.User.nickname}</Popover>}
          description={openFix ? <FixForm content={post.content} postId={post.id}/>: post.content}
        />
      </Card>
      { open && me && me.id !== undefined ? <CommentForm id={post.id}/> : null}
      { open && <CommentList comment={post.Comments}/> }
    </div>
  )
}

export default ShowText;

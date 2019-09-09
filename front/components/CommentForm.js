import React, {useCallback, useState, useEffect} from 'react';
import {Form, Button, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_COMMENT_REQUEST} from '../reducers/talk';

const CommentForm = ({id}) =>{

  const dispatch = useDispatch();
  const {addedComment} = useSelector(state => state.talk);

  const [text, setText] = useState('');
  const onChangeText = useCallback(e=> setText(e.target.value), []);

  const onSubmit = useCallback( e =>{
    e.preventDefault();
    dispatch({
      type:ADD_COMMENT_REQUEST,
      data:{
        postId:id,
        content:text
      }
    })
  },[text, id]);

  useEffect(()=>{
    if(addedComment){
      setText('');
    }
  },[addedComment && addedComment===true])
  return(
    <Form onSubmit={onSubmit} style={{padding:'0 20px'}}>
      <Input.TextArea value={text} onChange={onChangeText} placeholder="댓글을 입력하세요..." />
      <Button type="primary" htmlType="submit" style={{float:'right',zIndex:'5000'}}>댓글</Button>
    </Form>
  )
}



export default CommentForm

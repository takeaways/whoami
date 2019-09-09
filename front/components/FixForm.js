import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Input, Form, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {EDIT_TALK_REQUEST} from '../reducers/talk';

const FixForm = ({content, postId}) => {

  const dispatch = useDispatch();
  const {isEditingTalk, editedTalk} = useSelector(state=>state.talk);


  const [text, setText] = useState('');
  const onChangeText = useCallback(e=>setText(e.target.value),[]);
  const defaultText = useRef(content)
  const onSubmit = useCallback((e)=>{
    e.preventDefault();
    if(!text || !text.trim()) return alert('내용을 입력해 주세요!!');
    if(defaultText.current === text) return alert('수정된 내용이 없습니다!!')
    dispatch({
      type:EDIT_TALK_REQUEST,
      data:{
        postId,
        text
      }
    })
  },[text, defaultText]);

  useEffect(()=>{
    setText(content);
  },[content])

  return(
    <Form onSubmit={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText}/>
      <Button style={{float:'right'}} type="primary" htmlType="submit" loading={isEditingTalk}>수정</Button>
    </Form>
  )
}

export default FixForm;

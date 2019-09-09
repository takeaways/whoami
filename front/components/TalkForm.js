import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Button, Spin} from 'antd';
import styled from 'styled-components';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {ADD_TALK_REQUEST} from '../reducers/talk';


const TalkForm = () => {

  const dispatch = useDispatch();
  const {isAddingTalk, addedTalk} = useSelector(state => state.talk);
  const {isLogingOut} = useSelector(state => state.user);

  const [text, setText] = useState('');
  const onChangeText = useCallback( e => setText(e.target.value));

  const onSubmit = useCallback(e=>{
    e.preventDefault();
    if(!text) return alert("Write Your Words !!");
    dispatch({
      type:ADD_TALK_REQUEST,
      data:text,
    })
  },[text]);

  useEffect(()=>{
    if(addedTalk)
    setText('');
  },[addedTalk && addedTalk === true])

  return(
    <Form onSubmit={onSubmit}>
      <Form.Item label="내용을 입력하세요 " style={{marginBottom:0}}>
        <Input.TextArea rows={3} value={text} onChange={onChangeText}/>
      </Form.Item>
      <Button type="primary" htmlType="submit" style={{width:'100%'}} loading={isAddingTalk}>등록하기</Button>
    </Form>
  )
}

export default TalkForm;

import React, {useState, useCallback, useEffect,memo} from 'react';
import {Form, Button, Input} from 'antd';

import {useDispatch, useSelector } from 'react-redux';
import {
  LOG_IN_REQUEST,
} from '../reducers/user';


const LoginForm = memo(() => {

  const dispatch = useDispatch();
  const {isLogingIn,} = useSelector(state=>state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback( e => setEmail(e.target.value), []);
  const onChangePassword = useCallback( e => setPassword(e.target.value), []);
  const onSubmit = useCallback( e => {
    e.preventDefault();
    if(!email || !password){
      if(!email) alert('이메일을 입력하세요!!');
      if(!password) alert('비밀번호를 입력하세요!!');
      return
    }
    dispatch({
      type:LOG_IN_REQUEST,
      data:{email, password}
    })
  },[email, password]);


  return(
    <Form onSubmit={onSubmit}>
      <Input autoComplete="username" placeholder="이메일을 입력하세요..." addonBefore="&nbsp;ID&nbsp;" style={{marginBottom:'5px'}} value={email} onChange={onChangeEmail}/>
      <Input.Password autoComplete="current-password" placeholder="비밀번호를 입력하세요..." addonBefore="PW" style={{marginBottom:'5px'}} value={password} onChange={onChangePassword}/>
      <Button htmlType="submit" type="primary" style={{float:'right', marginBottom:'20px'}} loading={isLogingIn}>로그인</Button>
    </Form>
  )
});

export default LoginForm;

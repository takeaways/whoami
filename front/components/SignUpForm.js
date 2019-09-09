import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import {
  SIGN_UP_REQUEST
} from '../reducers/user';

const SignUpForm = () => {

  const dispatch = useDispatch();
  const {isSigninigUp, signedUp, signupError} = useSelector(state=>state.user);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onChangeEmail = useCallback( e => setEmail(e.target.value) , [] );
  const onChangeNickname = useCallback( e => setNickname(e.target.value), []);
  const onChangePassword = useCallback( e => setPassword(e.target.value), []);
  const onChangePasswordCheck = useCallback( e => setPasswordCheck(e.target.value), []);

  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');

  const onFocus = useCallback( () => {
    setEmailError('');
    setNicknameError('');
    setPasswordError('');
    setPasswordCheckError('');
  },[]);

  const onSubmit = useCallback( e => {
    e.preventDefault();
    if(!email || !nickname || !password || !passwordCheck){
      if(!email) setEmailError('이메일을 입력해 주세요!!');
      if(!nickname) setNicknameError('닉네임을 입력해주세요!!');
      if(!password) setPasswordError('비밀번호를 입력해주세요!!');
      if(!passwordCheck) setPasswordCheckError('비밀번호 확인 칸을 확인해 주세요!!');
      return
    }
    if(password !== passwordCheck) {
      setPasswordCheckError('비밀번호가 다릅니다!!');
      return
    }
    const regEmail = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i);
    if(!(email.match(regEmail))) return alert('이메일 형식이 이상합니다.')

    dispatch({
      type:SIGN_UP_REQUEST,
      data:{email, nickname, password}
    })
  },[email, nickname, password, passwordCheck]);

  useEffect(()=>{
    if(signedUp) {
      Router.push('/')
    }
    if(signupError !== '') alert(signupError);
  },[signedUp,isSigninigUp ,signupError]);

  return (
    <Row>
    <Col xs={24} md={6}></Col>
    <Col  xs={24} md={12}>
    <Form style={{padding:30}} onSubmit={onSubmit}>
      <Form.Item label="E-mail">
        <Input placeholder="E-mail" value={email} onChange={onChangeEmail} onFocus={onFocus}/>
        { emailError !== '' ? <span style={{color:'red'}}>{emailError}</span> : ''}
      </Form.Item>
      <Form.Item label="Nickname">
        <Input placeholder="Nickname" value={nickname} onChange={onChangeNickname} onFocus={onFocus}/>
        { nicknameError !== '' ? <span style={{color:'red'}}>{nicknameError}</span> : ''}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        <Input.Password placeholder="Password" value={password} onChange={onChangePassword} onFocus={onFocus}/>
        { passwordError !== '' ? <span style={{color:'red'}}>{passwordError}</span> : ''}
      </Form.Item>
      <Form.Item label="Password Check" hasFeedback>
        <Input.Password placeholder="Password Check" value={passwordCheck} onChange={onChangePasswordCheck} onFocus={onFocus}/>
        { passwordCheckError !== '' ? <span style={{color:'red'}}>{passwordCheckError}</span> : ''}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{float:'right'}} loading={isSigninigUp}>Register</Button>
      </Form.Item>
    </Form>
    </Col>
    <Col xs={24} md={6}></Col>
    </Row>
  )
}

export default SignUpForm;

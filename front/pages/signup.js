import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import Router from 'next/router';
import SignUpForm from '../components/SignUpForm'


const Signup = () => {
  const {me} = useSelector(state => state.user);

  useEffect(()=>{
    if(me && me.id) {
      alert('로그인 상태입니다.')
      Router.push('/');
    }
  },[me && me.id]);

  if(me && me.id) return null
  return (<SignUpForm/>)
}

export default Signup;

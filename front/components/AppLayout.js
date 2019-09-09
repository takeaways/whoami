import React, {useCallback, useEffect} from 'react';
import Link from 'next/link';
import { Menu, Input, Button, Spin } from 'antd';

import {useDispatch, useSelector} from 'react-redux';
import {
  LOG_OUT_REQUEST
} from '../reducers/user';

const AppLayout = ({children}) => {
  const dispatch = useDispatch();
  const {me, logedOut, isLogingOut} = useSelector(state => state.user);
  const onLogout = useCallback( () => {
    dispatch({
      type:LOG_OUT_REQUEST
    })
  },[]);

  useEffect(()=>{
    if(logedOut){
      alert('로그아웃 했습니다.')
    }
  },[logedOut])

  return(
    <>
      <nav>
        <Menu mode="horizontal">
          <Menu.Item key="home"><Link href="/"><a>홈</a></Link></Menu.Item>
          <Menu.Item key="info"><Link href="/info"><a>소개</a></Link></Menu.Item>
          { me && me.id !== undefined ? <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item> : null}
          { me && me.id !== undefined ? <Menu.Item key="logout" onClick={onLogout}>{ isLogingOut ? <>{'Logout'} <Spin/></> : '로그아웃'}</Menu.Item> : null}
          { me && me.id === undefined ? <Menu.Item key="signup"><Link href="/signup"><a>회원가입</a></Link></Menu.Item> : null}
          { me && me.id !== undefined ? <Menu.Item key="userInfo" style={{float:'right', marginRight:'10px'}}><span style={{fontWeight:'1000'}}><img style={{marginBottom:'3px',width:'15px'}} src="https://i.gifer.com/KULY.gif"/><Link href='/profile'><a> {me.nickname} </a></Link><img style={{marginBottom:'3px',width:'15px'}} src="https://i.gifer.com/KULY.gif"/></span></Menu.Item> : null}
        </Menu>
      </nav>
      <div>
        {children}
      </div>
    </>
  )
}

export default AppLayout;

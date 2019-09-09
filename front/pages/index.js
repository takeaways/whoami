import React,{useEffect} from 'react';
import Head from 'next/head';
import TalkForm from '../components/TalkForm';
import { Row, Col, Spin } from 'antd'
import styled from 'styled-components';

import {useSelector, useDispatch} from 'react-redux';

import ShowText from '../components/ShowText';
import LoginForm from '../components/LoginForm';

import {LOAD_TALK_REQUEST} from '../reducers/talk';

const indexRowCss = {
  marginTop: '5px',
  height:'85vh',
  padding:'15px 20px',
}


const Home = () => {

  const dispatch = useDispatch();
  const {editedTalk} = useSelector(state => state.talk);

  const {me} = useSelector(state => state.user);
  const {talks} = useSelector(state => state.talk);

  useEffect(()=>{
    if(editedTalk){
      alert('수정했습니다');
    }
  },[editedTalk === true]);

  return (
    <Row style={indexRowCss} gutter={20}>
      <Col xs={24} md={6}>
        { me && me.id !== undefined  ? <TalkForm/> : <LoginForm/> }
      </Col>
      <Col xs={24} md={18} style={{height:'95%', overflow:'scroll', overflowX:'hidden'}}>
        {talks && talks.length !== 0 ? talks.map(post => <ShowText key={post.id} post={post} />) : <Spin/>}
      </Col>
    </Row>
  );
}

Home.getInitialProps = async (context) => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_TALK_REQUEST,
  })
}


export default Home

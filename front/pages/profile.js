import React,{memo, useEffect} from 'react';
import {Card, Avatar} from 'antd';
import Router from 'next/router'
import {useSelector} from 'react-redux';

const Profile = memo(() => {
  const {me} = useSelector(state=>state.user);
  useEffect(()=>{
    if(!me.id){
      Router.push('/')
    }
  },[me && me.id]);

  if(me && !me.id) return null;




  return(
    <div style={{height:'95.4vh', padding:'20vh 100px'}}>
      <Card
        hoverable
        cover={<img style={{height:'400px'}} alt="profileEx" src="https://cdn.pixabay.com/photo/2019/09/06/12/08/bridge-4456255_1280.jpg" />}
      >
        <Card.Meta
          title={me && me.nickname}
          description={me && me.email}
        />
      </Card>
    </div>
  )
});

export default Profile;

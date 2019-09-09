import React,{memo} from 'react';
import {List, Comment, Avatar } from 'antd';
import {useSelector} from 'react-redux';

const Info = memo(() => {
  const info = [{
    date:'2011.03',
    content:'전자공학과 입학'
  },{
    date:'2015.09 ~ 2016.09',
    content:'Alliant International University 에서 ESL 수료'
  },{
    date:'2016.06 ~ 2017.12',
    content:'스프링 웍스 - 인턴 [ Developer ]'
  },{
    date:'2018.02',
    content:'전자공학과 졸업'
  },{
    date:'2018.12 ~ 현재',
    content:'N사 이커머스 [ Technical Support ]'
  }]
  return(
    <div style={{height:'95.4vh', padding:'20vh 100px'}}>
      <List
        style={{padding:'0 20px'}}
        header={'개발자 소개'}
        itemLayout="horizontal"
        dataSource={info}
        renderItem={item=>(
          <li style={{marginTop:'12px'}}>
            [ {item.date} ] : {item.content}
          </li>
        )}
      >
      </List>
    </div>
  )
});

export default Info;

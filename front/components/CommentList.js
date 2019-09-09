import React from 'react';
import {List, Comment, Avatar, Popover} from 'antd';
import Link from 'next/link';

const CommentList = ({comment}) => {
  return (
    <List
      style={{padding:'0 20px'}}
      header={`${comment ? comment.length : 0} 댓글`}
      itemLayout="horizontal"
      dataSource={comment || []}
      renderItem={item=>(
        <li style={{listStyle:'none'}}>
          <Comment
            author={<Popover key="commentEmail" content={item.User.email}>{item.User.nickname}</Popover>}
            avatar={(<Avatar>{item.User.nickname[0]}</Avatar>)}
            content={item.content}
          />
        </li>
      )}
    >
    </List>
  )
}

export default CommentList;

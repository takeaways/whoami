import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_TALK_REQUEST,
  ADD_TALK_SUCCESS,
  ADD_TALK_FAILURE,
  DELETE_TALK_REQUEST,
  DELETE_TALK_SUCCESS,
  DELETE_TALK_FAILURE,
  EDIT_TALK_REQUEST,
  EDIT_TALK_SUCCESS,
  EDIT_TALK_FAILURE,
  LOAD_TALK_REQUEST,
  LOAD_TALK_SUCCESS,
  LOAD_TALK_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from '../reducers/talk';


//watchLoadTalk
function* watchLoadTalk(){
  yield takeLatest(LOAD_TALK_REQUEST, loadTalk);
}
function loadTalksAPI(){
  return axios.get('/talks')
}
function* loadTalk(action){
  try {
    const result = yield call(loadTalksAPI)
    yield put({
      type:LOAD_TALK_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_TALK_FAILURE,
      error:e.response.data
    })
  }
}

//watchAddTalk
function* watchAddTalk(){
  yield takeLatest(ADD_TALK_REQUEST, addTalk);
}
function addTalkAPI(text){
  return axios.post('/talk', {text}, {
    withCredentials:true,
  })
}
function* addTalk(action){
  try {
    const result = yield call(addTalkAPI, action.data)
    yield put({
      type:ADD_TALK_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:ADD_TALK_FAILURE,
      error:e.response.data
    })
  }
}

//watchAddComment
function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function addCommentAPI(commentData){
  return axios.post('/talk/comment', commentData, {
    withCredentials:true,
  })
}
function* addComment(action){
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type:ADD_COMMENT_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:ADD_COMMENT_FAILURE,
      error:e.response.data
    })
  }
}

//watchDeletTalk
function* watchDeletTalk(){
  yield takeLatest(DELETE_TALK_REQUEST, deleteTalk);
}
function deleteTalkAPI(id){
  return axios.delete(`/talk/${id}`, {
    withCredentials:true,
  })
}
function* deleteTalk(action){
  try {
    const result = yield call(deleteTalkAPI, action.data)
    yield put({
      type:DELETE_TALK_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:DELETE_TALK_FAILURE,
      error:e.response.data
    })
  }
}

//watchEditTalk
function* watchEditTalk(){
  yield takeLatest(EDIT_TALK_REQUEST, editTalk);
}
function editTalkAPI({text, postId}){
  return axios.patch(`/talk/${postId}`, {content:text}, {
    withCredentials:true,
  })
}
function* editTalk(action){
  try {
    const result = yield call(editTalkAPI, action.data)
    yield put({
      type:EDIT_TALK_SUCCESS,
      data:{
        content:result.data,
        talkId:action.data.postId
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:EDIT_TALK_FAILURE,
      error:e.response.data
    })
  }
}





export default function* talkSaga(){
  yield all([
    fork(watchLoadTalk),
    fork(watchAddTalk),
    fork(watchDeletTalk),
    fork(watchAddComment),
    fork(watchEditTalk),
  ])
}

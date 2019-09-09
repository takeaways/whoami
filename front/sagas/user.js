import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

const dummyUser ={
  id:1,
  nickname:"DevJang"
}

//watchSignup
function* watchSignup(){
  yield takeLatest(SIGN_UP_REQUEST, signup);
}
function signUpAPI(signUpData){
  return axios.post('/user/', signUpData);
}
function* signup(action){
  try {
    yield call(signUpAPI, action.data)
    yield put({
      type:SIGN_UP_SUCCESS,
    })
  } catch (e) {
    console.dir(e);
    yield put({
      type:SIGN_UP_FAILURE,
      error:e.response.data
    })
  }
}

//watchLogin
function* watchLogin(){
  yield takeLatest(LOG_IN_REQUEST, login);
}
function loginAPI(loginData){
  return axios.post('/user/login/', loginData,{
    withCredentials: true,
  });
}
function* login(action){
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type:LOG_IN_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:LOG_IN_FAILURE,
      error:e.response.data
    })
  }
}

//watchLogout
function* watchLogout(){
  yield takeLatest(LOG_OUT_REQUEST, logout);
}
function logOutAPI(){
  return axios.post('/user/logout',{},{
    withCredentials:true
  })
}
function* logout(action){
  try {
    yield call(logOutAPI);
    yield put({
      type:LOG_OUT_SUCCESS,
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:LOG_OUT_FAILURE,
      error:e
    })
  }
}

//watchLoadUser
function* watchLoadUser(){
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function loadUserAPI(){
  return axios.get('/user',{
    withCredentials:true,
  })
}
function* loadUser(action){
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type:LOAD_USER_SUCCESS,
      data:result.data
    })
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_USER_FAILURE,
      error:e
    })
  }
}




export default function* userSaga(){
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
  ])
}

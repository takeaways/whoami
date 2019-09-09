import React, {useEffect} from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import axios from 'axios'
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga'
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../reducers';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import AppLayout from '../components/AppLayout';
import {LOAD_USER_REQUEST} from '../reducers/user';

const WhoAmI = ({Component, store, pageProps}) => {

  return (
    <Provider store={store}>
      <Head>
        <title>WhoAmI</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
        <link rel="icon" href="https://avatars1.githubusercontent.com/u/52693107?s=460&v=4"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </Provider>
  )
}

WhoAmI.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
}

WhoAmI.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  const state = ctx.store.getState();
  let pageProps = {};

  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if(ctx.isServer && cookie){
    axios.defaults.headers.Cookie = cookie;
  }

  if(!state.user.me.id){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST
    })
  }

  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx) || {};
  return { pageProps };
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // 추가
  return store;
}

export default withRedux(configureStore)(withReduxSaga(WhoAmI));

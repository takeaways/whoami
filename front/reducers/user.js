export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';


const initialState = {
  isSigninigUp:false,
  signedUp:false,
  signupError:'',
  isLogingIn:false,
  logedIn:false,
  loginError:'',
  isLogingOut:false,
  logedOut:false,
  logoutError:'',
  me:{},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:{
      return{
        ...state,
        isSigninigUp:true,
        signupError:'',
        signedUp:false,
      };
    }
    case SIGN_UP_SUCCESS:{
      alert('회원가입 되었습니다.')
      return{
        ...state,
        isSigninigUp:false,
        signedUp:true
      };
    }
    case SIGN_UP_FAILURE:{
      return{
        ...state,
        isSigninigUp:false,
        signupError:action.error
      };
    }
    case LOG_IN_REQUEST:{
      return{
        ...state,
        isLogingIn:true,
        loginError:'',
        logedIn:false,
        logedOut:false,
        me:{},
      };
    }
    case LOG_IN_SUCCESS:{
      return{
        ...state,
        isLogingIn:false,
        logedIn:true,
        me:action.data
      };
    }
    case LOG_IN_FAILURE:{
      alert(action.error)
      return{
        ...state,
        isLogingIn:false,
        loginError:action.error,
      };
    }
    case LOG_OUT_REQUEST:{
      return{
        ...state,
        isLogingOut:true,
        logoutError:'',
        logedOut:false,
      };
    }
    case LOG_OUT_SUCCESS:{
      return{
        ...state,
        isLogingOut:false,
        logedOut:true,
        me:{}
      };
    }
    case LOG_OUT_FAILURE:{
      return{
        ...state,
        isLogingOut:false,
        logoutError:action.error
      };
    }
    case LOAD_USER_REQUEST:{
      return{
        ...state,
        signedUp:false,
        logedIn:false,
        logedOut:false,
      };
    }
    case LOAD_USER_SUCCESS:{
      return{
        ...state,
        me:action.data
      };
    }
    case LOAD_USER_FAILURE:{
      return{
        ...state,
      };
    }
    default:{
      return {...state}
    }
  }
}

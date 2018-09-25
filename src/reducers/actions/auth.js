import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, LOGOUT_REQUEST
} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import cookie from 'js-cookie';
import {API_CONFIG} from '../../config/api';
import { message } from 'antd';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function loginUser(creds, cbk) {
  return dispatch => {
    dispatch(requestLogin(creds));
    cFetch(API_CONFIG.host + "/api/company/login", {
      method: "POST",
      body: creds
    }).then((response) => {
      // if(response.status==200){
        localStorage.setItem('auth_token', response.auth_token);
      // 用户登录成功后 ，直接请求 permiss 信息 ，并且存储到 用户信息token中
        dispatch(receiveLogin(response));
      // }else{
      //   message.error('用户名或密码错误');
      // }
    });
  };
}

export function logoutUser() {
  return dispatch => {

    dispatch(receiveLogout());
    let url=API_CONFIG.host + "/api/company/sessions/destroy";
      cFetch(url,{
        method: "GET"
      }).then((response) => {
        dispatch(requestLogout());
        localStorage.removeItem('auth_token');
        // 清空 storage 权限
        localStorage.removeItem('auth_permiss');
      });
  };
}


//发送验证码
export function sendCaptcha(params) {
 let url= API_CONFIG.host + "/api/mobile/sessions/send_sms";
  // let url="/manage/data/fx/settings/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    })
  }
};

//注册
export function saveUser(params) {
  let url= API_CONFIG.host + "/api/mobile/sign";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    })
  }
};

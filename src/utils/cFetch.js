import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import cookie from 'js-cookie';

import {push} from 'react-router-redux'
import { API_CONFIG } from './../config/api';

import { Modal,message } from 'antd';
import configureStore from '../store/configureStore';

function setUriParam(keys, value, keyPostfix) {
  let keyStr = keys[0];

  keys.slice(1).forEach((key) => {
    keyStr += `[${key}]`;
  });

  if (keyPostfix) {
    keyStr += keyPostfix;
  }

  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
  const array = [];

  if (object instanceof(Array)) {
    object.forEach((value) => {
      array.push(setUriParam(keys, value, '[]'));
    });
  } else if (object instanceof(Object)) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];

        array.push(getUriParam(keys.concat(key), value));
      }
    }
  } else {
    if (object !== undefined) {
      array.push(setUriParam(keys, object));
    }
  }

  return array.join('&');
}

function toQueryString(object) {
  const array = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key]);

      if (str !== '') {
        array.push(str);
      }
    }
  }

  return array.join('&');
}


function check401(res) {
  if (res.status === 401) {
    return res.json().then(function(data) {
      if( data.msg ){
        message.error(data.msg);
        configureStore().dispatch(push("/company/login"))
        return Promise.reject(data);
      }else {
        message.error("没有访问数据权限");
        return Promise.reject(res.status);
      }
    });
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    message.error("当前页面资源不存在");
    return Promise.reject(res.status);
  }
  return res;
}

function check200(res) {
  return res.json().then(function(data) {
    if(res.status >= 200 && res.status < 300) {
      if (data.msg) {
        message.info(data.msg);
      }
      return Promise.resolve(data)
    }else {
      if (data.error) {
        message.error(data.error);
      }
      return Promise.reject(data);
    }
  })
}

function jsonParse(res) {
  return res.json()
}

// TODO: 用户登陆之后，需保存Token至cookie
async  function cFetch(url, options) {
//let mergeUrl = API_CONFIG.baseUri + url;
  let mergeUrl = url;
  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  };

  const opts = Object.assign({}, defaultOptions, {...options});
  //get请求
  if (opts && opts.method == "GET" && opts['params']) {
    mergeUrl = mergeUrl + '?' + toQueryString(opts['params']);
  }

  opts.headers = {
    ...opts.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if(localStorage.getItem('auth_token')){
    opts.headers["token"]=localStorage.getItem('auth_token')
  }
  if(opts.body){
    opts.body=JSON.stringify(opts.body)
  }
  console.log("url-------",mergeUrl)
  console.log("body--------",opts)
  return fetch(mergeUrl, opts)
    .then(check401)
    .then(check404)
    .then(check200)
  // .catch((error) => {
  //   if(!_.includes([403,401,404],error)){
  //     message.error("服务器异常错误")
  //   }
  //   // message.error(error)
  //   // return Promise.reject(error);
  // });
}


export default cFetch;

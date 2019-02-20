import request from '@/utils/request'
import api from './index.js'
import Cookies from 'js-cookie'
var qs = require('qs');
let dev = 0;

// if (+$('body')[0].getAttribute('dev') === 1) {
//     dev = 1;
// }
if (+$('body')[0].getAttribute('dev') === 1) {
    dev = 1;
    var app_id = '48872373383';
    var app_secret = 'Her*HofarjHfj*^)%afjer^%893';
}else{
    var app_id = '8076679181';
    var app_secret = 'obFiI3KrQ4tSofPwyFJUYe0OJNrwKmwb'
}

let timestamp = Date.now();
// let app_id = '48872373383';
// let app_secret = 'Her*HofarjHfj*^)%afjer^%893';
let sign = hex_md5(timestamp + app_secret);
var storage = window.localStorage;
var lang = '';
var login_success = '';


if (storage.getItem("language")) {
    lang = storage.getItem("language")
} else {
    var lan_pre = navigator.language;   //判断除IE外其他浏览器使用语言
    if (!lan_pre) {//判断IE浏览器使用语言
        lan_pre = navigator.browserLanguage;
    }
    if (lan_pre === "zh-CN") {
        lang = 'zh-cn'
    } else {
        lang = 'en'
    }
}


if (fns('uid')) {
    login_success = fns('uid');
} else {
    login_success = "";
}

function fns(cname) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (cname === aCrumb[0]) {
            return aCrumb[1]
        }
        // return unescape(aCrumb[1]);
    }
    return "";
}


export function login(params) {
  if (dev) {
      params.timestamp = timestamp;
      params.lang = lang;
      params.login_success = login_success;
      // data.clear_session   = clear_session;
  }
  params.app_id = app_id;
  params.timestamp = timestamp;
  params.sign = sign;
  params.lang = lang;
  params.login_success = login_success;
  var param = qs.stringify(params);
  return request({
    url: 'presignin',
    method: 'post',
    data: param
  })
}


export function getHttp(params) {
  if (dev) {
      params.app_id = app_id;
      params.timestamp = timestamp;
      params.sign = hex_md5(timestamp + app_secret + Cookies.get('secret'));
      params.lang = lang;
      params.login_success = login_success;
      // data.clear_session   = clear_session;
  }
  params.app_id = app_id;
  params.timestamp = timestamp;
  params.sign = hex_md5(timestamp + app_secret + Cookies.get('secret'));
  params.lang = lang;
  params.login_success = login_success;
  // var param = qs.stringify(params);
  return request({
    url: 'customerservice/admin/unread',
    method: 'get',
    params: params
  })
}

export function postHttp(params) {
  if (dev) {
      params.app_id = app_id;
      params.timestamp = timestamp;
      params.sign = hex_md5(timestamp + app_secret + Cookies.get('secret'));
      params.lang = lang;
      params.login_success = login_success;
      // data.clear_session   = clear_session;
  }
  params.timestamp = timestamp;
  params.app_id = app_id;
  params.sign = hex_md5(timestamp + app_secret + Cookies.get('secret'));
  params.lang = lang;
  params.login_success = login_success;
  var param = qs.stringify(params);
  return request({
    url: 'presignin',
    method: 'post',
    data: param
  })
}



export function getInfo(token) {
  var data = {};
  if (dev) {
      data.app_id = app_id;
      data.timestamp = timestamp;
      data.access_token = token;
      // data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
      data.lang = lang;
      data.login_success = login_success;
      // data.clear_session = clear_session;
  }
  data.timestamp = timestamp;
  data.app_id = app_id;
  data.lang = lang;
  data.access_token = token;
  data.login_success = login_success;
  // var params = qs.stringify(data);
  // return api.get1('customerservice/admin/unread',{}, function (data) {
  //   var data = data.data;
  // },function(res){
  //   if(res.status == '401'){
  //   }
  // })
  return request({
    url: 'customerservice/admin/unread',
    method: 'post',
    data: data
  })
}

export function logout() {
  var params = {};
  if (dev) {
      params.app_id = app_id;
      params.timestamp = timestamp;
      params.sign = sign;
      params.lang = lang;
      params.login_success = login_success;
      // data.clear_session   = clear_session;
  }
  params.timestamp = timestamp;
  params.app_id = app_id;
  params.sign = sign;
  params.lang = lang;
  params.login_success = login_success;
  var param = qs.stringify(params);
  return request({
    url: 'signout',
    method: 'post',
    data: param
  })
}

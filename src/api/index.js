import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import store from '../store'
import { Message } from 'element-ui'
// 配置API接口地址
// var root = 'http://dev-casino-app.famely.com/v1/time/'
var root = 'https://openapp.win.town/v1/time/'
// var root1 = process.env.API_ROOT;debugger
// 引用axios
// var axios = require('axios');
import axios from 'axios'
// import
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

var tokenLogin = getToken();

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


// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    var dataMe = method === 'POST' || method === 'PUT' ? params : null;
    var paramsMe = method === 'GET' || method === 'DELETE' ? params : null;
    axios({
      method: method,
      url: url,
      // data: method === 'POST' || method === 'PUT' ? params : null,
      data: dataMe,
      params: paramsMe,
      baseURL: root,
      withCredentials: false
    })
    .then(function (res) {
            if (res.status == '200') {
                if (success) {
                    success(res.data)
                    return res.data
                }
            } else {

                if (failure) {
                    failure(res.data)
                } else {debugger
                    // window.alert('error: ')
                    // store.dispatch('FedLogOut').then(() => {
                    //   Message.error('登录失效, 请重新登录');
                    //   location.reload();
                    // })
                }
            }
        })
        .catch(function (err) {
            let res = err.response
            if (err) {debugger
                // window.alert(err.message)
                // store.dispatch('FedLogOut').then(() => {
                //   Message.error('登录失效, 请重新登录');
                //   location.reload();
                // })
            }
        })
}

function apiAxiosGet(method, url, params) {
    if (params) {
        params = filterNull(params)
    }
    var dataMe = method === 'POST' || method === 'PUT' ? params : null;
    var paramsMe = method === 'GET' || method === 'DELETE' ? params : null;
    axios({
      method: method,
      url: url,
      // data: method === 'POST' || method === 'PUT' ? params : null,
      data: dataMe,
      params: paramsMe,
      baseURL: root,
      withCredentials: false
    })
}

function apiAxiosPost(method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    var dataMe = method === 'POST' || method === 'PUT' ? params : null;
    var paramsMe = method === 'GET' || method === 'DELETE' ? params : null;
    var param = qs.stringify(params);
    axios({
      method: 'POST',
      url: url,
      // data: method === 'POST' || method === 'PUT' ? params : null,
      data: param,
      // params: paramsMe,
      baseURL: root,
      withCredentials: false
    })
    .then(function (res) {
            if (res.status == '200') {
                if (success) {
                    success(res.data)
                }
            } else {
                if (failure) {
                    failure(res.data)
                } else {debugger
                    // window.alert('error: ')
                    // store.dispatch('FedLogOut').then(() => {
                    //   Message.error('登录失效, 请重新登录');
                    //   location.reload();
                    // })
                }
            }
        })
        .catch(function (err) {
            let res = err.response
            if (err) {debugger
                // window.alert(err.message)
                // store.dispatch('FedLogOut').then(() => {
                //   Message.error('登录失效, 请重新登录');
                //   location.reload();
                // })
            }
        })
}

// 返回在vue模板中的调用接口
export default {
    getCookie(cname) {
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (cname === aCrumb[0])
                return aCrumb[1]
            // return unescape(aCrumb[1]);
        }
        return "";
        // let name = cname + "=";
        // let ca = document.cookie.split(';');
        // for (let i = 0; i < ca.length; i++) {
        //     let c = ca[i];
        //     while (c.charAt(0) == ' ') c = c.substring(1);
        //     // if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        //     if (c.slice(0,3) === 'uid') return c.substring(name.length, c.length);
        // }
        // return "";
    },
    get: function (url, data, success, failure) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.access_token = getToken();
            data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
            data.lang = lang;
            data.login_success = login_success;
            // data.clear_session = clear_session;
        }
        data.timestamp = timestamp;
        data.app_id = app_id;
        data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
        data.access_token = getToken();

        data.lang = lang;
        data.login_success = login_success;
        return apiAxios('GET', url, data, success, failure)
    },
    get1: function (url, data) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.access_token = getToken();
            data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
            data.lang = lang;
            data.login_success = login_success;
            // data.clear_session = clear_session;
        }
        data.timestamp = timestamp;
        data.app_id = app_id;
        data.access_token = getToken();
        data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
        data.lang = lang;
        data.login_success = login_success;
        apiAxiosGet('GET', url, data)
    },
    post: function (url, params, success, failure) {
        if (dev) {
            params.app_id = app_id;
            params.timestamp = timestamp;
            params.access_token = getToken();
            params.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
            params.lang = lang;
            params.login_success = login_success;
            // data.clear_session   = clear_session;
        }
        params.timestamp = timestamp;
        params.app_id = app_id;
        params.access_token = getToken();
        params.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
        params.lang = lang;
        params.login_success = login_success;
        return apiAxiosPost('POST', url, params, success, failure)
    },
    send: function (url, data, success, failure) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.sign = sign;
            data.lang = lang;
            data.login_success = login_success;
        }
        data.timestamp = timestamp;
        data.app_id = app_id;
        data.sign = sign;
        data.lang = lang;
        if (url == 'presignin') {
            data.login_success = '';
        } else {
            data.login_success = login_success;
        }
        return apiAxios('post', url, data, success, failure)
    },
    postlogin: function (url, data, success, failure) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.sign = sign;
            data.lang = lang;
            data.login_success = login_success;
        }
        data.timestamp = timestamp;
        data.app_id = app_id;
        data.sign = sign;
        data.lang = lang;
        if (url == 'presignin') {
            data.login_success = '';
        } else {
            data.login_success = login_success;
        }
        return apiAxiosPost('POST', url, data, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}

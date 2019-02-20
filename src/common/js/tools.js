import Vue from 'vue'
import  './jquery'
let dev = 0;
let apiServer;
let resServer;
if (+$('body')[0].getAttribute('dev') === 1) {
    dev = 1;
    var app_id = '48872373383';
    var app_secret = 'Her*HofarjHfj*^)%afjer^%893';
}else{
    var app_id = '8076679181';
    var app_secret = 'obFiI3KrQ4tSofPwyFJUYe0OJNrwKmwb'
}


let timestamp = Date.now();


let sign = hex_md5(timestamp + app_secret);
var storage = window.localStorage;
var lang = '';
var login_success = '';
// var clear_session = 1;
if (storage.getItem("language")) {
    lang = storage.getItem("language")
}else{
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


// function fns(cname){
//     let name = cname + "=";
//     let ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         // console.log(c.charAt(0))
//         while (c.charAt(0) == ' '){
//             c = c.substring(1);
//         }
//
//         // if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
//         console.log(c.slice(0,3))
//         if (c.slice(0,3) === 'uid') return c.substring(name.length, c.length);
//     }
//     return "";
// }


if(fns('uid')){
    login_success = fns('uid');
}else{
    login_success = "";
}
function fns(cname)
{
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
        var aCrumb = aCookie[i].split("=");
        if (cname === aCrumb[0]){
            return aCrumb[1]
        }
            // return unescape(aCrumb[1]);
    }
    return "";
}




// Vue.http.options.root = '//dev-casino-app.famely.com';


export default {
    dev: dev,
    // cookie相关
    getCookie(cname) {
        var aCookie = document.cookie.split("; ");
        for (var i=0; i < aCookie.length; i++)
        {
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
    setCookie(cname, cvalue, exdays) {
        let d = new Date();
        exdays = exdays || 1;
        d.setTime(d.getTime() + (exdays * 6 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    clearCookie(name) {
        this.setCookie(name, "", -1);
    },

    // localStorage
    getLs() {
        return JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]');
    },
    setLs(item) {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(item));
    },

    // 获取地址
    url() {
        let reg;
        if (resServer.PORT) {
            reg = resServer.HTTP + resServer.SERVER_PATH + ':' + resServer.PORT;
        } else {
            reg = resServer.HTTP + resServer.SERVER_PATH;
        }
        return reg;
    },
    apiUrl() {
        let reg;
        if (apiServer.PORT) {
            reg = apiServer.HTTP + apiServer.SERVER_PATH + ':' + apiServer.PORT;
        } else {
            reg = apiServer.HTTP + apiServer.SERVER_PATH;
        }
        return reg;
    },

    // ajax请求
    get(url, data, successCb, errorCb, bfCb) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.sign = sign;
            data.lang = lang;
            data.login_success = login_success;
        }
        data.lang = lang;
        data.login_success = login_success;
        Vue.http({
            url: '/api/v1/time/' + url,
            params: data,
            method: 'GET',
            credientials: true,
            before: function () {
                bfCb && bfCb();
            }
        }).then(function (data) {
            successCb && successCb(data);
        }, function (data) {
            errorCb && errorCb(data);
        });

    },
    post(url, data, successCb, errorCb, bfCb) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.sign = sign;
            data.lang = lang;
            data.login_success = login_success;
        }
        data.lang = lang;
        if(url == 'presignin'){
          data.login_success = '';
        }else{
          data.login_success = login_success;
        }

        Vue.http({
            url: "/api/v1/time/" + url,
            params: data,
            method: 'POST',
            credientials: true,
            before: function () {
                bfCb && bfCb();
            }
        }).then(function (data) {
            successCb(data);
        }, function (data) {
            errorCb && errorCb(data);
        });
    },

    // 带登录状态的ajax请求
    _get(url, data, successCb, errorCb, bfCb) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.access_token = this.getCookie('token');
            data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
            data.lang = lang;
            data.login_success = login_success;
            // data.clear_session = clear_session;
        }

        data.lang = lang;
        data.login_success = login_success;
        // data.clear_session   = clear_session;
        Vue.http({
            url: '/api/v1/time/' + url,
            params: data,
            method: 'GET',
            // root: '//dev-casino-app.famely.com',
            credientials: true,
            before: function () {
                bfCb && bfCb();
            }
        }).then(function (data) {
            successCb && successCb(data);
        }, function (data) {
            errorCb && errorCb(data);
        });
    },
    _post(url, data, successCb, errorCb, bfCb) {
        if (dev) {
            data.app_id = app_id;
            data.timestamp = timestamp;
            data.access_token = this.getCookie('token') || '我的天哪噜';
            data.sign = hex_md5(timestamp + app_secret + this.getCookie('secret'));
            data.lang = lang;
            data.login_success = login_success;
            // data.clear_session   = clear_session;
        }
        data.lang = lang;
        data.login_success = login_success;
        // data.clear_session   = clear_session;
        Vue.http({
            url: "/api/v1/time/" + url,
            params: data,
            method: 'POST',
            credientials: true,
            before: function () {
                bfCb && bfCb();
            }
        }).then(function (data) {
            successCb(data);
        }, function (data) {
            errorCb && errorCb(data);
        });
    },
    _post_url(url, data, successCb, errorCb, bfCb) {
      if(dev){
        data.app_id = app_id;
        var app_secret1 = 'Her*HofarjHfj*^)%afjer^%893';
        var urls = 'http://dev-casino-app.famely.com/v1/time/';
      }else{
        data.app_id = '8076679181';
        var app_secret1 = 'obFiI3KrQ4tSofPwyFJUYe0OJNrwKmwb';
        var urls = 'https://openapp.win.town/v1/time/';
      }
        data.timestamp = timestamp;
        data.access_token = this.getCookie('Admin-Token');
        data.sign = hex_md5(timestamp + app_secret1 + this.getCookie('secret'));
        data.lang = lang;
        data.login_success = login_success;
        successCb(data,urls)
    },


    jsonp(url, data, successCb, errorCb, bfCb) {
        Vue.http({
            url: "/api/v1/time/" + url,
            params: data,
            method: 'JSONP',
            credientials: true,
            before: function () {
                bfCb && bfCb();
            }
        }).then(function (data) {
            successCb(data);
        }, function (data) {
            errorCb && errorCb(data);
        });
    },

    // 获取信息
    hash() {
        let arr = (location.hash || "").replace(/^\#/, '').split("&");
        let params = {};
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i].split("=");
            if (data.length == 2) {
                params[data[0]] = data[1];
            }
        }
        return params;
    },
    search() {
        let arr = (location.search || "").replace(/^\?/, '').split("&");
        let params = {};
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i].split("=");
            if (data.length == 2) {
                params[data[0]] = data[1];
            }
        }
        return params;
    },


    /**
     * 自己写的tab切换
     * @param tabItem 切换组的选择器
     * @param showItem 需要显示的元素选择器
     * @param during 渐变时间
     * @param fb 父盒子的选择器
     */
    // tab(tabItem, showItem, during, fb) {
    //     let dur = during || 0;
    //     let fa = $(tabItem).parent(fb);
    //     fa.animate({opacity: 0}, dur, function () {
    //         $(tabItem).addClass('hide');
    //         $(showItem).removeClass('hide');
    //         fa.animate({opacity: 1}, dur);
    //     });
    // }

}

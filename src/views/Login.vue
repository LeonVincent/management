<template>
  <div>
    <header>
      <i>
        <img src="../images/header/wintown-1024.png" alt="">
      </i>
      <span>客服服务-后台</span>
    </header>
    <div class="login_box">

      <div class="box">
        <div class="login_title">
          <i><img src="../images/header/icon.png" height="24" width="24" alt=""></i>
          <span>客服服务-后台登录</span>
        </div>
        <form action="#">
          <div class="ins">
            <input type="text" placeholder="账号" v-model="loginForm.username">
            <input type="password" placeholder="密码" v-model="loginForm.password">
          </div>
          <div id="mcaptcha" height="50px" style="margin-top:20px;"></div>
        </form>

        <div class="btn" @click="login">
          <span>登录</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import t from './../common/js/tools'
export default {
  name: 'TheNav',
  data(){
    return{
      loginForm:{
        validate: '',
        username: '',
        password: '',
        data:{},

      },
      first: 0


    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    init(){
      var mwidth = $('.box').width();
      var _this = this;
      initNECaptcha({
          captchaId: '092209fc46aa4312b193671334f31f79',
          element: '#mcaptcha',
          mode: 'float',
          width: mwidth,
          lang: _this.types === 'en' ? 'en' : 'zh-CN',
          onReady: function (instance) {
              // 验证码一切准备就绪，此时可正常使用验证码的相关功能
          },
          onVerify: function (err, data) {
              try {
                  if (data.validate) {
                      _this.loginForm.validate = data.validate;
                  }
              } catch (e) {
                  return false;
              }

          }
      }, function onload(instance) {
          // 初始化成功

      }, function onerror(err) {
          // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
          _this.shTip(_this.data.service14, 2);
      })
    },
    login() {
      // var _this = this;
      // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
      //   this.$router.push({ path: '/' }); //登录成功之后重定向到首页
      // }).catch(err => {
      //   this.$message.error(err); //登录失败提示错误
      // });
      if(this.first != 0){
        return false;
      }
      var _this = this;
      _this.first = 1;
      // 先清除原有的cookie
      t.clearCookie('secret');
      t.clearCookie('token');
      t.clearCookie('uid');
      t.clearCookie('username');
      // 账号或密码为空，显示提示
      if(!(this.loginForm.username)){
          // window.shTip(_this.data.log_enterusername);
          this.$message({
            showClose: true,
            message: '请输入用户名',
            type: 'error',
            duration: '2000'
          });
          _this.first = 0;
          return false;
      }
      if(!(_this.loginForm.password)){
          // window.shTip(_this.data.log_enterpassword);
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'error',
            duration: '2000'
          });
          _this.first = 0;
          return false;
      }
      else if (this.validate == '') {
          _this.first = 0;
          return;
      }
      var objlogin = {
        captchaId: '092209fc46aa4312b193671334f31f79',
        username: this.loginForm.username,
        password: this.loginForm.password,
        validate: this.loginForm.validate
      };
      _this.$store.dispatch('Login', objlogin).then(() => {
        // this.loading = false
        _this.first = 0;
        _this.$router.push({ path: '/Newproblem' })
      }).catch(() => {
        _this.first = 0;
        // this.loading = false
      })
      // return false;
      // this.$api.postlogin('presignin', objlogin , function (data) {
      //     _this.init();
      //     if (!data.error_code) {
      //         // 登录成功
      //
      //         _this.tokens = data.data.token;
      //         var data = data.data;
      //         var body = data.body;
      //         window.isLogin = true;
      //         t.clearCookie('fullname');
      //         // dev环境下，secret和token放在cookie里
      //         if (t.dev) {
      //             t.clearCookie('secret');
      //             t.clearCookie('token');
      //             t.setCookie('secret', data.secret);
      //             t.setCookie('token', data.token);
      //         }
      //         // 重新设置uid。username的cookie
      //         t.clearCookie('uid');
      //         t.clearCookie('username');
      //         t.setCookie('uid', data.uid);
      //         t.setCookie('username', data.fullname);
      //         t.clearCookie('avatar_thumb');
      //         t.setCookie('avatar_thumb',data.avatar_thumb);
      //         t.setCookie('fullname',data.fullname);
      //         t.setCookie('token', data.token);
      //         t.setCookie('secret', data.secret);
      //         // _this.$store.commit(types.LOGIN, data.token);
      //         window.isLogin = true;
      //         _this.$router.push('Newproblem');
      //
      //
      //     }else if (data.error_code) {
      //         // _this.shTip(data.body.message, 2);
      //         // $('.errorTxt').show();
      //         _this.$message.error(body.message);
      //         // window.shTip(data.body.message);
      //
      //         _this.inits()
      //     } else {
      //         var code = data.error_code;
      //         if (code >= 10600 && code <= 10616) {
      //             // _this.shTip(_this.data.service13, 2);
      //             _this.$message.error(_this.data.service13);
      //             _this.validate = '';
      //             _this.inits()
      //         } else {
      //             // _this.shTip(_this.data.server_busy, 2);
      //             _this.$message.error(_this.data.server_busy,2)
      //             _this.inits()
      //         }
      //     }
      //
      //
      // });
    }
  },
  mounted(){
    // this.$store.commit(types.TITLE, 'Login');
    $('.el-aside').css({'display':'none'});
    $('.title').css({'display':'none'});
    $('.header').find('.el-dropdown').css('display','none');
    $('.el-header').css('display','none');
    var _this = this;
    this.$nextTick(function () {
      $('.titleHome').hide();
      setTimeout(function(){
        _this.init();
      },10)
    })
  }
}
</script>

<style scoped lang="scss">
  @import '~@/common/css/base.scss';
  .el-aside{
    display: none;
  }
  .title{
    display: none;
  }
  header{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 16px;
    /* background-color: #ffffff; */
    /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08); */
    @media screen and (max-width: $smallSize){
      justify-content: center;
    }
    span{
      margin-left: 10px;
      @media screen and (max-width: $smallSize){
        display: none;
        justify-content: center;
      }
    }

    i{
      width: 74px;
      height: 46px;
      display: inline-block;
      align-items: center;
      img{
        width: 74px;
        height: 46px;
        display: inline-block;
        vertical-align: top;

      }
    }

  }
  .login_box{
    width: 100%;
    height: calc(100vh - 210px);
    display: flex;
    justify-content: center;
    align-items: center;

    .box{
      width: 6.4rem;
      /* width: 100%;
      @media screen and (min-width: $smallSize){
        width: 320px;
      } */
      .login_title{
        margin-bottom: 40px;
        font-size: 24px;
        color: #303030;
        font-weight: 600;
        display: flex;
        justify-content: center;
        i{
          width: 24px;
          height: 24px;
          display: inline-block;
          margin-right: 5px;
          img{
            display: inline-block;
            margin-top: 4px;
          }
        }
      }
      .ins{
        width: 100%;
        input{
          width: 100%;
          height: 48px;
          border-radius: 4px;
          box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.08);
          background-color: #ffffff;
          border: solid 1px #cccccc;
          margin: 7px 0;
          box-sizing: border-box;
          text-indent: 10px;
        }
      }
      .btn{
        width: 100%;
        height: 48px;
        border-radius: 4px;
        background-color: #3d96ff;
        margin-top: 40px;
        line-height: .48rem;
        font-size: .22rem;
        cursor: pointer;
        span{
          width: 100%;
          height: 100%;
          line-height: 48px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
      }
    }

  }
</style>

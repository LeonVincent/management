<template>
<el-container class="wrap">
  <el-header height="80px">
    <el-button icon="el-icon-tickets" @click="handleOpen"/>
    <the-header />
  </el-header>
  <el-container class="body-wrap">
    <the-nav :class="{'open': open}" />
    <el-main>
      <div class="main">
        <!-- <div class="titleHome">
          <img src="../images/header/icon.png" height="24" width="24" alt="">
          <span>客服服务-后台</span>
        </div>
        <div class="titleHome" style="margin-top:20px;font-size:16px;font-weight:600;height:40px;line-height:40px;border-bottom: 1px solid #cccccc;">
          <p class="new">新的提问</p>
        </div> -->
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheNav from '@/components/TheNav'
import CarouselTable from '@/views/CarouselTable'
import t from './../common/js/tools'
import store from '../store'
const { body } = document
const WIDTH = 1024
const RATIO = 3
export default {
  name: 'home',
  data () {
    return {
      open: false
    }
  },
  components: {
    TheHeader,
    TheNav,
    CarouselTable
  },
  methods: {
    handleOpen () {
      this.open = !this.open
      console.log(this.open)
    },
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('CloseSideBar', { withoutAnimation: true })
          $('.titleHome').show();
        }else{
          $('.titleHome').hide();
        }
      }
    }
  },
  beforeMount() {
    // this.resizeHandler();
    // window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    this.resizeHandler();
  }
}
</script>

<style scoped lang="scss">
@import '~@/common/css/base.scss';
.wrap {
  min-height: 100vh;
  .el-header {
    position: relative;
    /* background-color: #409EFF; */
    line-height: 80px;
    .el-button {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-60%);
      border: #fff;
      background-color: #fff;
      @media screen and (min-width: $smallSize){
        display: none
      }
    }
  }
  .body-wrap {
    position: relative;
    overflow: hidden;
    .el-aside {
      z-index: 999;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 100px);
      background-color: #fafafa;
      color: #333;
      @include tran-horizontal(0, 0.4s);
      @media screen and (max-width: $smallSize) {
        position: absolute;
        left: -200px;
      };
      &.open {
        @include tran-horizontal(100%, 0.4s);
      }
    }
    .el-main {
      z-index: 1;
      background-color: #fafafa;
      color: #333;
      text-align: center;
      padding: 15px!important;
      .main {
        background-color: #fafafa;
        /* padding: 10px; */
        border-radius: 10px;
        min-height: calc(100vh - 200px);
        .titleHome{
          text-align: left;
          height: 30px;
          vertical-align: middle;
          line-height: 30px;
          font-size: 20px;
          color: #303030;
          display: flex;
          flex-direction: row;
          @media screen and (min-width: $smallSize){
            display: none
          }
          img{
            display: block;
            align-items: center;
            margin-right: 10px;
            margin-top: 3px;
          }
          span{
            display: block;
          }
          /* .new{
            margin-top: 40px;
          } */

        }
      }
    }
    .el-footer {
      color: #333;
      line-height: 70px;
      text-align: center;
      background-color: #fafafa;
    }
  }
}
</style>

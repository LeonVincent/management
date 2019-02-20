<template>
<div class="header">
  <div class="left">
    <i><img src="../images/header/wintown-1024.png" alt=""></i>
    <span>客户服务-后台</span>
  </div>
  <el-dropdown>
    <!-- <div class="el-dropdown"> -->
    <el-button>
      <img alt="" class="avatar" src="../images/portrait.png" />
      <!-- {{name}} -->
      <!-- <span @click="lagout">退出</span> -->
      <!-- <el-dropdown-item><span @click="lagout">退出</span></el-dropdown-item> -->
      <i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><span>{{name}}</span></el-dropdown-item>
      <el-dropdown-item><span @click="lagout">退出</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>



  <!-- <el-dropdown>
    <div class="el-dropdown">
    <el-button>
      <img alt="" class="avatar" src="../images/portrait.png" />
      {{name}}
      <span @click="lagout">退出</span>
      <el-dropdown-item><span @click="lagout">退出</span></el-dropdown-item>
      <i class="el-icon-arrow-down "></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><span @click="getName">{{name1}}</span></el-dropdown-item>
      <el-dropdown-item><span @click="lagout">退出</span></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
  <!-- </div> -->
</div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'TheHeader',
  computed: {
    // ...mapGetters([
    //   'name',
    //   'roles'
    // ])
  },
  data () {
    return {
      name: ''
    }
  },
  methods:{
    lagout(){
      this.$store.dispatch('FedLogOut',{}).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // getName(){
    //   this.name1 = this.name;
    // }
  },
  created() {
    var _this = this;
    this.name = Cookies.get('username');

  }
}
</script>

<style scoped lang="scss">
@import '~@/common/css/base.scss';
.header{
  height: 100%;
  width: 100%;
  .left{
    float: left;
    height: 100%;
    line-height: 80px;
    @media screen and (max-width: $smallSize){
      display: none;
    }
    >span{
      margin-left: 10px;
      display: inline-block;
      font-size: 16px;
    }
    i{
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-left: 40px;
      img{
        width: 97px;
        height: 60px;
        display: inline-block;
      }
    }
  }
  .el-dropdown {
    float: right;
    margin-right: 50px;
    .el-button {
      padding: 2px 20px 2px 2px;  // 重置button的样式，去除本有的padding
      border-radius: 50px;
      color: #00B5FF;
      font-size: 14px;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 6px;
        border-radius: 40px;
        vertical-align: middle
      }
    }
  }
}
</style>

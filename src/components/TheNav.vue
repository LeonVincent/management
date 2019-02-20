<template>
<el-aside style="min-height: 100%; background-color: #fafafa; overflow: hidden">
  <el-menu class="el-menu-vertical-demo" :default-openeds="['1','2','3']" router default-active="/Newproblem" @open="handleOpen" @close="handleClose"
    background-color="#fafafa" text-color="#1a1a1a" active-text-color="#409EFF">
    <el-submenu index="1">
      <template slot="title">
        <i class="">
          <img src="../images/header/icon.png" height="24" width="24" alt="">
        </i>
        <span>客服服务</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Newproblem">新的提问<span class="new_question">40</span></el-menu-item>
        <el-menu-item index="/Oldproblem">往期问题 <span class="old_question"></span></el-menu-item>
        <el-menu-item index="/Trash">废纸篓 <span class="trash_question"></span></el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>导航二</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/FormView">个人中心(表单)</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->
  </el-menu>
</el-aside>
</template>

<script>
export default {
  name: 'TheNav',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu-item{
  span{
    display: inline-block;
    background: #f3433c;
    /* height: 20px; */
    line-height: 20px;
    margin-left: 4px;
    color: #fff;
    padding: 0px 5px;
    border-radius: 3px;
  }
}
</style>

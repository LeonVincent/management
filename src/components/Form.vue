<template>
<el-form :model="rulesForm" :rules="rules" ref="rulesForm">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="rulesForm.name"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="rulesForm.email"></el-input>
  </el-form-item>
  <el-form-item label="地点" >
    <el-select style="width: 100%" v-model="rulesForm.region" placeholder="请选择地点">
      <el-option label="广州" value="guangzhou"></el-option>
      <el-option label="其他地区" value="others"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="自我说明">
    <el-input type="textarea" v-model="rulesForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button style="width: 120px" type="primary" :loading="load" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      rulesForm: {
        name: '',
        email: '',
        region: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
        ]
      },
      load: false
    }
  },
  methods: {
    onSubmit () {
      this.load = true
      var $this = this
      const h = this.$createElement
      setTimeout(function () {
        $this.load = false
        $this.$message({
          message: h('p', null, '创建成功')
        })
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

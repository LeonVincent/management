<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in items" :key="index">
      <h3 @click="handleRouter(index)">{{item}}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    router: {
      type: Array
    },
    items: {
      type: Array
    }
  },
  methods: {
    handleRouter (i) {
      console.log(i)
      // this.$router.push(`${router[i]}`)
    }
  }
}
</script>

<style scoped>
.el-carousel——item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>

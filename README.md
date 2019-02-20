```
src
  |---common                     // 公用的文件
        |---css
             |---base.scss      // 公用的css样式
        |---components          // 组件      
             |---Carousel.vue   // 轮播图组件
             |---Form.vue       // 表单组件
             |---Tables.vue     // 表格组件
             |---TheHeader.vue  // header组件
             |---TheNav.vue     // 左侧导航栏组件
             |---TwoEcharts.vue // 柱形图和折线图组件
        |---images
             |---portrait.png   // 头像
        |---router
             |---index.js       // 路由
        |---views
             |---CarouseTable.vue // 轮播图和表格页面
             |---Echarts.vue      // echarts图表页面
             |---FormView.vue     // 表单页面
  |---App.vue                     // 总app入口
  |---main.js                     // app实例

```
# 技术栈
- vue ^2.5.2、 vue-router
- scss
- Element (表格，表单，布局等)
- Echarts (柱形图和折线图)



# element-vue-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

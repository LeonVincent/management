<template>
<div class="two-table">
  <el-table style="min-width: 300px; margin-right: 20px; margin-bottom: 20px" :header-row-style="getStyle" :header-cell-style="getStyle" :data="tableOneData" border stripe :default-sort="{prop: 'data', order: 'descending'}" >
    <el-table-column align="left" prop="price" label="价格" sortable :formatter="formatter"></el-table-column>
    <el-table-column align="left" prop="name" label="名称"></el-table-column>
    <el-table-column align="left" prop="address" label="厂商"></el-table-column>
  </el-table>
  <el-table style="min-width: 300px" :data="tableTwoData" border stripe>
    <el-table-column align="left" label="日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.date}}</span>
      </template>
    </el-table-column>
    <el-table-column label="名称">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>名称：{{scope.row.name}}</p>
          <p>产地: {{scope.row.address}}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableOneData: [
        {
          price: '88',
          name: '巴斯光年',
          address: '美国'
        },
        {
          price: '66',
          name: '牛仔吴迪',
          address: '美国'
        },
        {
          price: '98',
          name: '翠丝',
          address: '美国'
        },
        {
          price: '55',
          name: '维和者',
          address: '美国'
        },
        {
          price: '00',
          name: '蜘蛛侠',
          address: '美国'
        }
      ],
      tableTwoData: [
        {
          date: '2018-02-20',
          name: '巴斯光年',
          address: '美国'
        },
        {
          date: '2018-02-21',
          name: '牛仔吴迪',
          address: '美国'
        },
        {
          date: '2018-02-22',
          name: '翠丝',
          address: '美国'
        },
        {
          price: '55',
          name: '维和者',
          address: '美国'
        },
        {
          price: '00',
          name: '蜘蛛侠',
          address: '美国'
        }
      ]
    }
  },
  methods: {
    formatter (row, column) {
      return row.price + '元'
    },
    getStyle ({row, rowIndex}) {
      return {
        'height': '50px'
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped lang="scss">
.two-table {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 50px
}
</style>

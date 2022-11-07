<template>
  <div class="content">
    <!-- 条件查询 -->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="searchForm" class="forms" label-width="80px">
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="7">
            <el-form-item label="订单编号">
              <el-input
                v-model="searchForm.orderSn"
                clearable
                placeholder="请填写订单编号"
                @clear="initData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="退单状态">
              <el-select
                v-model="searchForm.status "
                placeholder="退单状态"
                clearable
                style="width: 100%"
                @clear="initData"
              >
                <el-option label="待处理" :value="0" />
                <el-option label="退货中" :value="1" />
                <el-option label="已完成" :value="2" />
                <el-option label="已拒绝" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="20">
            <el-button
              type="default"
              size="mini"
              @click="reset"
            >重置</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="search"
            >搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 新增及内容展示 -->
    <el-card class="card" shadow="never">
      <!-- 带边框的表格 -->
      <el-table stripe :data="articleList" border style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          align="center"
          label="#"
          fixed
        />
        <el-table-column
          align="center"
          prop="orderSn"
          label="订单编号"
          width="300"
        />
        <!-- status (string, optional): 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝 -->
        <el-table-column align="center" label="退单状态" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 0"
              type="danger"
              size="mini"
            >待处理</el-button>
            <el-button v-if="scope.row.status == 1" size="mini" type="warning">
              退货中
            </el-button>
            <el-button v-if="scope.row.status == 2" size="mini" type="primary">
              已完成
            </el-button>
            <el-button v-if="scope.row.status == 3" size="mini" type="danger" plain>
              已拒绝
            </el-button>
          </template>
        </el-table-column>
        <!-- status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单 -->
        <el-table-column
          align="center"
          prop="description"
          label="描述"
          width="200"
        />
        <el-table-column
          align="center"
          prop="reason"
          label="退单原因"
          width="250"
        />
        <el-table-column
          prop="productName"
          align="center"
          label="商品名称"
          width="150"
        />
        <!-- orderType (integer, optional): 订单类型：0->正常订单；1->秒杀订单 , -->
        <el-table-column
          align="center"
          prop="productAttr "
          label="商品属性"
          width="200"
        >
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.productAttr" :key="index">
              {{ item.key }}:{{ item.value }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="handleNote"
          label="商家备注"
          width="100"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="添加时间"
          width="100"
        />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-view"
              @click="openDetail(scope.row.id)"
            >查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="margin-top: 20px"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { findReturnApply } from '@/api/order/chargebacks/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      articleList: [],
      listLoading: '',
      searchForm: {}
    }
  },

  created() {
    this.getArticleListInit()
  },

  methods: {
    // 在点击由 clearable 属性生成的清空按钮时触发
    initData() {
      this.page.currentPage = 1
      this.getArticleListInit()
    },
    // 重置表单
    reset() {
      // 表单数据赋值为 空对象
      this.searchForm = {}
    },
    // 搜索
    search() {
      // console.log(this.searchForm)
      this.page.currentPage = 1
      this.getArticleListInit()
    },
    // 获取文章列表
    getArticleListInit() {
      var form = {}
      for (var key in this.searchForm) {
        // 如果对象里这个key存在内容
        if (this.searchForm[key]) {
          form[key] = this.searchForm[key]
        }
      }
      // 打开tableloading
      this.listLoading = true
      findReturnApply(this.page.currentPage, this.page.size, form).then(
        (res) => {
          // console.log(res.data)
          if (res.success) {
            res.data.rows.forEach(el => {
              el.productAttr = JSON.parse(el.productAttr)
            })
            this.articleList = res.data.rows
            // 声总数居条数
            this.page.total = res.data.total
          } else {
            this.$message.error('请求失败')
          }
          this.listLoading = false
        }
      )
    },
    // size改变的时候触发的钩子函数
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.getArticleListInit()
    },
    // 点击页数的时候触发的钩子函数
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getArticleListInit()
    },
    // 点击 查看 订单
    openDetail(id) {
      this.$router.push({
        path: '/order/orderReturnDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  .card {
    margin-top: 30px;
    .list_img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>

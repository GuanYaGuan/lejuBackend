<template>
  <div class="content">
    <!-- 条件查询 -->
    <el-card class="box-card" shadow="never">
      <el-form ref="form" :model="searchForm" class="forms" label-width="80px" size="normal">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input
                v-model="searchForm.nickName "
                clearable
                placeholder="昵称/模糊查询"
                @clear="initData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="searchForm.username "
                placeholder="用户名/模糊查询"
                clearable
                @clear="initData"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="18">
            <el-button
              type="default"
              size="mini"
              @click="reset"
            >重置</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="search"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 新增及内容展示 -->
    <el-card class="card" shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="addArticle">新增</el-button>
      </div>
      <!-- 带边框的表格 -->
      <el-table stripe :data="articleList" border style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          align="center"
          label="序号"
          fixed
        />
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
          width="100"
        />
        <el-table-column
          align="nick_name"
          prop="title"
          label="昵称"
          width="100"
        />
        <el-table-column align="center" label="头像" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.salt" style="100" height="100" alt="">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="roles"
          label="角色"
        />
        <el-table-column
          align="center"
          prop="create_time"
          label="添加时间"
        />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              style="color: #f00; margin-left: 20px"
              @click="del(scope.row)"
            >删除</el-button>
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
import {
  findUsersByPage
} from '@/api/privileges/account/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      articleList: [],
      listLoading: false,
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
      findUsersByPage(this.page.currentPage, this.page.size, form).then(
        (res) => {
          console.log(res.data)
          if (res.success) {
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
    // 点击 编辑
    edit(val) {
      // 弹出 编辑页面
      // this.$router.push({
      //   path: '/content/article/editDetail',
      //   query: {
      //     id: val.id
      //   }
      // })
    },
    // 点击 删除
    del(val) {
      // console.log(val)
      // delArticleApi(val.id).then((res) => {
      //   // console.log(res)
      //   if (res.success) {
      //     Message({
      //       message: '删除成功',
      //       type: 'success',
      //       duration: 5 * 1000
      //     })
      //     this.page.currentPage = 1
      //     this.getArticleListInit()
      //   }
      // })
    },
    // 点击 新增 按钮
    addArticle() {
      // 跳转至 新增页面
      // this.$router.push('/content/article/addDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  .card {
    margin-top: 30px;
  }
}
</style>

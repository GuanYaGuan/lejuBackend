<template>
  <div class="content">
    <!-- 条件查询 -->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="searchForm" class="forms" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input
                v-model="searchForm.title"
                clearable
                placeholder="作者"
                @clear="initData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input
                v-model="searchForm.author"
                placeholder="标题"
                clearable
                @clear="initData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="编辑类型">
              <el-select
                v-model="searchForm.editorType"
                placeholder="编辑类型"
                clearable
                style="width: 100%"
                @clear="initData"
              >
                <el-option label="富文本" :value="0" />
                <el-option label="Markdown" :value="1" />
              </el-select>
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
            >搜索</el-button>
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
          prop="title"
          label="文章标题"
          width="300"
        />
        <el-table-column align="center" label="展示图片" width="200">
          <template slot-scope="scope">
            <img class="list_img" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="添加时间"
          width="300"
        />
        <el-table-column
          align="center"
          prop="author"
          label="文章作者"
          width="250"
        />
        <el-table-column
          prop="isShow"
          align="center"
          label="文章是否展示"
          width="200"
        >
          <template slot-scope="scope">
            <!-- isShow (integer, optional): 是否显示: 0 否; 1 是 , -->
            <el-switch
              v-model="scope.row.isShow"
              :inactive-value="0"
              :active-value="1"
              @change="showChange(scope.row)"
            />
          </template>
        </el-table-column>
        <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
        <el-table-column
          align="center"
          prop="editType"
          label="编辑器类型"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.editorType == 0"
              size="small"
              type="primary"
              plain
            >富文本</el-button>
            <el-button
              v-if="scope.row.editorType == 1"
              size="small"
              type="success"
              plain
            >Markdown</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-view"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
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
  getArticleList as getArticleListApi,
  delArticle as delArticleApi
} from '@/api/content/article/index'
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
      getArticleListApi(this.page.currentPage, this.page.size, form).then(
        (res) => {
          // console.log(res)
          if (res.success) {
            this.articleList = res.data.rows
            // 声明多少条数据
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
    },
    // 点击 删除
    del(val) {
      console.log(val)
      delArticleApi(val.id).then((res) => {
        // console.log(res)
        if (res.success) {
          Message({
            message: '删除成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.page.currentPage = 1
          this.getArticleListInit()
        }
      })
    },
    // 点击 新增 按钮
    addArticle() {
      // 跳转至 新增页面
      this.$router.push('/content/detail')
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

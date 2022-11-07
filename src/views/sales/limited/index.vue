<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-button
          type="primary"
          size="small"
          @click="openDetail"
        >热销详情</el-button>
      </div>
      <!-- 对话框 -->
      <el-dialog title="热销详情" :visible.sync="dialogVisible" width="70%">
        <goods :form-data="formData" :brand-data="brandData" :list="list" :total="total" :start="start" :limit="limit" @initData="initClear" @searchData="search" @uptLimit="parLimit" @uptStart="parStart" />
        <span slot="footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </el-dialog>
      <!-- 表格 -->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column
          fixed
          align="center"
          type="index"
          width="50"
          label="序号"
        />
        <el-table-column
          prop="addressName"
          label="商品图片"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动时间" width="220">
          <template slot-scope="scope">
            <p>开始时间:{{ scope.row.promotionStartTime }}</p>
            <p>结束时间:{{ scope.row.promotionEndTime }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="" label="是否过期" align="center" width="120" />
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="220"
        />
        <el-table-column
          prop="brandName"
          label="品牌名称"
          align="center"
          width="200"
        />
        <el-table-column
          align="center"
          label="商品价格"
          prop="price"
          width="120"
        />
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="220"
        />
        <el-table-column fixed="right" label="操作" align="center" width="50">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              style="color: #f00; margin-left: 20px"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import goods from '@/components/goods/index.vue'
import {
  findAllBrandList,
  productsByPage
} from '@/api/goods/list/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
import { findAllRecommends, delRecommend } from '@/api/sales/limited/index'
export default {
  components: { goods },
  mixins: [mix],
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      start: 1,
      limit: 5,
      list: [],
      formData: {
        'brandId': '',
        'id': '',
        'name': '',
        'productCategoryId': '',
        'productSn': '',
        'publishStatus': '',
        'verifyStatus': ''
      },
      total: 0,
      brandData: []
    }
  },
  created() {
    this.initAddressList()
    this.init()
  },
  mounted() {},

  methods: {
    // 热销 数据
    init() {
      productsByPage(this.start, this.limit, this.formData)
        .then(res => {
          // console.log(res)
          this.total = res.data.total
          this.list = res.data.rows
        })
      // 品牌列表数据
      findAllBrandList().then((res) => {
      // console.log(res)
        this.brandData = res.data.items
      })
    },
    // 点击 新增按钮
    openDetail() {
      this.dialogVisible = true
    },
    // 初始数据
    initAddressList() {
      findAllRecommends().then((res) => {
        // console.log(res.data)

        const { data } = res
        this.tableData = data.items
      })
    },
    // 点击 删除 按钮
    del(id) {
      delRecommend(id).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('删除成功')
          this.initAddressList()
        } else {
          Message.error(message)
        }
      })
    },
    // 处理 子组件 的 每页页数
    parLimit(e) {
      // console.log(e)
      this.limit = e
      this.start = 1
      this.init()
    },
    // 处理 子组件 传递过来的 页数
    parStart(e) {
      // console.log(e)
      this.start = e
      this.init()
    },
    // 子组件的搜索
    search(e) {
      this.init()
    },
    // 子组件 点击 清空 时 请求数据
    initClear() {
      this.start = 1
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

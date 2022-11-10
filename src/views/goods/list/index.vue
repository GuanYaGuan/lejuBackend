<template>
  <div>
    <div class="content">
      <el-collapse>
        <el-collapse-item name="" title="商品管理介绍">
          <div style="margin-left: 40px">
            商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="other-box">
      <div class="content">
        <el-collapse>
          <el-collapse-item name="" title="条件查询">
            <div style="margin-left: 40px">
              <el-form :model="form" label-width="100px">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="商品名称">
                      <el-input
                        v-model="form.name"
                        placeholder="商品名称/模糊查询"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="商品货号">
                      <el-input
                        v-model="form.productSn"
                        placeholder="商品货号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="品牌">
                      <el-select
                        v-model="form.brandId"
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in brandData"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="上架状态">
                      <el-select v-model="form.publishStatus" placeholder="">
                        <el-option label="下架" :value="0" />
                        <el-option label="上架" :value="1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="审核状态">
                      <el-select v-model="form.verifyStatus" placeholder="">
                        <el-option label="未审核" :value="0" />
                        <el-option label="审核通过" :value="1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="12">
                    <el-form-item>
                      <el-button size="small">重置</el-button>
                      <el-button type="primary" size="small">搜索</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="12">
                    <el-form-item>
                      <el-button size="small">重置</el-button>
                      <el-button type="primary" size="small">搜索</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-card shadow="never" class="table-box">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="add">新增</el-button>
        <el-button type="primary" size="mini" @click="excel">导出Excel表格</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column prop="icon" label="品牌图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="250"
        />
        <el-table-column align="center" label="商品价格" width="150">
          <template slot-scope="scope">
            <div>原价:{{ scope.row.originalPrice }}￥</div>
            <div>现价:{{ scope.row.price }}￥</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
        />
        <el-table-column label="标签" align="center" width="100">
          <template slot-scope="scope">
            最新:<el-switch
              v-model="scope.row.newStatus"
              :active-value="1"
              :inactive-value="0"
              @change="changeNewStatus(scope.row)"
            />
            推荐:<el-switch
              v-model="scope.row.recommendStatus"
              :active-value="1"
              :inactive-value="0"
              @change="changerecommendStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="标签2" align="center" width="100">
          <template slot-scope="scope">
            发布:<el-switch
              v-model="scope.row.publishStatus"
              :active-value="1"
              :inactive-value="0"
              @change="changepublishStatus(scope.row)"
            />
            审核:<el-switch
              v-model="scope.row.verifyStatus"
              :active-value="1"
              :inactive-value="0"
              @change="changeverifyStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="sku" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="openDiaglo(scope.row.id)"
            >编辑sku</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="重量" prop="weight" />
        <el-table-column align="center" label="排序" prop="sort" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-view"
              @click="edit(scope.row.id)"
            >编辑</el-button>

            <el-button
              type="text"
              size="small"
              style="color: #f00; margin-left: 20px"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- sku 的弹窗 -->
      <el-dialog title="SKU列表" :visible.sync="dialogVisible">
        <el-row :gutter="20">
          <el-col :span="4" :offset="20">
            <el-button
              size="mini"
              type="primary"
              style="margin-bottom: 20px"
              @click="addSku"
            >新增</el-button>
          </el-col>
        </el-row>

        <el-table :data="skuTableData" border stripe>
          <el-table-column
            fixed
            label="#"
            type="index"
            align="center"
            width="50"
          />
          <el-table-column label="图片" align="center" width="120">
            <template slot-scope="scope">
              <el-upload
                class="avatar-uploader"
                action="/lejuAdmin/material/uploadFileOss"
                :headers="token"
                :show-file-list="false"
                :on-success="ele=>handleAvatarSuccess(ele.data.fileUrl,scope.$index)"
              >
                <img v-if="scope.row.pic" width="100" height="100 " :src="scope.row.pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="颜色" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spData[0].value" />
            </template>
          </el-table-column>
          <el-table-column label="大小" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spData[1].value" />
            </template>
          </el-table-column>
          <el-table-column label="库存" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stock" />
            </template>
          </el-table-column>
          <el-table-column label="预警库存" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lowStock" />
            </template>
          </el-table-column>
          <el-table-column label="锁定库存" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lockStock" />
            </template>
          </el-table-column>
          <el-table-column label="sku编码" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.skuCode" />
            </template>
          </el-table-column>
          <el-table-column label="价格" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.price" />
            </template>
          </el-table-column>
          <el-table-column label="销量" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sale" />
            </template>
          </el-table-column>
          <el-table-column

            fixed="right"
            label="操作"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="color: #f00; margin-left: 20px"
                @click="delSku(scope.row.id)"
              >删除</el-button>

              <el-button
                v-if="!addShow"
                type="text"
                size="small"
                @click="changeEdit(scope.row)"
              >修改编辑</el-button>
              <el-button
                v-if="addShow"
                type="text"
                size="small"
                @click="saveSku(scope.$index)"
              >保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
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
      /> </el-card>>
  </div>
</template>

<script>
import {
  findAllBrandList,
  productsByPage,
  delproductsByPage,
  switchNewStatus,
  switchRecommandStatus,
  switchPublishStatus,
  switchVerifyStatus,
  productSkusDetail,
  delSku,
  updateSkuInfo,
  addProductSkus
} from '@/api/goods/list/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      dialogVisible: false,
      form: {},
      brandData: [],
      tableData: [],
      skuTableData: [],
      skuId: '',
      addShow: false
    }
  },
  created() {
    this.initbrandList()
    // 品牌列表数据
    findAllBrandList().then((res) => {
      // console.log(res)
      this.brandData = res.data.items
    })
  },
  mounted() {},

  methods: {
    // 初始化
    initbrandList() {
      var forms = {}
      for (var key in this.form) {
        // 如果对象里这个key存在内容
        if (this.form[key]) {
          forms[key] = this.form[key]
        }
      }
      productsByPage(this.page.currentPage, this.page.size, forms).then(
        (res) => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            this.tableData = data.rows
            this.page.total = data.total
          } else {
            Message.error(message)
          }
        }
      )
    },
    // 点击新增按钮
    add() {
      this.$router.push('/goods/addGoods')
    },
    // 点击 编辑 sku 的新增
    addSku() {
      // 像sku 表格添加一行
      var data = [{ 'key': '', 'value': '' }, { 'key': '', 'value': '' }]
      var obj = {
        'lockStock': '', // 锁定库存 预留
        'lowStock': '', // 低库存预警  预留
        'pic': '', // sku封面图片
        'price': '', // 价格
        'promotionPrice': '', //  促销价格  预留
        'sale': '', // 销量 预留
        'skuCode': '', // sku编码
        'spData': data, //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
        'stock': '', // 库存
        'modifyTime': '', // 更新时间 后台维护
        'createTime': '' // 后台自动生成
      }
      this.skuTableData.push(obj)
      this.addShow = true
    },
    // 点击 sku 弹窗的 保存
    saveSku(index) {
      // console.log(index)
      this.skuTableData[index].spData = JSON.stringify(this.skuTableData[index].spData)
      addProductSkus(this.skuTableData[index])
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('添加成功')
            this.initSku()
            this.addShow = false
          } else {
            Message.error(message)
          }
        })
    },
    initSku() {
      productSkusDetail(this.skuId)
        .then(res => {
          // console.log(res.data.skus)
          res.data.skus.forEach(el => {
            el.spData = JSON.parse(el.spData)
          })
          this.skuTableData = res.data.skus
        })
    },
    // 点击 编辑 sku 打开 弹窗
    openDiaglo(id) {
      // 请求商品明细接口
      // console.log(id)
      this.skuId = id
      this.initSku()
      this.dialogVisible = true
      this.addShow = false
    },
    // size改变的时候触发的钩子函数
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.initbrandList()
    },
    // 点击页数的时候触发的钩子函数
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.initbrandList()
    },
    // 点击 删除 按钮
    del(id) {
      delproductsByPage(id).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('删除成功')
          this.initbrandList()
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 编辑 按钮
    edit(id) {
      // console.log(id)
      // 跳转至 编辑 详情页面
      this.$router.push({
        path: '/goods/addGoods',
        query: {
          id
        }
      })
    },
    // 点击 最新状态 开关按钮
    changeNewStatus(data) {
      // console.log(data)
      switchNewStatus({
        productId: data.id,
        status: data.newStatus
      }).then((res) => {
        // console.log(res)
        if (res.success) {
          Message.success('最新状态修改成功')
        } else {
          Message.error(res.message)
        }
      })
    },
    // 点击 推荐 开关按钮
    changerecommendStatus(data) {
      // console.log(data)
      switchRecommandStatus({
        productId: data.id,
        status: data.newStatus
      }).then((res) => {
        // console.log(res)
        if (res.success) {
          Message.success('推荐状态修改成功')
        } else {
          Message.error(res.message)
        }
      })
    },
    // 点击 发布 开关按钮
    changepublishStatus(data) {
      // console.log(data)
      switchPublishStatus({
        productId: data.id,
        status: data.newStatus
      }).then((res) => {
        // console.log(res)
        if (res.success) {
          Message.success('发布状态修改成功')
        } else {
          Message.error(res.message)
        }
      })
    },
    // 点击 审核 开关按钮
    changeverifyStatus(data) {
      // console.log(data)
      switchVerifyStatus({
        productId: data.id,
        status: data.newStatus
      }).then((res) => {
        // console.log(res)
        if (res.success) {
          Message.success('审核状态修改成功')
        } else {
          Message.error(res.message)
        }
      })
    },
    // 点击 sku 删除
    delSku(id) {
      // 请求接口删除 sku
      delSku(id)
        .then((res) => {
        // console.log(res)
          if (res.success) {
            Message.success('删除成功')
            this.initSku()
          } else {
            Message.error(res.message)
          }
        })
    },
    // 修改了 sku
    changeEdit(data) {
      // 提交 参数 修改
      // console.log(data)
      delete data.createTime
      delete data.promotionPrice
      data.spData = JSON.stringify(data.spData)
      updateSkuInfo(data)
        .then((res) => {
        // console.log(res)
          if (res.success) {
            Message.success('修改成功')
            this.initSku()
          } else {
            Message.error(res.message)
          }
        })
    },
    // 点击 excel 按钮
    excel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品名称', '商品价格', '商品类别', '重量', '排序']
        const filterVal = ['name', 'price', 'productCategoryName', 'weight', 'sort']
        //  list 表格的元数据
        // filterVal theader 所对应的字段
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data: data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    // 将 一维数组 转为 二维数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // 编辑 sku 图片 上传
    handleAvatarSuccess(e, index) {
      // console.log(res)
      this.skuTableData[index].pic = e
      // this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #ffffff;
  padding: 0 40px;
}
.other-box {
  margin: 30px;
}
.table-box {
  margin: 30px;
}
</style>

<template>
  <div>
    <!-- 查询条件 -->
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>查询条件</span>
      </div>
      <div>
        <el-form ref="form" :model="formData">
          <el-form-item>
            <el-input
              v-model="formData.name"
              placeholder="商品名称"
              size="normal"
              style="width: 18%;margin-right:20px;"
              clearable
              @clear="initData"
            />
            <el-input
              v-model="formData.productSn"
              placeholder="商品货号"
              size="normal"
              style="width: 18%;margin-right:20px;"
              clearable
              @clear="initData"
            />
            <el-select v-model="formData.brandId" placeholder="品牌" style="margin-right:20px;" clearable @clear="initData">
              <el-option
                v-for="item in brandData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <el-select v-model="formData.publishStatus" placeholder="上架状态" style="margin-right:20px;" clearable @clear="initData">
              <el-option label="下架" :value="0" />
              <el-option label="上架" :value="1" />
            </el-select>
            <el-select v-model="formData.verifyStatus" placeholder="审核状态" clearable @clear="initData">
              <el-option label="未审核" :value="0" />
              <el-option label="审核" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <div
              class="btn"
              style="
                margin-top: 20px;
                width: 100%;
                display: flex;
                justify-content: flex-end;
              "
            >
              <el-button size="mini">取消</el-button>
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- body -->
    <el-card
      shadow="never"
      :body-style="{ padding: '20px' }"
      style="margin-top: 40px"
    >
      <div slot="header">
        <span>商品列表</span>
      </div>
      <el-table :data="list" border stripe>
        <el-table-column label="序号" type="index" align="center" width="50" />
        <el-table-column label="选择" align="center">
          <template v-slot="scope">
            <el-radio v-model="radio" :label="scope.row.id" @change="showDialog(scope.row)"><span /></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <template v-slot="scope">
            <img :src="scope.row.pic" width="100" height="100" alt="">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" prop="name" />
        <el-table-column label="商品价格" align="center">
          <template v-slot="scope">
            <p>原价:{{ scope.row.originalPrice }}</p>
            <p>现价:{{ scope.row.price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="商品类别"
          align="center"
          prop="productCategoryName"
        />
        <el-table-column label="商品重量" align="center" prop="weight" />
      </el-table>
      <el-pagination
        :total="total"
        :current-page="start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="编辑限时活动" :visible.sync="isDialogShow" append-to-body>
      <el-form ref="form" :model="form" label-width="120px" :inline="false" size="mini">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="商品价格">
              {{ form.price }}
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品名称">
              {{ form.name }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="促销价格">
              <el-input-number v-model="form.promotionPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="开始时间">
              <template>
                <div class="block">
                  <el-date-picker
                    v-model="form.promotionStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </div>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="结束时间">
              <template>
                <div class="block">
                  <el-date-picker
                    v-model="form.promotionEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="活动限购数量">
              <el-input v-model="form.promotionPerLimit " placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品图片">
              <img :src="form.pic" alt="" style="100" height="100">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-button size="small" @click="isDialogShow=false">取消</el-button>
            <el-button type="primary" size="small" @click="addActive">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addRecommend } from '@/api/sales/limited/index'
import { Message } from 'element-ui'
export default {
  props: ['list', 'total', 'limit', 'start', 'formData', 'brandData'],
  data() {
    return {
      radio: '',
      form: {
        productId: '',
        promotionEndTime: '',
        promotionPerLimit: '',
        promotionPrice: '',
        promotionStartTime: '',
        sort: ''
      },
      isDialogShow: false
    }
  },
  created() {
    // 组件当中 不可以 执行获取数据初始化的操作
  },
  mounted() {},

  methods: {
    handleSizeChange(e) {
      //   console.log(e)
      this.$emit('uptLimit', e)
    },
    handleCurrentChange(e) {
      //   console.log(e)
      this.$emit('uptStart', e)
    },
    // 点击 搜索
    search() {
      this.$emit('searchData', this.formData)
    },
    //  点击 清空 时 初始数据
    initData() {
      this.$emit('initData')
    },
    // 点击 添加 限时活动
    addActive() {
      addRecommend(this.form)
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('添加成功')
            this.isDialogShow = false
          } else {
            Message.error(message)
          }
        })
    },
    // 点击 单选框 弹窗显示
    showDialog(data) {
    //   console.log(data)
      this.isDialogShow = true
      this.form.productId = data.id
      this.form.price = data.price
      this.form.name = data.name
      this.form.pic = data.pic
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
}
</style>

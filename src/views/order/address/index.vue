<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = true"
        >新增</el-button>
      </div>
      <!-- 对话框 -->
      <el-dialog
        title="地址详情"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发货地址">
                <el-input
                  v-model="form.sendAddress"
                  clearable
                  placeholder="请输入发货地址"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发货人姓名">
                <el-input v-model="form.name" placeholder="请输入发货人姓名" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发货人手机号">
                <el-input
                  v-model="form.phone"
                  clearable
                  placeholder="请输入发货人手机号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input v-model="form.number" placeholder="请输入邮政编码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="收货地址">
                <div id="app">
                  <el-cascader
                    v-model="selectedOptions"
                    size="large"
                    :options="options"
                    @change="handleChange"
                  />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址">
                <el-input
                  v-model="form.addressDetail"
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureForm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 表格 -->
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column align="center" type="index" label="#" />
        <el-table-column prop="addressName" label="地址名称" align="center" />
        <el-table-column align="center" label="默认发货地址">
          <template slot-scope="scope">
            默认发货地址:<el-switch
              v-model="scope.row.sendStatus"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="收货人姓名" align="center" />
        <el-table-column prop="phone" label="收货人电话" align="center" />
        <el-table-column prop="address" label="收货人地址" align="center" />
        <el-table-column align="center" label="默认收货地址">
          <template slot-scope="scope">
            默认收货地址:<el-switch
              v-model="scope.row.receiveStatus"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column label="操作" align="center">
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
    </el-card>
  </div>
</template>

<script>
import { addressList } from '@/api/order/address/index'
import { regionDataPlus } from 'element-china-area-data'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {},
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  created() {
    addressList().then((res) => {
      // console.log(res.data.items)
      const { data } = res
      data.items.forEach((el) => {
        el.address = el.province + el.city + el.detailAddress
      })
      this.tableData = data.items
    })
  },
  mounted() {},

  methods: {
    // before-close  关闭之前触发
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 点击 确定 提交表单
    sureForm() {},
    // 地址 选择 改变
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
}
</style>

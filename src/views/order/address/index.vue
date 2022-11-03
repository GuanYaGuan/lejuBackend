<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <!-- 对话框 -->
      <el-dialog title="地址详情" :visible.sync="dialogVisible" width="50%">
        <el-form ref="form" :rules="rule" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发货地址" prop="addressName">
                <el-input
                  v-model="form.addressName"
                  clearable
                  placeholder="请输入发货地址"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发货人姓名">
                <el-input
                  v-model="form.name"
                  clearable
                  placeholder="请输入发货人姓名"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发货人手机号" prop="phone">
                <el-input
                  v-model="form.phone"
                  clearable
                  placeholder="请输入发货人手机号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input
                  v-model="form.postCode"
                  clearable
                  placeholder="请输入邮政编码"
                />
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
                  v-model="form.detailAddress"
                  clearable
                  placeholder="请输入详细地址"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            v-if="isshow"
            type="primary"
            @click="sureForm"
          >确 定</el-button>
          <el-button
            v-if="!isshow"
            type="primary"
            @click="uploadForm"
          >更 新</el-button>
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
              @change="sendOne(scope.row.id)"
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
              @change="receive(scope.row.id)"
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
    </el-card>
  </div>
</template>

<script>
import {
  addressList,
  saveAddress,
  delAddress,
  detailAddress,
  uodateAddress,
  setReceiveOne,
  setSendOne
} from '@/api/order/address/index'
import {
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import { Message } from 'element-ui'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        var reg = /^[1][3,5,7,8][0-9]{9}$/
        if (!reg.test(this.form.phone)) {
          return callback(new Error('请输入正确的手机号码'))
        }
        callback()
      }
    }
    return {
      isshow: true,
      tableData: [],
      dialogVisible: false,
      form: {
        province: '',
        city: '',
        region: '',
        receiveStatus: 0,
        sendStatus: 0,
        cityCode: ''
      },
      options: regionDataPlus,
      selectedOptions: [],
      rule: {
        addressName: [
          { required: true, message: '请输入发货地址', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initAddressList()
  },
  mounted() {},

  methods: {
    // 点击 新增按钮
    add() {
      this.isshow = true
      this.form = {}
      this.selectedOptions = []
      this.dialogVisible = true
    },
    // 初始数据
    initAddressList() {
      addressList().then((res) => {
        // console.log(res.data.items)

        const { data } = res
        data.items.forEach((el) => {
          el.address = el.province + el.city + el.detailAddress
        })
        this.tableData = data.items
      })
    },
    // 点击 确定 提交表单
    sureForm() {
      // console.log(this.form)
      saveAddress(this.form).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('新增成功')
          this.dialogVisible = false
          this.initAddressList()
        } else {
          Message.error(message)
        }
      })
    },
    // 地址 选择 改变
    handleChange(value) {
      // console.log(value) // value 是个数组
      this.form.cityCode = value[0] + value[1] + value[2]
      this.form.province = CodeToText[value[0]]
      this.form.city = CodeToText[value[1]]
      this.form.region = CodeToText[value[2]]
    },
    // 点击 删除 按钮
    del(id) {
      delAddress(id).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('删除成功')
          this.initAddressList()
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 编辑 按钮
    edit(id) {
      // console.log(id)
      this.isshow = false
      detailAddress(id).then((res) => {
        // console.log(res)
        const { data, success } = res
        if (success) {
          this.selectedOptions = []
          this.form = data.address
          // this.form.province = TextToCode[data.address.province].code
          // console.log(TextToCode[data.address.province].code)
          // console.log(TextToCode[data.address.province][data.address.city].code)
          // console.log(TextToCode[data.address.province][data.address.city][data.address.region].code)
          this.selectedOptions.push(TextToCode[data.address.province].code)
          this.selectedOptions.push(
            TextToCode[data.address.province][data.address.city].code
          )
          this.selectedOptions.push(
            TextToCode[data.address.province][data.address.city][
              data.address.region
            ].code
          )
          this.dialogVisible = true
        }
      })
    },
    // 点击 更新 按钮
    uploadForm() {
      uodateAddress(this.form).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('更新成功')
          this.dialogVisible = false
          this.initAddressList()
        } else {
          Message.error(message)
        }
      })
    },
    // 收货地址 开关 改变
    receive(id) {
      setReceiveOne({
        id: id,
        receiveStatus: 1
      })
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('状态更改成功')
            this.dialogVisible = false
            this.initAddressList()
          } else {
            Message.error(message)
          }
        })
    },
    // 发货地址 开关 发生改变
    sendOne(id) {
      setSendOne({
        id: id,
        sendStatus: 1
      })
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('状态更改成功')
            this.dialogVisible = false
            this.initAddressList()
          } else {
            Message.error(message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
}
</style>

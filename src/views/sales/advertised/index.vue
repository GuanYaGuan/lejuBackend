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
              <el-form-item label="广告名称" prop="name">
                <el-input
                  v-model="form.name"
                  clearable
                  placeholder="请输入广告名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="note">
                <el-input
                  v-model="form.note"
                  clearable
                  placeholder="请输入备注"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
                <el-input v-model="form.sort" clearable placeholder="排序" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品数量" prop="productCount">
                <el-input
                  v-model="form.productCount"
                  clearable
                  placeholder="数量"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="链接地址" prop="url">
                <el-input v-model="form.url" clearable placeholder="地址" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首页轮播位置">
                <template>
                  <el-select v-model="value" clearable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开始时间">
                <template>
                  <div class="block">
                    <el-date-picker
                      v-model="timeValueStr"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </div>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <template>
                  <div class="block">
                    <el-date-picker
                      v-model="timeValueEnd"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </div>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="上下线状态">
                <template>
                  <el-switch
                    v-model="form.status"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片">
                <template>
                  <el-upload
                    ref="uploadImg"
                    class="avatar-uploader"
                    action="/lejuAdmin/material/uploadFileOss"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :headers="token"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="uploadImage"
                      :src="uploadImage"
                      class="avatar"
                    >
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </template>
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
        <el-table-column fixed align="center" type="index" label="序号" />
        <el-table-column prop="addressName" label="广告图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间">
          <template slot-scope="scope">
            <p>开始时间:{{ scope.row.startTime }}</p>
            <p>结束时间:{{ scope.row.endTime }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="广告名称" align="center" />
        <el-table-column prop="clickCount" label="点击数" align="center" />
        <el-table-column prop="orderCount" label="下单数" align="center" />
        <el-table-column align="center" label="轮播位置">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? "首页轮播":'其它页面' }}
          </template>
        </el-table-column>
        <el-table-column prop="url" label="链接地址" align="center" />
        <el-table-column prop="note" label="备注" align="center" />
        <el-table-column label="上下线状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "上线" : "下线" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
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
  adsList,
  delAds,
  addAds,
  updateAds
} from '@/api/sales/advertised/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
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
      },
      uploadImage: '',
      timeValueStr: '',
      timeValueEnd: '',
      options: [
        {
          value: 0,
          label: 1
        },
        {
          value: 1,
          label: 'App首页轮播'
        }
      ],
      value: '',
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
      this.form = {}
      this.isshow = true
      this.dialogVisible = true
      this.value = ''
      this.timeValueStr = ''
      this.timeValueEnd = ''
      this.uploadImage = ''
    },
    // 初始数据
    initAddressList() {
      adsList().then((res) => {
        // console.log(res.data.items)

        const { data } = res
        this.tableData = data.items
      })
    },
    // 不够 10 添加 0
    p(s) {
      return s < 10 ? '0' + s : s
    },
    // 点击 确定 提交表单
    sureForm() {
      this.form.type = this.value
      const timeStr = new Date(this.timeValueStr)
      const resDate = timeStr.getFullYear() + '-' + this.p((timeStr.getMonth() + 1)) + '-' + this.p(timeStr.getDate())
      const resTime = this.p(timeStr.getHours()) + ':' + this.p(timeStr.getMinutes()) + ':' + this.p(timeStr.getSeconds())
      this.form.startTime = resDate + ' ' + resTime
      const timeEnd = new Date(this.timeValueEnd)
      const resDate1 = timeEnd.getFullYear() + '-' + this.p((timeEnd.getMonth() + 1)) + '-' + this.p(timeEnd.getDate())
      const resTime1 = this.p(timeEnd.getHours()) + ':' + this.p(timeEnd.getMinutes()) + ':' + this.p(timeEnd.getSeconds())
      this.form.endTime = resDate1 + ' ' + resTime1
      // console.log(this.form)
      addAds(this.form).then((res) => {
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
    // 点击 删除 按钮
    del(id) {
      delAds(id).then((res) => {
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
    edit(data) {
      // console.log(data)
      this.isshow = false
      this.dialogVisible = true
      this.timeValueStr = new Date(Date.parse(data.startTime.replace(/-/g, '/')))
      this.timeValueEnd = new Date(Date.parse(data.endTime.replace(/-/g, '/')))
      this.value = data.type
      this.uploadImage = data.pic
      this.form = data
    },
    // 点击 更新 按钮
    uploadForm() {
      updateAds(this.form).then((res) => {
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
    // 图片上传 成功
    handleAvatarSuccess(res) {
      // console.log(res)
      const { success, data, message } = res
      if (success) {
        // console.log(URL.createObjectURL(file.raw))
        this.form.pic = data.fileUrl
        this.uploadImage = data.fileUrl
        // console.log(this.form)
        // 清除图片底部的 文件列表
        this.$refs.uploadImg.clearFiles()
      } else {
        Message.error(message)
      }
    },
    // 上传之前的校验
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
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

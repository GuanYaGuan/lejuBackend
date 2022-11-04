<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="small" @click="add">新增</el-button>
      </div>
      <!-- 对话框 -->
      <el-dialog title="地址详情" :visible.sync="dialogVisible" width="50%">
        <el-form ref="form" :model="form" label-width="160px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="品牌名称">
                <el-input
                  v-model="form.name"
                  clearable
                  placeholder="请输入品牌名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首字母">
                <el-input v-model="form.firstLetter " clearable placeholder="首字母" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="排序">
                <el-input v-model="form.sort " clearable placeholder="排序" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品数量">
                <el-input
                  v-model="form.productCount "
                  clearable
                  placeholder="产品数量"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否展示">
                <el-switch v-model="form.showStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否为品牌制造商">
                <el-switch v-model="form.factoryStatus " :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="上传专区大图">
                <template>
                  <el-upload
                    ref="uploadImgOne"
                    class="avatar-uploader"
                    action="/lejuAdmin/material/uploadFileOss"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccessOne"
                    :headers="token"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="bigPic" :src="bigPic " class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上传logo">
                <template>
                  <el-upload
                    ref="uploadImgTwo"
                    class="avatar-uploader"
                    action="/lejuAdmin/material/uploadFileOss"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccessTwo"
                    :headers="token"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="logo " :src="logo " class="avatar">
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
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column prop="name" label="品牌名称" align="center" />
        <el-table-column prop="showStatus" label="展示状态" align="center" width="180">
          <template slot-scope="scope">
            是否展示: <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0" @change="swChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="logo">
          <template slot-scope="scope">
            <img :src="scope.row.logo" width="100" height="100" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="bigPic" label="专区大图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.bigPic" width="100" height="100" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="brandStory" label="品牌故事" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column align="center" label="排序" prop="sort" />
        <el-table-column
          prop="productCommentCount"
          label="产品评论数量"
          align="center"
        />
        <el-table-column
          prop="productCount"
          label="产品数量"
          align="center"
        />
        <el-table-column
          prop="factoryStatus"
          label="是否品牌制造商"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.factoryStatus==1">是</span>
            <span v-if="scope.row.factoryStatus==0">不是</span>
          </template>
        </el-table-column>
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
              @click="del(scope.row.id)"
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
  findBrandByPage,
  addBrand,
  delBrand,
  updateBrand,
  switchShowStatus
} from '@/api/goods/control/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      bigPic: '',
      logo: '',
      isshow: true,
      tableData: [],
      dialogVisible: false,
      form: {
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
      this.dialogVisible = true
      this.bigPic = ''
      this.logo = ''
    },
    // 初始数据
    initAddressList() {
      findBrandByPage(this.page.currentPage, this.page.size).then((res) => {
        // console.log(res.data.items)
        const { data } = res
        this.tableData = data.rows
        this.page.total = data.total
      })
    },
    // 点击 确定 提交表单
    sureForm() {
      // console.log(this.form)
      addBrand(this.form).then((res) => {
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
    // switch 开关状态 改变
    swChange(value) {
      // console.log(value)
      switchShowStatus({
        status: value.showStatus,
        id: value.id
      })
        .then(res => {
          // console.log(res)
          if (res.success) {
            Message.success('文章状态修改成功')
          } else {
            Message.error(res.message)
          }
        })
    },
    // 点击 删除 按钮
    del(id) {
      delBrand(id).then((res) => {
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
      console.log(data)
      this.isshow = false
      this.dialogVisible = true
      this.form = data
      this.logo = data.logo
      this.bigPic = data.bigPic
    },
    // 点击 更新 按钮
    uploadForm() {
      updateBrand(this.form).then((res) => {
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
    handleAvatarSuccessOne(res) {
      // console.log(res)
      const { success, data, message } = res
      if (success) {
        // console.log(URL.createObjectURL(file.raw))
        this.form.bigPic = data.fileUrl
        this.bigPic = data.fileUrl
        // console.log(this.form)
        // 清除图片底部的 文件列表
        this.$refs.uploadImgOne.clearFiles()
      } else {
        Message.error(message)
      }
    },
    handleAvatarSuccessTwo(res) {
      // console.log(res)
      const { success, data, message } = res
      if (success) {
        // console.log(URL.createObjectURL(file.raw))
        this.form.logo = data.fileUrl
        this.logo = data.fileUrl
        // console.log(this.form)
        // 清除图片底部的 文件列表
        this.$refs.uploadImgTwo.clearFiles()
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

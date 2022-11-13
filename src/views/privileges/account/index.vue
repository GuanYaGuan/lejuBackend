<template>
  <div class="content">
    <!-- 条件查询 -->
    <el-card class="box-card" shadow="never">
      <el-form
        ref="form"
        :model="searchForm"
        class="forms"
        label-width="80px"
        size="normal"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="昵称">
              <el-input
                v-model="searchForm.nickName"
                clearable
                placeholder="昵称/模糊查询"
                @clear="initData"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名">
              <el-input
                v-model="searchForm.username"
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
        <el-button type="primary" size="mini" @click="addUser">新增</el-button>
      </div>
      <el-dialog title="编辑用户" width="30%" :visible.sync="dialogVisible">
        <el-form :model="form" label-width="80px" size="normal">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="" />
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="form.nickName" placeholder="" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="" />
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              action="/lejuAdmin/material/uploadFileOss"
              :headers="token"
              :show-file-list="false"
              :auto-upload="true"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="avatorImg" :src="avatorImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="form.roleIds" multiple placeholder="">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="3" :offset="16">
            <el-button
              size="mini"
              @click="dialogVisible = false"
            >取消</el-button>
          </el-col>
          <el-col v-if="!uptShow" :span="3">
            <el-button
              size="mini"
              type="primary"
              @click="saveUser"
            >确定</el-button>
          </el-col>
          <el-col v-if="uptShow" :span="3">
            <el-button
              size="mini"
              type="primary"
              @click="updateUser"
            >更新</el-button>
          </el-col>
        </el-row>
      </el-dialog>
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
        <el-table-column align="center" prop="roles" label="角色" />
        <el-table-column align="center" prop="create_time" label="添加时间" />
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              style="margin-left: 20px"
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
  findUsersByPage,
  removeUser,
  findAllRoles,
  saveUserRoles,
  userDetail,
  updateUserRoles
} from '@/api/privileges/account/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      dialogVisible: false,
      articleList: [],
      listLoading: false,
      searchForm: {
        nickName: '',
        username: ''
      },
      form: {
        roleIds: []
      },
      avatorImg: '',
      rolesList: [],
      uptShow: false
    }
  },

  created() {
    findAllRoles().then((res) => {
      // console.log(res.data.items)
      this.rolesList = res.data.items
    })
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
      // 接口问题 无法传递 data 参数
      // var form = {}
      // for (var key in this.searchForm) {
      //   // 如果对象里这个key存在内容
      //   if (this.searchForm[key]) {
      //     form[key] = this.searchForm[key]
      //   }
      // }
      // console.log(form)
      // 打开tableloading
      this.listLoading = true
      findUsersByPage(this.page.currentPage, this.page.size).then((res) => {
        // console.log(res.data)
        if (res.success) {
          this.articleList = res.data.rows
          // 声总数居条数
          this.page.total = res.data.total
        } else {
          this.$message.error('请求失败')
        }
        this.listLoading = false
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
    // 点击 编辑
    edit(id) {
      // 弹出 弹窗
      this.dialogVisible = true
      // 更新按钮限时
      this.uptShow = true
      userDetail(id)
        .then(res => {
        // console.log(res);
          this.form = res.data.user
          this.avatorImg = res.data.user.salt
        })
    },
    // 点击 删除
    del(id) {
      // console.log(val)
      removeUser(id).then((res) => {
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
    addUser() {
      // 打开 弹窗 并置空
      this.form = {}
      this.avatorImg = ''
      this.dialogVisible = true
    },
    // 头像上传 成功
    handleAvatarSuccess(res, file) {
      this.avatorImg = URL.createObjectURL(file.raw)
      this.form.salt = res.data.fileUrl
    },
    // 点击 确定 保存 用户
    saveUser() {
      saveUserRoles(this.form).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('添加成功')
          this.dialogVisible = false
          this.getArticleListInit()
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 更新按钮
    updateUser() {
      updateUserRoles(this.form)
        .then((res) => {
          const { success, message } = res
          if (success) {
            Message.success('更新成功')
            this.uptShow = false
            this.dialogVisible = false
            this.getArticleListInit()
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
  .card {
    margin-top: 30px;
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
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
      display: block;
    }
  }
}
</style>

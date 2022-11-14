<template>
  <div class="content">
    <!-- 新增及内容展示 -->
    <el-card class="card" shadow="never">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="addUser">新增角色</el-button>
      </div>
      <el-dialog title="编辑用户" width="40%" :visible.sync="dialogVisible">
        <el-form :model="form" label-width="80px" size="normal">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" placeholder="" />
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input v-model="form.roleCode" placeholder="" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="选择菜单">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-checkbox v-model="expandAll" @change="changeExpand">展开/关闭</el-checkbox>
              </el-col>
              <el-col :span="6">
                <el-checkbox v-model="selectAll" @change="changeSelect">全选/取消全选</el-checkbox>
              </el-col>
            </el-row>
            <el-tree
              ref="tree"
              node-key="id"
              :data="menuList"
              :props="props"
              show-checkbox
            />
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col :span="3" :offset="16">
            <el-button
              size="mini"
              @click="dialogVisible = false"
            >取消</el-button>
          </el-col>
          <el-col v-if="!uptShow" :span="5">
            <el-button
              size="mini"
              type="primary"
              @click="saveUser"
            >确定</el-button>
          </el-col>
          <el-col v-if="uptShow" :span="5">
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
          prop="roleName"
          label="角色名称"
        />
        <el-table-column
          align="center"
          prop="roleCode"
          label="角色编码"
        />
        <el-table-column align="center" prop="remark" label="备注" />
        <el-table-column align="center" prop="createTime" label="添加时间" />
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
  findRolesByPage,
  removeRole,
  findAllPermissions,
  saveRolePermissions,
  findRolePermissions,
  updateRolePermissions
} from '@/api/privileges/role/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      dialogVisible: false,
      articleList: [],
      listLoading: false,
      form: {
        permissionIds: []
      },
      uptShow: false,
      menuList: [],
      props: {
        label: 'title',
        children: 'children'
      },
      expandAll: false,
      selectAll: false
    }
  },

  created() {
    this.getArticleListInit()
    findAllPermissions()
      .then(res => {
        // console.log(res.data)
        this.menuList = res.data.menus
      })
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
      this.listLoading = true
      findRolesByPage(this.page.currentPage, this.page.size).then((res) => {
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
      // 重置 tree 的状态
      this.expandAll = false
      this.selectAll = false
      var nodes = this.$refs.tree.store.nodesMap // 对象
      for (const key in nodes) {
        nodes[key].expanded = false
        nodes[key].checked = false
      }
      // 弹出 弹窗
      findRolePermissions(id)
        .then(res => {
          // console.log(res.data)
          this.form = res.data.role
        })
      this.dialogVisible = true
      // 更新按钮限时
      this.uptShow = true
    },
    // 点击 删除
    del(id) {
      // console.log(val)
      removeRole(id).then((res) => {
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
      this.dialogVisible = true
    },
    // 点击 确定 保存 用户
    saveUser() {
      var arrIds = []
      var nodes = this.$refs.tree.store.nodesMap // 对象
      for (const key in nodes) {
        if (nodes[key].checked) {
          arrIds.push(nodes[key].data.id)
        }
      }
      this.form.permissionIds = arrIds
      saveRolePermissions(this.form).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('添加成功')
          this.dialogVisible = false
          this.page.currentPage = 1
          this.getArticleListInit()
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 更新按钮
    updateUser() {
      updateRolePermissions(this.form)
        .then((res) => {
          const { success, message } = res
          if (success) {
            Message.success('更新成功')
            this.uptShow = false
            this.dialogVisible = false
            this.page.currentPage = 1
            this.getArticleListInit()
          } else {
            Message.error(message)
          }
        })
    },
    // 点击 展开 按钮
    changeExpand(e) {
      // console.log(this.$refs.tree.store.nodesMap)
      // 展开
      var nodes = this.$refs.tree.store.nodesMap // 对象
      for (const key in nodes) {
        nodes[key].expanded = e
      }
    },
    // 点击 全选
    changeSelect(e) {
      var nodes = this.$refs.tree.store.nodesMap // 对象
      for (const key in nodes) {
        nodes[key].checked = e
      }
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

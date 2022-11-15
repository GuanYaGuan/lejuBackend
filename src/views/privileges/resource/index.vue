<template>
  <div class="content">
    <el-card shadow="never">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button
            size="mini"
            type="warning"
            @click="dialogVisibleTwo = true"
          >初始化菜单</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="dialogVisible = true"
          >新增菜单</el-button>
        </el-col>
      </el-row>
      <!-- 编辑菜单 -->
      <el-dialog title="编辑菜单" :visible.sync="dialogVisible" width="40%">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col>
            <span style="font-weight: 700; margin-right: 20px">菜单类型</span>
            <el-radio v-model="radio" :label="1">顶级目录</el-radio>
            <el-radio v-model="radio" :label="2">菜单</el-radio>
            <el-radio v-model="radio" :label="3">按钮</el-radio>
          </el-col>
        </el-row>
        <div v-if="radio === 1" class="first-box">
          <el-form :model="form" label-width="80px">
            <el-form-item label="路由名称">
              <el-input v-model="form.title" placeholder="前端路由name唯一" />
            </el-form-item>
            <el-form-item label="路径">
              <el-input
                v-model="form.path"
                placeholder="前端路由path忽略父节点路径"
              />
            </el-form-item>
            <el-form-item label="组建路径">
              <el-input
                v-model="form.component"
                placeholder="前端路由组建路径,比如@/views/foo/foo.vue"
              />
            </el-form-item>
            <el-form-item label="重定向">
              <el-input v-model="form.redirect" placeholder="redirect" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" placeholder="越小越靠前" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="是否隐藏">
                  <el-radio v-model="form.hidden" label="false">是</el-radio>
                  <el-radio v-model="form.hidden" label="true">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否展开">
                  <el-radio v-model="form.alwaysShow" label="true">是</el-radio>
                  <el-radio
                    v-model="form.alwaysShow"
                    label="false"
                  >否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="meta属性">
              <el-row
                v-for="(item, index) in meta"
                :key="index"
                style="margin-bottom: 20px"
                :gutter="20"
              >
                <el-col :span="9">
                  <el-input v-model="item.key" clearable placeholder="" />
                </el-col>
                <el-col :span="9">
                  <el-input v-model="item.value" clearable placeholder="" />
                </el-col>
                <el-col :span="4">
                  <i
                    class="el-icon-plus"
                    style="margin-right: 20px"
                    @click="addRow"
                  />
                  <i class="el-icon-minus" @click="cutRow(index)" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="radio === 2" class="first-box">
          <el-form :model="form" label-width="80px">
            <el-form-item label="上级菜单">
              <el-cascader
                :options="resourceData"
                :props="{ checkStrictly: true, label: 'title', value: 'id' }"
                clearable
                @change="getID"
              />
            </el-form-item>
            <el-form-item label="路由名称">
              <el-input
                v-model="form.title"
                placeholder="前端路由path忽略父节点路径"
              />
            </el-form-item>
            <el-form-item label="路径">
              <el-input
                v-model="form.path"
                placeholder="前端路由组建路径,比如@/views/foo/foo.vue"
              />
            </el-form-item>
            <el-form-item label="组建路径">
              <el-input v-model="form.component" placeholder="redirect" />
            </el-form-item>
            <el-form-item label="重定向">
              <el-input v-model="form.redirect" placeholder="redirect" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="form.sort" placeholder="越小越靠前" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="是否隐藏">
                  <el-radio v-model="form.hidden" label="false">是</el-radio>
                  <el-radio v-model="form.hidden" label="true">否</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否展开">
                  <el-radio v-model="form.alwaysShow" label="true">是</el-radio>
                  <el-radio
                    v-model="form.alwaysShow"
                    label="false"
                  >否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="meta属性">
              <el-row
                v-for="(item, index) in meta"
                :key="index"
                style="margin-bottom: 20px"
                :gutter="20"
              >
                <el-col :span="9">
                  <el-input v-model="item.key" clearable placeholder="" />
                </el-col>
                <el-col :span="9">
                  <el-input v-model="item.value" clearable placeholder="" />
                </el-col>
                <el-col :span="4">
                  <i
                    class="el-icon-plus"
                    style="margin-right: 20px"
                    @click="addRow"
                  />
                  <i class="el-icon-minus" @click="cutRow(index)" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="radio === 3" class="first-box">
          <el-form :model="form" label-width="80px">
            <el-form-item label="所在页面">
              <el-cascader
                :options="resourceData"
                :props="{ checkStrictly: true, label: 'title', value: 'id' }"
                clearable
                @change="getIDlast"
              />
            </el-form-item>
            <el-form-item label="按钮名称">
              <el-input v-model="form.title" placeholder="按钮名称" />
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="排序">
                  <el-input-number v-model="form.sort" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="层级">
                  <el-input-number v-model="form.level" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="权限标识">
              <el-input
                v-model="form.permissionValue"
                rows="3"
                type="textArea"
                placeholder=""
              />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePre">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 初始化菜单 -->
      <el-dialog
        title="初始化菜单"
        :visible.sync="dialogVisibleTwo"
        width="40%"
      >
        <el-alert
          title="请谨慎操作! 初始化菜单会覆盖之前记录!"
          type="warning"
          style="margin-bottom: 20px"
        />
        <el-tree :data="resourceData" :props="{ label: 'title' }" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTwo = false">取 消</el-button>
          <el-button type="primary" @click="resetMenus">确 定</el-button>
        </span>
      </el-dialog>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col>
          <el-table
            :data="resourceData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              prop="title"
              label="菜单名称"
              sortable
              width="180"
            />
            <el-table-column
              align="center"
              prop="icon"
              label="图标"
              sortable
              width="180"
            >
              <template slot-scope="scope">
                <i :class="scope.row.icon" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="level" label="等级" />
            <el-table-column align="center" prop="sort" label="排序" />
            <el-table-column align="center" prop="path" label="路由" />
            <el-table-column align="center" prop="component" label="组建路径" />
            <el-table-column align="center" prop="status" label="是否可用" />
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
            />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  findAllPermissions,
  savePermissions,
  update
} from '@/api/privileges/resource/index'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      resourceData: [],
      form: {},
      meta: [
        { key: 'title', value: '' },
        { key: 'icon', value: 'el-icon-menu' }
      ],
      title: 'title',
      icon: 'icon',
      dialogVisible: false,
      dialogVisibleTwo: false,
      radio: 1,
      pidsTwo: '',
      pidsLast: ''
    }
  },
  created() {
    this.initTable()
  },
  mounted() {},

  methods: {
    // 初始化数据
    initTable() {
      findAllPermissions().then((res) => {
        // console.log(res.data.menus)
        this.resourceData = res.data.menus
      })
    },
    // 点击 加号 新增 一行
    addRow() {
      var obj = { key: '', value: '' }
      this.meta.push(obj)
    },
    // 点击 减号
    cutRow(index) {
      // console.log(index)
      this.meta.splice(index, 1)
    },
    //  获取 菜单 选中 的值
    getID(e) {
      this.pidsTwo = e.slice(-1)[0]
    },
    //  获取 菜单 选中 的值
    getIDlast(e) {
      this.pidsLast = e.slice(-1)[0]
    },
    // 点击 顶级 目录 保存
    savePre() {
      var obj = {}
      this.meta.forEach((ele) => {
        obj[ele.key] = ele.value
      })
      this.form.meta = JSON.stringify(obj)
      // console.log(this.form.meta)
      if (this.radio === 1) {
        this.form.name = this.form.title
        this.form.icon = 'el-icon-menu'
        this.form.type = 1
        this.form.level = 0
        // 所属上级 的 id
        this.form.pid = '0'
      }
      if (this.radio === 2) {
        this.form.name = this.form.title
        this.form.icon = 'el-icon-menu'
        this.form.type = 1
        this.form.level = 1
        // 所属上级 的 id
        this.form.pid = this.pidsTwo
      }
      if (this.radio === 3) {
        this.form.type = 2
        // 所属上级 的 id
        this.form.pid = this.pidsLast
      }

      savePermissions(this.form).then((res) => {
        const { success, message } = res
        if (success) {
          Message.success('保存成功')
          this.dialogVisible = false
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 初始化
    resetMenus() {
      update(this.resourceData)
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('初始化成功')
            this.dialogVisibleTwo = false
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
  .dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
  }
}
</style>

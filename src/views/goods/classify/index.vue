<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>分类管理</span>
      </div>
      <div class="body">
        <div class="kind-box">
          <h4>乐居分类:</h4>
          <el-row :gutter="20" align="center">
            <el-col v-for="(item,index) in leju" :key="item.id" :span="6">
              <el-card shadow="hover">
                <div slot="header" class="clearfix">
                  <span>{{ item.name }}</span>
                </div>
                <el-upload
                  ref="uploadImg"
                  class="upload-demo"
                  action="/lejuAdmin/material/uploadFileOss"
                  :headers="token"
                  :show-file-list="false"
                  :on-success="ele=>getImg(ele,index)"
                >
                  <img :src="item.icon" alt="" width="280" height="300">
                </el-upload>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="all-kind">
          <h4>全部分类:</h4>
          <el-table
            :data="lejuData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              prop="name"
              label="菜单名称"
              sortable
              width="180"
            />
            <el-table-column
              align="center"
              prop="icon"
              label="icon"
              sortable
              width="180"
            >
              <template slot-scope="scope">
                <img :src="scope.row.icon" width="100" height="100" alt="">
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="keywords"
              label="分类名字"
            />
            <el-table-column
              align="center"
              prop="sort"
              label="排序"
            />
            <el-table-column
              align="center"
              prop="showStatus"
              label="显示状态"
            >
              <template slot-scope="scope">
                <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="navStatus"
              label="导航栏展示"
            >
              <template slot-scope="scope">
                <el-switch v-model="scope.row.navStatus" :active-value="1" :inactive-value="0" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="description"
              label="描述"
            />
            <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
            />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAllCategory, updateCategory } from '@/api/goods/classify/index'
import mix from '@/mixins/index'
import { Message } from 'element-ui'
export default {
  mixins: [mix],
  data() {
    return {
      lejuData: [],
      leju: []
    }
  },
  computed: {
    // 筛选出 乐居分类的数据
    // leju() {
    //   if (this.lejuData.find(ele => ele.category.name === '乐居')) {
    //     return this.lejuData.find(ele => ele.category.name === '乐居').children
    //   }
    //   return []
    // }
  },
  created() {
    this.initList()
  },
  mounted() {},

  methods: {
    // 初始
    initList() {
      getAllCategory()
        .then(res => {
        // console.log(res.data)
          var arr = res.data.items.map(ele => {
            return {
              ...ele.category,
              children: ele.children
            }
          })
          this.lejuData = arr
          this.leju = arr.find(ele => ele.name === '乐居').children
        })
    },
    // 上传 成功 获取 路径
    getImg(e, index) {
      // console.log(e, index)
      this.leju[index].icon = e.data.fileUrl
      updateCategory(this.leju[index])
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('更改成功')
            this.initList()
          } else {
            message.error(message)
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

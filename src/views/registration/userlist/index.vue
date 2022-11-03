<template>
  <div class="content">
    <el-card shadow="never">
      <el-table :data="userList" border stripe style="width: 100%">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column label="用户名" align="center" prop="username" />
        <el-table-column align="center" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" style="width:60px;height:60px;border-radius: 50%;">
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center" prop="nickname" />
        <el-table-column label="真实姓名" align="center" prop="realname" />
        <el-table-column label="性别" align="center" prop="sex" />
        <el-table-column label="电话" align="center" prop="phone" />
        <el-table-column label="邮箱" align="center" prop="email" />
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
import { findMembersByPage } from '@/api/registration/index'
import mix from '@/mixins/index'
export default {
  mixins: [mix],
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.initUserList()
  },
  mounted() {},

  methods: {
    // 初始化
    initUserList() {
      findMembersByPage(this.page.currentPage, this.page.size).then((res) => {
        // console.log(res)
        const { success, data } = res
        if (success) {
          this.userList = data.rows
          this.page.total = data.total
        }
      })
    },
    // size改变的时候触发的钩子函数
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.initUserList()
    },
    // 点击页数的时候触发的钩子函数
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.initUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;

}
</style>

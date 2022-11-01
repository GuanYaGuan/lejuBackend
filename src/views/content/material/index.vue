<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-upload
          ref="upload"
          action="/lejuAdmin/material/uploadFileOssSave"
          :on-success="uploadFileOssSuccess"
          :headers="token"
          :before-upload="uploadCoverimg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <el-row :gutter="20">
        <el-col v-for="item in materialdata" :key="item.id" style="width: 20%">
          <el-card shadow="always" style="margin-bottom: 20px">
            <div slot="header" class="clearfix">
              创建时间:{{ item.createTime }}
            </div>
            <el-image
              style="width: 220px; height: 250px"
              :src="item.ossUrl"
              :preview-src-list="previewListImage"
            />
            <el-button
              type="danger"
              style="margin-top: 20px; margin-left: 75%"
              size="mini"
              @click="delImage(item.id)"
            >删除</el-button>
          </el-card>
        </el-col>
      </el-row>
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
import { Message } from 'element-ui'
import { findMaterialByPage, delMaterial } from '@/api/content/material/index'
import mix from '@/mixins/index'
export default {
  mixins: [mix],
  data() {
    return {
      materialdata: [],
      previewListImage: []
    }
  },
  created() {
    this.page.currentPage = 1
    this.initList()
  },
  mounted() {},

  methods: {
    initList() {
      findMaterialByPage(this.page.currentPage, this.page.size).then((res) => {
        // console.log(res.data)
        const { data, success, message } = res
        if (success) {
          this.materialdata = data.rows
          this.page.total = data.total
          this.previewListImage = data.rows.map((ele) => ele.ossUrl)
        } else {
          Message.error(message)
        }
      })
    },
    // 上传成功的 回调
    uploadFileOssSuccess(res) {
      console.log(res)
      const { message, success } = res
      if (success) {
        Message.success('上传成功')
        this.$refs.upload.clearFiles()
        this.initList()
      } else {
        Message.error(message)
      }
    },
    // size改变的时候触发的钩子函数
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.initList()
    },
    // 点击页数的时候触发的钩子函数
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.initList()
    },
    // 素材图片上传前校验
    uploadCoverimg(file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webp'||file.type === 'image/png'
      const reg = /^image\/(png|jpg)$/
      const isimgType = reg.test(file.type)
      const isLt1dot5M = file.size / 1024 < 500

      if (!isimgType) {
        Message.error('请按照格式上传图片')
      }
      if (!isLt1dot5M) {
        Message.error('上传头像图片大小不能超过 500kb!')
      }
      return isimgType && isLt1dot5M
    },
    // 点击 删除
    delImage(id) {
      delMaterial(id)
        .then(res => {
          const { success, message } = res
          if (success) {
            Message.success('删除成功')
            this.initList()
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

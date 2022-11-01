<template>
  <div class="content">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>新增文章</span>
      </div>
      <el-form
        ref="articleDetail"
        size="normal"
        label-width="120px"
        :model="articleData"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="articleData.author"
                type="text"
                placeholder="作者姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题" prop="title">
              <el-input
                v-model="articleData.title"
                type="text"
                placeholder="文章标题"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否显示">
              <el-switch
                v-model="articleData.isShow"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="摘要">
              <el-input
                id=""
                v-model="articleData.summary"
                type="textarea"
                placeholder="摘要"
                rows="3"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="封面图片">
              <el-upload
                ref="uploadCom"
                :action="uploadfilesOss"
                :headers="token"
                :on-success="uploadSuc"
                :before-upload="uploadCoverimg"
              >
                <img
                  v-if="articleData.coverImg"
                  style="width: 200px; height: 200px"
                  :src="articleData.coverImg"
                  alt=""
                >
                <el-button
                  v-else
                  type="primary"
                  size="small"
                >点击上传素材</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png/gif/webp文件,且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="切换富文本类型">
              <el-radio
                v-model="articleData.editorType"
                :label="0"
              >富文本</el-radio>
              <el-radio
                v-model="articleData.editorType"
                :label="1"
              >Markdown</el-radio>
              <span
                style="color: #e6a23c"
              ><i class="el-icon-warning-outline" />
                注意!切换编辑器会清空编辑内容</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <Tinymce
              v-if="articleData.editorType == 0"
              v-model="articleData.content1"
              @change="editorChange"
            />
            <mavon-editor
              v-if="articleData.editorType == 1"
              ref="markdown"
              v-model="articleData.content1"
              @imgAdd="$imgAdd"
              @change="editorChange"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="19">
            <el-form-item style="margin-top: 40px">
              <el-button size="small" type="primary" @click="submit">
                <span v-if="this.$route.query.id">立即修改</span>
                <span v-else>新增</span>
              </el-button>
              <el-button
                size="small"
                type="default"
                style="margin-left: 30px"
                @click="returnLast"
              >取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { Message } from 'element-ui'
import { addArticle, productArticle } from '@/api/content/article/detail/index'
import mix from '@/mixins/index'
import axios from 'axios'
export default {
  components: {
    Tinymce
  },
  mixins: [mix],
  data() {
    return {
      rules: {
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      articleData: {
        editorType: 0,
        isShow: 1,
        coverImg: ''
      },
      fileimage: []
    }
  },
  created() {
    if (this.$route.query.id) {
      productArticle(this.$route.query.id).then((res) => {
        // console.log(res)
        this.articleData = res.data.productArticle
      })
    }
  },
  mounted() {},

  methods: {
    // 点击 提交
    submit() {
      // console.log(this.articleData)
      this.$refs.articleDetail.validate((valid) => {
        if (valid) {
          if (this.articleData.editorType === 0) {
            // 富文本 富文本转化后的HTML 和原文一样
            this.articleData.content2 = this.articleData.content1
          } else {
            // 获取 markdown 转化后的 html 源码
            // console.log(this.$refs.markdownEditor.d_render)
            this.articleData.content2 = this.$refs.markdown.d_render
          }
          // 成功发送请求
          addArticle(this.articleData).then((res) => {
            const { success, message } = res
            if (success) {
              Message.success(message)
              this.$router.push({ name: 'Article' })
            } else {
              Message.error(message)
            }
          })
        } else {
          Message.error('请注意表单验证')
          return false
        }
      })
    },
    // 封面图片上传成功
    uploadSuc(res) {
      const { success, data, message } = res
      if (success) {
        this.articleData.coverImg = data.fileUrl
        // 清除图片底部的 文件列表
        this.$refs.uploadCom.clearFiles()
      } else {
        Message.error(message)
      }
      // console.log(res)
      // console.log(file)
      // console.log(fileLsit)
    },
    // 封面图片上传前校验
    uploadCoverimg(file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webp'||file.type === 'image/png'
      const reg = /^image\/(jpeg|png|gif|webp|jpg)$/
      const isimgType = reg.test(file.type)
      const isLt1dot5M = file.size / 1024 / 1024 < 1.5

      if (!isimgType) {
        Message.error('请按照格式上传图片')
      }
      if (!isLt1dot5M) {
        Message.error('上传头像图片大小不能超过 2MB!')
      }
      return isimgType && isLt1dot5M
    },
    // 编辑器类型切换
    editorChange() {
      this.articleData.content1 = ''
    },
    // 上传 图片
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: this.uploadfilesOss,
        method: 'post',
        data: formdata,
        headers: this.token
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        const { data, message, success } = res.data
        if (success) {
          const { fileurl } = data
          this.$refs.markdown.$img2Url(pos, fileurl)
        } else {
          Message.error(message)
        }
      })
    },
    // 点击 取消按钮 返回 文章列表页面
    returnLast() {
      this.$router.push('/content/article')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
}
</style>

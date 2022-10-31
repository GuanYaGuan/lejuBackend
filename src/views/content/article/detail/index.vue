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
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileimage"
                list-type="picture"
              >
                <el-button type="primary" size="small">点击上传素材</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件,且不超过500kb
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
            <Tinymce />
          </el-col>
        </el-row>

        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="submit"
          >新增</el-button>
          <el-button size="small" type="default">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
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
      articleData: {},
      fileimage: []
    }
  },

  mounted() {
  },

  methods: {
    // 点击 提交
    submit() {}
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
}
</style>

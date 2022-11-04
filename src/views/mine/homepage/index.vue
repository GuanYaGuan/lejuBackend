<template>
  <div class="content">
    <el-card shadow="never">
      <el-row :gutter="20" align="center">
        <el-col :span="8">
          <div class="left-box">
            <div class="user-icon">
              <img
                :src="userinfo.icon"
                alt=""
                width="100"
                height="100"
                style="border-radius: 50%"
              >
              <div class="name">{{ userinfo.username }}</div>
            </div>
            <div class="tag">
              <div class="item">
                <i class="el-icon-collection-tag" />
                <span>交互专家</span>
              </div>
              <div class="item">
                <i class="el-icon-user-solid" />
                <span>不凡学院－某某某事业群－某某平台部－某某技术部－UED</span>
              </div>
              <div class="item">
                <i class="el-icon-location-outline" />
                <span>河南省 郑州市 金水区 绿地新都会</span>
              </div>
            </div>
            <!-- 标签 -->
            <div class="tip-box">
              <div class="title">标签</div>
              <div class="tag-box">
                <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  size="small"
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+</el-button>
              </div>
            </div>
            <!-- 分组 -->
            <div class="group">
              <div class="item">
                <img
                  src="@/assets/icons/bufan.jpg"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>不凡设计组</span>
              </div>
              <div class="item">
                <img
                  src="@/assets/icons/B.jpg"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>不凡前端开发组</span>
              </div>
              <div class="item">
                <img
                  src="@/assets/icons/b.png"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>阿里支付组</span>
              </div>
              <div class="item">
                <img
                  src="@/assets/icons/alipay.png"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>阿里支付组</span>
              </div>
              <div class="item">
                <img
                  src="@/assets/icons/vue.png"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>全员都是吴彦祖</span>
              </div>
              <div class="item">
                <img
                  src="@/assets/icons/A.png"
                  width="25"
                  height="25"
                  style="border-radius: 50%; margin-right: 10px"
                  alt=""
                >
                <span>高逼格天团</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="right-box">
            <el-tabs v-model="activeName">
              <el-tab-pane label="文章" name="first">
                <div class="info-box">
                  <div v-for="(item,index) in 8" :key="index" class="item">
                    <p>Vue</p>
                    <el-tag style="margin-right:10px;" size="mini">Element</el-tag>
                    <el-tag style="margin-right:10px;" size="mini">饿了么</el-tag>
                    <el-tag style="margin-right:10px;" size="mini">设计语言</el-tag>
                    <div class="article">段落示意：element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。element，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</div>
                    <div class="name">周树人&nbsp;&nbsp;&nbsp;&nbsp;2022-11-4&nbsp;&nbsp;&nbsp;&nbsp;15:32</div>
                    <div class="bottom">
                      <div class="item-last" style="color:rgba(0,0,0,.45);">
                        <i class="el-icon-s-flag" />
                        125
                      </div>
                      <div class="line" />
                      <div class="item-last" style="color:rgba(0,0,0,.45);">
                        <i class="el-icon-thumb" />
                        24511
                      </div>
                      <div class="line" />
                      <div class="item-last" style="color:rgba(0,0,0,.45);">
                        <i class="el-icon-chat-line-round" />
                        666
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目" name="second">
                <el-row :gutter="20">
                  <el-col v-for="(item,index) in 8" :key="index" style="width:25%">
                    <el-card shadow="hover" class="other" :body-style="{padding:0}">
                      <img width="200" height="150" src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120163137052iXjVmWVHbCJAyqvDxdtx.png" alt="">
                      <div class="font-box">
                        <p>不凡学院</p>
                        <p style="font-size:12px">那是一种内在的东西， 他们到达不了，也无法触及的</p>
                        <div class="bottom">
                          <div class="left" style="font-size:12px">1天前</div>
                          <div class="right">
                            <img width="20" height="20" style="border-radius:50%;z-index:3" src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120165417366ZiESqWwCXBRQoaPONSJe.png" alt="">
                            <img width="20" height="20" style="border-radius:50%;margin-left:-10px;z-index:2" src="https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201120152029983801.jpg" alt="">
                            <img width="20" height="20" style="border-radius:50%;margin-left:-10px;z-index:1" src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png" alt="">
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/myAuthor'
export default {
  data() {
    return {
      userinfo: {},
      dynamicTags: [
        '不凡魂',
        '学学',
        '代码',
        'vue',
        '中后台',
        '学习型',
        '学术性'
      ],
      inputVisible: false,
      inputValue: '',
      activeName: 'first'
    }
  },
  created() {
    this.userinfo = getUserInfo()
  },
  mounted() {},

  methods: {
    // 删除标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 点击加号 新建标签 并聚焦和展示输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 将输入框的值 push 进 dynamicTags
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 30px;
  .left-box {
    padding: 20px;
    border: 1px solid #ebeef5;
    .user-icon {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 40px;
      .name {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
    }
    .tag {
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 20px;
      .item {
        margin-top: 10px;
        font-size: 13px;
      }
    }
    .tip-box {
      margin-top: 20px;
      border-bottom: 1px solid #ebeef5;
      padding-bottom: 20px;
      .tag-box {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .el-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
        .button-new-tag {
          height: 25px;
          line-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .group {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 20px;
      .item {
        width: 50%;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
    }
  }
  .right-box {
    border: 1px solid #ebeef5;
    padding: 20px;
    .info-box {
      margin: 20px;
      .item{
        padding-bottom: 20px;
        border-bottom: 1px dashed #cfd2d8;
        .article{
          font-size: 14px;
          margin: 20px 0;
        }
        .name{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          font-size: 13px;
          color: rgba($color: #000000, $alpha: .45);
        }
        .bottom{
          display: flex;
          .line{
            width: 1px;
            height: 18px;
            margin: 0 10px;
            background-color: rgba(0,0,0,.45);
          }
        }
      }
    }
    .other{
      margin-bottom: 20px;
      .font-box{
        margin: 0 10px;
        margin-bottom: 10px;
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .right{
        display: flex;
      }
    }
  }
}
</style>

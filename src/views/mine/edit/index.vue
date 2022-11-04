<template>
  <div class="content">
    <el-card shadow="never">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="安全设置">
          <div class="title">安全设置</div>
          <div class="body">
            <div class="item">
              <div class="left">
                <div>账号密码</div>
                <div>当前密码强度: 强</div>
              </div>
              <el-button type="text" size="medium">修改</el-button>
            </div>
            <div class="item">
              <div class="left">
                <div>密保手机</div>
                <div>已绑定手机：138****8293</div>
              </div>
              <el-button type="text" size="medium">修改</el-button>
            </div>
            <div class="item">
              <div class="left">
                <div>密保问题</div>
                <div>未设置密保问题，密保问题可有效保护账户安全</div>
              </div>
              <el-button type="text" size="medium">修改</el-button>
            </div>
            <div class="item">
              <div class="left">
                <div>备用邮箱</div>
                <div>已绑定邮箱：ant***sign.com</div>
              </div>
              <el-button type="text" size="medium">修改</el-button>
            </div>
            <div class="item">
              <div class="left">
                <div>MFA 设备</div>
                <div>未绑定 MFA 设备，绑定后，可以进行二次确认</div>
              </div>
              <el-button type="text" size="medium">修改</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <div class="title">新消息通知</div>
          <div class="body">
            <div class="item">
              <div class="left">
                <div>账户密码</div>
                <div>其他用户的消息将以站内信的形式通知</div>
              </div>
              <el-switch v-model="switchValue.value1" :active-value="1" :inactive-value="0" />
            </div>
            <div class="item">
              <div class="left">
                <div>系统消息</div>
                <div>系统消息将以站内信的形式通知</div>
              </div>
              <el-switch v-model="switchValue.value2" :active-value="1" :inactive-value="0" />
            </div>
            <div class="item">
              <div class="left">
                <div>待办任务</div>
                <div>待办任务将以站内信的形式通知</div>
              </div>
              <el-switch v-model="switchValue.value3" :active-value="1" :inactive-value="0" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs></el-card></div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: 'left',
      switchValue: {
        value1: 1,
        value2: 1,
        value3: 1
      }
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  margin: 22px;
  .title {
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  .body {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20px;
      border-bottom: 1px solid #ebeef5;
      .left {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

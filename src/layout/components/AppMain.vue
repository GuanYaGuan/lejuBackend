<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <span v-if="key!='/home'" class="global-footer-copyright">
      <span class="top">
        Element
        <svg-icon icon-class="github-fill" style="margin:0 10px;" />
        Element-admin
      </span>
      <span
        class="bottom"
      >Copyright© 2017-2021 不凡学院 豫ICP备 17015347号</span>
    </span>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.global-footer-copyright {
  margin: 60px 0;
  color: rgba(0, 0, 0, .45);
  font-size: 14px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.global-footer-copyright .top {
  width: 100%;
  display: flex;
  justify-content: center;
}
.global-footer-copyright .bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

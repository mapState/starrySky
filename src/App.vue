<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    // let APPID='wx6a444e7fcb0fbf4996ed863c8bd0214593c379610b7ffc2a'
    // let url='https%3a%2f%2fzuitiankeji.com%2findex'
    
  }
};
</script>

<style>
@import "./assets/css/reset.css";
@supports (top: env(safe-area-inset-top)) {
  body,
  .header {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
/* 判断iphoneX 将 footer 的 padding-bottom 填充到最底部 */
@supports (bottom: env(safe-area-inset-bottom)) {
  body,
  .footer {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>

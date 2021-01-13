<template>
  <div class="authFailed">
    <img src="../assets/status/false.png" alt />
    <span>用户认证失败</span>
    <!-- <a class="button" href="index.html?mfsbackstyle=goback">返 回</a> -->
    <!-- href="index.html?mfsbackstyle=goback" -->
    <button class="button" @click="openScan">返 回</button>
  </div>
</template>

<script>
import MFS from "../utils/mfs_common";
import "../utils/mfs_oauth";
import "../utils/mfs_ios_compatible";
import Vue from "vue";
import { Notify } from "vant";
Vue.use(Notify);
// 全局注册
Vue.use(Notify);
export default {
  methods: {
    openScan(e) {
      console.log(e);
      console.log(MFS);
      // e.preventDefault();
      // MFS.webViewGoBack();
      MFS.goBack();
      // console.log(MFS);
      // Notify({
      //   type: "warning",
      //   message: MFS,
      // });
      // 打开扫码
      // MFS.openScan({
      //   callback: "scanFinished",
      // });
    },
  },
};
</script>

<style lang="less" scoped>
.authFailed {
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 112px;
    width: 112px;
    margin: 100px 0 20px;
  }
  span {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-bottom: 50px;
  }
  .button {
    width: 100%;
    height: 49px;
    border-radius: 50px;
    background-image: linear-gradient(45deg, #f6ce95, #e1a651);
    border: none;
    color: #fff;
    font-size: 18px;
  }
}
</style>
<template>
  <div class="authFailed">
    <img src="../assets/status/false.png" alt />
    <span>{{errorMessage}}</span>
    <br />
    <span>{{errorCode}}</span>
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
  data() {
    return {
      errorMessage: null,
      errorCode: null,
    };
  },
  mounted() {
    this.errorMessage = window.location.href.includes("errorMessage")
      ? decodeURI(window.location.href.split("=")[1].split("&")[0])
      : "认证失败";
    //  ?errorMessage="+data1.msg+"&errorCode="+data1.errorCode;
    this.errorCode = window.location.href.includes("errorCode")
      ? window.location.href.split("errorCode=")[1]
      : "11111";
  },

  methods: {
    openScan() {
      MFS.goBack();
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
  }
  .button {
    width: 100%;
    height: 49px;
    border-radius: 50px;
    background-image: linear-gradient(45deg, #f6ce95, #e1a651);
    border: none;
    color: #fff;
    font-size: 18px;
    margin-top: 50px;
  }
}
</style>
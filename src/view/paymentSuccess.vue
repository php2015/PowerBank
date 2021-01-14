<template>
  <div class="paymentSuccess">
    <img src="../assets/status/success.png" alt />
    <span>{{span}}</span>
    <!-- <a class="button" href="index.html?mfsbackstyle=goback">返 回</a> -->
    <!-- href="index.html?mfsbackstyle=goback" -->
    <button v-show="show" class="button" @click="openScan">返回首页</button>
  </div>
</template>

<script>
import { singleQuery } from "../api/api";

export default {
  data() {
    return {
      show: false,
      span: null,
    };
  },
  async mounted() {
    let orderId = window.location.search.split("&")[0].split("=")[1];
    const res = await singleQuery({ orderId });
    console.log(res);
    setTimeout(() => {
      this.span = res.msg;
      this.show = true;
    }, 1000);
  },
  methods: {
    openScan() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.paymentSuccess {
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
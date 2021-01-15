<template>
  <div class="paymentSuccess">
    <div class="loading" v-show="!show">
      <van-loading type="spinner" color="#0094ff" />
    </div>
    <div v-show="show" class="content">
      <img src="../assets/status/success.png" alt />
      <span>租用成功</span>
      <button class="button" @click="openScan">返回首页</button>
    </div>
  </div>
</template>

<script>
import { singleQuery, getLastOrder } from "../api/api";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  data() {
    return {
      show: true,
      openId: "",
    };
  },
  async mounted() {
    this.openId = localStorage.getItem("openId");
    console.log(this.openId);
    this.getLastOrder();
  },
  methods: {
    async getLastOrder() {
      const { openId } = this;
      const res = await getLastOrder({ openId });
      console.log(res);
      let orderId = res.data.orderId;
      //   fetch(`https://47.114.37.8:8888/v1/app/pay/singleQuery/${orderId}`).then(
      //     (res) => {
      //       console.log(res);
      //     }
      //   );
      singleQuery({ orderId });
    },

    openScan() {
      this.show = false;
      setTimeout(() => {
        this.show = true;
        this.$router.push("/");
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
.paymentSuccess,
.loading {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}
.van-loading {
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 250px;
}
.loading > img {
  width: 50%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}
.content {
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
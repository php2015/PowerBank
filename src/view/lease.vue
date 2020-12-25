<template>
  <div class="hire-box">
    <div class="hire">
      <div class="amount">
        <span style="font-size:18px">￥</span>99.00
      </div>
      <div class="hire-font">租用前需先充值押金</div>
    </div>
    <div class="fooer">
      <div class="depositfont">押金规则：租用充电宝需缴纳99元押金，充电宝归还后，并支付租金，即可发起退押金。</div>
      <div class="deposit" v-if="Pay == 1" @click="onpay">确认支付</div>
      <div class="deposit" v-else @click="ondeposit">退押金</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { orderadd } from "../api/api";
export default {
  data() {
    return {
      Pay: 1,
    };
  },
  mounted() {
    this.Pay = this.$route.params.pay;
  },
  methods: {
    onpay() {
      var that = this;
      orderadd({
        openId: "11",
        rentSn: "KX0571000001",
      }).then((res) => {
        if (res.code == 200) {
          console.log(res);
        }
      });
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        onClose() {
          that.$router.push({
            name: "Statuspay",
            params: {
              pay: 1,
            },
          });
        },
      });
    },
    ondeposit() {
      this.$router.push({
        path: `/`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.hire-box {
  width: 100%;
  height: 100%;
  position: relative;
  .hire {
    padding-top: 135px;
    .amount {
      font-weight: bold;
      color: #ff5400;
      line-height: 21px;
      font-size: 36px;
      text-align: center;
    }
    .hire-font {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
  }
  .fooer {
    width: 100%;
    position: fixed;
    bottom: 10px;
    .depositfont {
      line-height: 17px;
      font-size: 12px;
      width: 303px;
      color: #999;
      text-align: center;
      margin: 0 auto;
      margin-bottom: 10px;
    }
    .deposit {
      width: 94%;
      height: 49px;
      line-height: 49px;
      background: linear-gradient(90deg, #f6ce95 0%, #e1a651 100%);
      box-shadow: 0px 2px 4px 0px rgba(231, 180, 106, 0.5);
      border-radius: 25px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>

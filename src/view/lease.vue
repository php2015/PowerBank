<template>
  <div class="hire-box">
    <div class="hire">
      <div class="amount">
        <span style="font-size:18px">￥</span>
        {{price}}
      </div>
      <div class="hire-font">租用前需先充值押金</div>
    </div>
    <div class="fooer">
      <div class="depositfont">押金规则：租用充电宝需缴纳押金，充电宝归还后，扣除租金后剩余押金自动退还。</div>
      <form action="https://epay1.zj96596.com/paygate/main" method="post" ref="form">
        <input type="hidden" name="TransId" :value="TransId" />
        <input type="hidden" name="Plain" :value="Plain" />
        <input type="hidden" name="Signature" :value="Signature" />
        <input class="submit" type="submit" value @click="onpay" />
      </form>
      <div class="deposit" @click="onpay">确认支付</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast, Notify } from "vant";
Vue.use(Toast);
Vue.use(Notify);
import { applyRefund, getPayAutograph, getPrice } from "../api/api";
export default {
  data() {
    return {
      pay: 1,
      openId: null,
      rentSn: null,
      TransId: null,
      Plain: null,
      Signature: null,
      price: null,
    };
  },
  mounted() {
    const { depositMoney } = this.$route.params;
    // this.pay = pay;
    this.depositMoney = depositMoney;
    this.openId = localStorage.getItem("openId");
    this.rentSn = localStorage.getItem("sn");
    this.getBrightAndDark();
    this.getPrice();
  },
  methods: {
    // 获取协议金额
    async getPrice() {
      const res = await getPrice(this.rentSn);
      if (res.code == 200) {
        let temp = res.data.maxAmount.toString().split(".");
        this.price =
          temp.length > 1 ? res.data.maxAmount : res.data.maxAmount + ".00";
      }
    },
    async getBrightAndDark() {
      try {
        const res = await getPayAutograph({
          openId: this.openId,
          sn: this.rentSn,
        });
        if (res.code == 200) {
          this.Plain = res.data.plain;
          this.Signature = res.data.signature;
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onpay() {
      // const resoult = await updateOrderAndCusStatus(this.openId);
      // console.log(resoult);
    },
    // 申请退款
    async ondeposit() {
      try {
        const res = await applyRefund({ openId: this.openId });
        Notify({ type: "warning", message: res.msg });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.submit {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
}
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

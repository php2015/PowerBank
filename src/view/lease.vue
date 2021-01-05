<template>
  <div class="hire-box">
    <div class="hire">
      <div class="amount"><span style="font-size:18px">￥</span>99.00</div>
      <div class="hire-font">租用前需先充值押金</div>
    </div>
    <div class="fooer">
      <form
        action="http://epay1.zj96596.com.cn/paygate/main"
        method="post"
        ref="form"
      >
        <input type="hidden" name="TransId" value="IPEM" />
        <input type="text" name="Plain" v-model="this.plain" />
        <input type="text" name="Signature" v-model="this.signature" />
        <input type="submit" name="submit" value="银行支付网关" />
      </form>
      <div class="depositfont">
        押金规则：租用充电宝需缴纳99元押金，充电宝归还后，并支付租金，即可发起退押金。
      </div>
      <div class="deposit" v-if="pay == 1" @click="onpay">确认支付</div>
      <div class="deposit" v-else @click="ondeposit">退押金</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Toast, Notify } from "vant";
Vue.use(Toast);
Vue.use(Notify);
import { orderadd, applyRefund, getPayAutograph, payRent } from "../api/api";
export default {
  data() {
    return {
      pay: 1,
      openId: null,
      rentSn: null,
      plain: null,
      signature: null
    };
  },
  mounted() {
    const { depositMoney, pay } = this.$route.params;
    this.pay = pay;
    this.depositMoney = depositMoney;
    this.openId = localStorage.getItem("openId");
    this.rentSn = localStorage.getItem("sn");
  },
  methods: {
    async onpay() {
      try {
        const res = await getPayAutograph({
          openId: this.openId,
          sn: this.rentSn,
          payType: "yajin",
          rentTime: 0
        });
        if (res.code == 200) {
          this.plain = res.data.plain;
          this.signature = res.data.signature;
          // const num = await payRent({
          //   Plain: this.plain,
          //   Signature: this.signature,
          //   TransId:'IPEM'
          // })
          console.log(this.$refs.form, 64);
          this.$refs.form.submit();
          // that.$router.push({
          //   name: "Statu`spay",
          //   params: {
          //     pay: 1`
          //   }
          // });
        } else {
          Notify({ type: "warning", message: res.msg });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 申请退款
    async ondeposit() {
      try {
        const res = await applyRefund({ openId: this.openId });
        Notify({ type: "warning", message: res.msg });
      } catch (error) {
        console.log(error);
      }
    }
  }
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

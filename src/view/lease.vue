<template>
  <div class="hire-box">
    <div class="hire">
      <div class="amount"><span style="font-size:18px">￥</span>99.00</div>
      <div class="hire-font">租用前需先充值押金</div>
    </div>
    <div class="fooer">
      <div class="depositfont">押金规则：租用充电宝需缴纳99元押金，充电宝归还后，并支付租金，即可发起退押金。</div>
      <form action="http://epay1.zj96596.com.cn/paygate/main" method="post" ref="form">
        <input type="hidden" name="TransId" :value="TransId" />
        <input type="hidden" name="Plain" :value="Plain" />
        <input type="hidden" name="Signature" :value="Signature" />
        <input class="submit" :type="pay === 1 ? 'submit':'hidden'" value />
      </form>
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
      TransId: null,
      Plain: null,
      Signature: null,
    };
  },
  mounted() {
    const { depositMoney, pay } = this.$route.params;
    this.pay = pay;
    this.depositMoney = depositMoney;
    this.openId = localStorage.getItem("openId");
    this.rentSn = localStorage.getItem("sn");
    this.getBrightAndDark();
  },
  methods: {
    async getBrightAndDark() {
      try {
        const res = await getPayAutograph({
          openId: this.openId,
          sn: this.rentSn,
          payType: "yajin",
          rentTime: 0
        });
        console.log(res);
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
      // try {
      //   const res = await getPayAutograph({
      //     openId: this.openId,
      //     sn: this.rentSn,
      //     payType: "yajin",
      //     rentTime: 0,
      //   });
      //   console.log(res);
      //   if (res.code == 200) {
      //     this.Plain = res.data.plain;
      //     this.Signature = res.data.signature;
      //     // this.$refs.form.submit();
      //     // this.TransId = res.data,
      //     // const num = await payRent({
      //     //   Plain: this.plain,
      //     //   Signature: this.signature,
      //     //   TransId:'IPEM'
      //     // })
      //     // axios
      //     //   .post("http://epay1.zj96596.com.cn/paygate/main", {
      //     //     Plain: this.plain,
      //     //     Signature: this.signature,
      //     //     TransId: "IPEM",
      //     //   })
      //     //   .then(function (response) {
      //     //     console.log(response);
      //     //   })
      //     //   .catch(function (error) {
      //     //     console.log(error);
      //     //   });
      //     // const options = {
      //     //   method: "POST",
      //     //   headers: { "content-type": "application/x-www-form-urlencoded" },
      //     //   data: {
      //     //     Plain: this.Plain,
      //     //     Signature: this.Signature,
      //     //     TransId: this.TransId,
      //     //   },
      //     //   url: "http://epay1.zj96596.com.cn/paygate/main",
      //     // };
      //     // const res1 = await axios(options);
      //     // console.log(res1, "res1");
      //     // that.$router.push({
      //     //   name: "Statu`spay",
      //     //   params: {
      //     //     pay: 1`
      //     //   }
      //     // });
      //   } else {
      //     Notify({ type: "warning", message: res.msg });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
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

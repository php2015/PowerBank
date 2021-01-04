<template>
  <div class="power-box">
    <div class="carousel">
      <div class="carousel-font">共享充电宝</div>
    </div>
    <div class="button-box">
      <div class="button" @click="rent">租用</div>
      <div class="button" @click="back">归还</div>
      <div class="button" @click="depositRefund">退押金</div>
      <!-- @click="deposit" -->
    </div>
    <div class="font-box">
      <div>计费规则：</div>
      <div>
        自充电宝借出后按次计费，1分钱租用1次。
        <br />超过24小时未归还的，逾期按1元/天扣费。
      </div>
    </div>
    <div class="font-box">
      <div>押金规则：</div>
      <div>租用充电宝需缴纳99元押金，充电宝归还后，并支付租金，即可发起退押金。</div>
      <br />
      <div @click="goFalse">故障上报</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify, Dialog } from "vant";

// 全局注册
Vue.use(Notify);
Vue.use(Dialog);
import { getReturn, depositRefund, orderadd } from "../api/api";
export default {
  data() {
    return { branNo: null, openId: null, sn: null };
  },
  mounted() {
    const { branNo, openId, sn } = this.$route.query;
    this.branNo = branNo;
    this.openId = openId;
    this.sn = sn;
  },
  methods: {
    // 租用
    async rent() {
      const res = await orderadd({
        openId: this.openId,
        rentSn: "KX0571000001",
      });
      console.log(res);
      if (res.code == 210) {
        Notify({
          type: "primary",
          message: "请先支付押金后再租用！",
        });
        this.$router.push({
          name: "Lease",
          params: {
            pay: 1,
          },
        });
      } else if (res.code == 211) {
        Notify({
          type: "primary",
          message: "请结算未支付的订单!",
        });
      }
      // this.$router.push({
      //   name: "Lease",
      //   params: {
      //     pay: 1,
      //   },
      // });
    },
    // 归还
    async back() {
      const res = await getReturn({ openId: this.openId, rentFlag: "1" });
      if (res.code == 212) {
        Notify({
          type: "primary",
          message: "当前没有可归还充电宝，请先去租用充电宝！",
        });
      } else if (res.code == 213) {
        Notify({ type: "danger", message: "请先归还充电宝！" });
      } else if (res.code == 200) {
        console.log(res.data);
        this.$router.push({
          path: `/statuspay`,
          name: "Statuspay",
          params: {
            pay: 3,
            orderId: res.data.orderId,
            rentTime: res.data.rentTime,
            rentMoney: res.data.rentMoney,
            openId: this.openId,
            sn: this.sn,
            time: res.data.time,
          },
        });
      }
    },
    // 退押金
    async depositRefund() {
      try {
        const res = await depositRefund({ openId: this.openId });
        console.log(res);
        if (res.code == 211) {
          Dialog.confirm({
            title: "提示",
            message: "您有一项待支付订单，前往支付？",
          })
            .then(() => {
              // on confirm
              // this.$router.push({
              //   path: `/statuspay`,
              //   name: "Statuspay",
              //   params: {
              //     pay: 3,
              //     orderId: res.data.orderId,
              //     rentTime: res.data.rentTime,
              //     rentMoney: res.data.rentMoney,
              //   },
              // });
              this.back();
            })
            .catch(() => {
              // on cancel
            });
        } else if (res.code == 200) {
          const { depositStatus } = res.data;
          console.log(depositStatus);
          switch (depositStatus) {
            case "0":
              Notify({ type: "primary", message: "尚未支付押金" });
              break;
            case "1":
              console.log(res.data.depositMoney);
              console.log(res.data.openId);
              this.$router.push({
                path: `/lease`,
                name: "Lease",
                params: {
                  depositMoney: res.data.depositMoney,
                  orderId: res.data.orderId,
                },
              });
              break;
            case "2":
              Notify({ type: "danger", message: "押金已经归还" });
              break;

            default:
              break;
          }
        } else {
          alert(res.msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    deposit() {
      this.$router.push({
        name: "Lease",
        params: {
          pay: 3,
        },
      });
    },
    // 故障上报
    async goFalse() {
      try {
        const res = await depositRefund({ openId: this.openId });
        if (res.code >= 200 && res.code < 300) {
          console.log(res.data);
          const { depositStatus } = res.data;
          if (depositStatus == "1") {
            this.$router.push({
              path: "/faultReport",
              name: "faultReport",
              params: { openId: this.openId },
            });
          }
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.power-box {
  padding: 10px 14px 0 14px;
  .carousel {
    background: url("../assets/images/carousel.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 165px;
    border-radius: 6px;
    .carousel-font {
      width: 100%;
      height: 165px;
      line-height: 165px;
      border-radius: 6px;
      font-size: 21px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
  }
  .button-box {
    margin-top: 18px;
    .button {
      width: 100%;
      height: 87px;
      line-height: 87px;
      background: url("../assets/images/button.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin-bottom: 2px;
    }
    .button:nth-child(2) {
      background: url("../assets/images/button2.png") no-repeat;
      background-size: 100% 100%;
    }
    .button:nth-child(3) {
      background: url("../assets/images/button3.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .font-box {
    margin-top: 14px;
    font-size: 12px;
    line-height: 17px;
    color: #333;
  }
}
</style>

<template>
  <div class="power-box">
    <div class="carousel">
      <div class="carousel-font">共享充电宝</div>
    </div>
    <div class="font-box">
      <div class="font-box-title">订单须知</div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>按次计费</span>
          <span>{{price.price}}元 / 次</span>
        </div>
        <div class="font-box-item-content">自充电宝借出后按次计费，{{price.price}}元租用1次</div>
      </div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>押金规则</span>
        </div>
        <div class="font-box-item-content">租用充电宝需缴纳 {{price.maxAmount}} 元押金，充电宝归还后，将在扣除租金后，自动退还剩余押金</div>
      </div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>注意事项</span>
        </div>
        <div class="font-box-item-content">充电宝租用超出 {{price.maxDeadline}} 天未归还，将扣除全部押金，充电宝归客户所有</div>
      </div>
    </div>
    <div class="agreement">
      租用充电宝即代表您同意
      <span @click="rentalAgree">《共享充电宝租用协议》</span>
    </div>
    <div class="button" @click="rent">立即租用</div>
    <div class="false" @click="goFalse">故障上报</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify, Dialog } from "vant";

// 全局注册
Vue.use(Notify);
Vue.use(Dialog);
import { orderadd, getLastOrder, getPrice } from "../api/api";
// singleQuery,
export default {
  data() {
    return { branNo: null, openId: null, sn: null, price: {} };
  },
  mounted() {
    if (window.location.search.includes("?openId")) {
      localStorage.setItem(
        "branNo",
        window.location.search.split("&")[1].split("branNo=")[1]
      );
      localStorage.setItem(
        "openId",
        window.location.search.split("&")[0].split("?openId=")[1]
      );
      localStorage.setItem(
        "sn",
        window.location.search.split("&")[2].split("sn=")[1]
      );
    }
    this.branNo = localStorage.getItem("branNo");
    this.openId = localStorage.getItem("openId");
    this.sn = localStorage.getItem("sn");
    this.getPrice();
  },
  methods: {
    // 点击租用协议
    rentalAgree() {
      this.$router.push("/rentalAgree");
    },
    // 获取协议金额
    async getPrice() {
      const res = await getPrice(this.sn);
      if (res.code == 200) {
        this.price = res.data;
      }
    },

    // 租用
    async rent() {
      console.log(new Date().getTime(), 1);
      const res = await orderadd({
        openId: this.openId,
        rentSn: this.sn,
      });
      if (res.code == 210) {
        // 跳转到支付押金页面
        this.$router.push({
          name: "Lease",
        });
      } else if (res.code == 211) {
        Notify({
          type: "warning",
          message: "请先归还充电宝!",
        });
      } else if (res.code == 502) {
        Notify({
          type: "danger",
          message: "弹出充电宝异常,请提交故障上报！",
        });
      } else if (res.code == 501) {
        Notify({
          type: "warning",
          message: "暂无可用充电宝！",
        });
      } else {
        Notify({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 故障上报
    async goFalse() {
      try {
        let openId = this.openId;
        const res = await getLastOrder({
          openId,
        });
        if (res.code == 200) {
          this.$router.push({
            path: "/faultReport",
            name: "faultReport",
            params: {
              openId: this.openId,
              orderId: res.data.orderId,
              time: res.data.createTime,
            },
          });
        } else {
          Notify({ type: "warning", message: "暂时不能提交故障" });
        }
      } catch (error) {
        console.log(error);
        Notify({ type: "warning", message: "暂时不能提交故障" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.power-box {
  padding: 10px 14px 0 14px;
  background-color: #f0f2f5;
  height: 100%;
  box-sizing: border-box;
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
  .font-box {
    background-color: #fafafa;
    margin: 20px 0;
    border-radius: 10px;
    padding: 20px;
    font-size: 12px;
    color: #333;
    .font-box-title {
      text-align: center;
      font-weight: 700;
    }
    .font-box-item {
      &:nth-last-child(1) {
        color: #ff6200;
      }
      .font-box-item-header {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        margin-top: 10px;
        span:nth-child(1) {
          font-weight: 700;
        }
      }
    }
  }
  .agreement {
    text-align: center;
    font-size: 12px;
    color: #999;
    span {
      color: #53a3fc;
    }
  }
  .button {
    height: 49px;
    border-radius: 50px;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    line-height: 49px;
    margin-top: 20px;
    background: linear-gradient(90deg, #f6ce95 0%, #e1a651 100%);
  }
  .false {
    font-size: 12px;
    color: #999;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

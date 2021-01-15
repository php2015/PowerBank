<template>
  <div class="power-box">
    <div class="occupyhigh"></div>
    <div class="carousel">
      <div class="carousel-font">共享充电宝</div>
    </div>
    <div class="font-box">
      <div class="font-box-title">订单须知</div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>按次计费</span>
          <span>1分钱/次</span>
        </div>
        <div class="font-box-item-content">自充电宝借出后按次计费，1分钱租用1次，超过24小时未归还的，逾期按1元/天扣费</div>
      </div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>押金规则</span>
        </div>
        <div class="font-box-item-content">租用充电宝需缴纳99元押金，充电宝归还后，将在扣除租金后，自动退还剩余押金</div>
      </div>
      <div class="font-box-item">
        <div class="font-box-item-header">
          <span>注意事项</span>
        </div>
        <div class="font-box-item-content">充电宝租用超出7天未归还，将扣除全部押金，充电宝归客户所有</div>
      </div>
    </div>
    <div class="agreement">
      租用充电宝即代表您同意
      <span>《共享充电宝租用协议》</span>
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
import {
  getReturn,
  depositRefund,
  orderadd,
  getLastOrder,
  singleQuery,
} from "../api/api";
export default {
  data() {
    return { branNo: null, openId: null, sn: null };
  },
  mounted() {
    const { branNo, openId, sn } = this.$route.query;
    this.branNo = localStorage.getItem("branNo");
    this.openId = localStorage.getItem("openId");
    this.sn = localStorage.getItem("sn");
    if (window.location.search.includes("orderId")) {
      let orderId = window.location.search.split("&")[3].split("=")[1];
      singleQuery({ orderId });
    }
  },
  methods: {
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
          message: "弹出充电宝异常,请提交故障上报！"
        });
      } else if (res.code == 501) {
        Notify({
          type: "warning",
          message: "暂无可用充电宝！",
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
    }
  },
  created() {
    if (window.location.hash.includes("branNo")) {
      localStorage.setItem(
        "branNo",
        window.location.hash.split("&")[1].split("branNo=")[1]
      );
      localStorage.setItem(
        "openId",
        window.location.hash.split("&")[0].split("?openId=")[1]
      );
      localStorage.setItem(
        "sn",
        window.location.hash.split("&")[2].split("sn=")[1]
      );
    }
  }
};
</script>

<style lang="less" scoped>
.power-box {
  padding: 0 14px;
  background-color: #f0f2f5;
  height: 100%;
  .occupyhigh{
    height: 10px;
  }
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

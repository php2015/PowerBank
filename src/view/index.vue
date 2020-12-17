<template>
  <div class="power-box">
    <div class="carousel">
      <div class="carousel-font">共享充电宝</div>
    </div>
    <div class="button-box">
      <div class="button" @click="rent">租用</div>
      <div class="button">归还</div>
      <div class="button">退押金</div>
    </div>
    <div class="font-box">
      <div>计费规则：</div>
      <div>
        自充电宝借出后按次计费，1分钱租用1次。<br />
        超过24小时未归还的，逾期按1元/天扣费。
      </div>
    </div>
    <div class="font-box">
      <div>押金规则：</div>
      <div>
        租用充电宝需缴纳99元押金，充电宝归还后，并支付租金，即可发起退押金。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    rent() {
      this.$router.push({
        path: `/lease`
      });
    }
  }
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
    font-size: 10px;
  }
}
</style>

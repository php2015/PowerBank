<template>
  <div class="layout">
    <div class="status">
      <div class="Placeholder"></div>
      <div class="icon" v-if="status "></div>
      <div class="status-font" v-if="ispay == 1">
        租用成功！<br />
        请及时取用充电宝
      </div>
      <div class="status-font" v-else-if="ispay == 2">
        支付成功！
      </div>
      <div class="payment" v-else>
        <div class="amount">
          <span class="amountfont">待付款：</span><span>￥</span>0.01<span class="amountfont">元</span>
        </div>
      </div>
    </div>
    <div class="card" v-if="ispay == 1">
      <div>租用明细：</div>
      <div class="card-box">
        <span>订单编号</span>
        <span>CD20201130133412001</span>
      </div>
      <div class="card-box">
        <span>网点</span>
        <span>瑞安市农商行南海支行</span>
      </div>
      <div class="card-box">
        <span>租用时间</span>
        <span>2020-11-30 12:21:21</span>
      </div>
      <div class="card-box">
        <span>押金</span>
        <span>已交押金</span>
      </div>
      <div class="card-box">
        <span>计费标准</span>
        <span>0.01元/次</span>
      </div>
    </div>
    <div class="card" v-else>
      <div>租用明细：</div>
      <div class="card-box">
        <span>计费标准</span>
        <span>CD20201130133412001</span>
      </div>
      <div class="card-box">
        <span>计费标准</span>
        <span>瑞安市农商行南海支行</span>
      </div>
      <div class="card-box">
        <span>应付金额</span>
        <span>2020-11-30 12:21:21</span>
      </div>
    </div>
    <div class="fooer">
      <div class="deposit"  v-if="ispay == 1">立即归还</div>
      <div class="deposit"  v-else-if="ispay == 2">完成</div>
      <div class="deposit"  v-else>立即支付</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ispay: 1,
      status:true
    };
  }
};
</script>

<style lang="less" scoped>
.layout {
  width: 347px;
  height: 100%;
  margin: 0 auto;

  .status {
    margin: 0 auto;
    .Placeholder {
      height: 69px;
    }
    .icon {
      width: 112px;
      height: 112px;
      margin: 0 auto;
      background: url("../assets/status/success.png") no-repeat;
      background-size: cover;
    }
    .status-font {
      margin: 20px 0;
      text-align: center;
      font-weight: 700;
      line-height: 20px;
      font-size: 14px;
    }
    .payment {
      width: 100%;
      margin-bottom:68px;
      .amount {
        width:170px;
        margin: 0 auto;
        display: flex;
        font-weight: bold;
        color: #ff5400;
        line-height: 21px;
        font-size: 36px;
        text-align: center;
        .amountfont {
          color: #333333;
          font-size: 14px;
        }
        span {
          font-size: 18px;
        }
      }
    }
  }
  .card {
    height: 233px;
    padding: 19px 14px 14px 14px;
    font-size: 12px;
    background: #fafafa;
    border-radius: 6px;
    color: #333333;
    .card-box {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .fooer {
    position: fixed;
    bottom: 10px;
    .deposit {
      width: 347px;
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

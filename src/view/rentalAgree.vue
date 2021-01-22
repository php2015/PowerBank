<template>
  <div class="rentalAgree">
    <div class="h1">租用协议</div>
    <div
      class="p bigP"
    >尊敬的用户，为保障您的合法权益，请您在租用前仔细阅读本《租用协议》(“本协议”) 以了解共享充电宝的使用规则并避免产生任何误解。当您点击“立即租用”按钮，即视为您已阅读、理解本协议，并同意按照本协议约定的规则进行充电宝租用。</div>
    <div class="title">活动对象</div>
    <div class="p">丰收共享充电宝面向的是浙江瑞安农村商业银行股份有限公司（以下简称瑞安农商银行）客户。</div>
    <div class="title">押金规则</div>
    <div class="p">1)充值押金，使用充电宝前需要支付一定的押金，完成押金支付后，即可使用充电宝；</div>
    <div
      class="p"
    >2) 退还押金，充电宝正常归还后，系统将自动结算租金费用，扣除租金后，剩余押金将自动退还。例如: 如您已充值押金为100元，充电宝归还后，扣除租金费用0.01元，剩下99.99元自动退还</div>
    <div class="p">
      3) 出现以下情况会扣除押金：
      <strong>充电宝超期未归还。 充电宝损坏。</strong>
    </div>
    <div class="title">租金规则</div>
    <div class="p">租金的计费规则具体见活动首页《使用须知》。</div>
    <div class="title">保证与承诺</div>
    <div
      class="p"
    >您完全理解并同意，瑞安农商银行所提供的包括“1分钱充电”在内的优惠活动仅适用于正当、合法使用我们服务的用户。一旦发现您的用户帐号存在任何利用前述规则从事作弊行为以获取不正当经济利益的情形，瑞安农商银行有权冻结或关闭您的用户账号以及任何其他与作弊行为相关的用户帐号，并且瑞安农商银行保留停止向您提供服务以及根据作弊行为的严重程度进一步追究法律责任的权利。</div>
    <div class="title">特别说明</div>
    <div
      class="p"
    >您完全理解并同意，瑞安农商银行有权随时修改本协议内容，届时将通过在软件上公布修改后的协议，该公布将被视为瑞安农商银行已通知用户；同时，瑞安农商银行也可通过其他适当方式通知用户。如果您选择继续租用即表示您同意并接受修改后的协议并受其约束；如果您不同意我们对本协议的修改，请立即停止使用本服务。在适用法律法规允许的范围内，本协议下充电宝租用使用规则的最终解释权归瑞安农商银行所有。</div>
    <button class="button" @click="openScan">返回首页</button>
  </div>
</template>

<script>
export default {
  methods: {
    openScan() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped >
.rentalAgree {
  padding: 10px;
}
.h1 {
  text-align: center;
  font-weight: 700;
}
.bigP {
  margin: 15px 0;
}
.p {
  line-height: 25px;
  text-indent: 2em;
  font-size: 14px;
}
.title {
  font-weight: 700;
  font-size: 14px;
  margin: 10px 0;
}
strong {
  text-decoration: underline;
  font-weight: 700;
}
.button {
  width: 100%;
  height: 49px;
  border-radius: 50px;
  background-image: linear-gradient(45deg, #f6ce95, #e1a651);
  border: none;
  color: #fff;
  font-size: 18px;
  margin: 10px 0;
}
</style>
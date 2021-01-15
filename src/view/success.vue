<template>
  <div>
    <div class="Placeholder">
      <div class="icon"></div>
      <div class="status-font">支付成功！</div>
    </div>
     <div class="fooer">
      <div class="deposit" @click="goindex">完成</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
      alert(window.location.href)
  },
  methods: {
      goindex(){
          this.$router.push({
              path: `/`
          })
      }
  }
};
</script>

<style lang="less" scoped>
.Placeholder {
  margin-top: 67px;
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
 .fooer {
     width: 100%;
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
</style>

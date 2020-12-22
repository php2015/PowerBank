<template>
  <div class="layout">
    <div class="Placeholder"></div>
    <div class="waitbox">
      <img src="../assets/images/powerbank.png" alt="powerbank" />
      <div>请将充电宝插入响应卡槽！</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: "Statuspay",
        params: {
          pay: 3
        }
      });
    }, 3000);
  }
};
</script>

<style lang="less" scoped>
.layout {
  .Placeholder {
    height: 162px;
  }
  .waitbox {
    text-align: center;
    img {
      width: 145px;
      height: 93px;
    }
    div {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>

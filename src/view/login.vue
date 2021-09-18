<template>
  <div class="app-container">
    <div class="title">共享充电宝</div>
    <img class="banner" src="@/assets/images/banner.png" alt="" />
    <van-form class="vanForm" @submit="onSubmit">
      <van-field
        v-model="userName"
        name="用户名"
        placeholder="请输入用户名"
        left-icon="manager-o"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        left-icon="lock"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px 0">
        <div class="button" @click="login">登 录</div>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field } from "vant";
import { login } from "../api/api";
Vue.use(Form);
Vue.use(Field);
export default {
  data() {
    return {
      userName: null,
      password: null,
      sn: null,
    };
  },
  components: {},
  created() {
    const url = window.location.href;
    this.sn = url.split("?")[1].split("=")[1];
  },
  methods: {
    onSubmit() {
      console.log(23);
    },
    async login() {
      const { userName, password } = this;
      const res = await login({ userName, password });
      if (res.code !== 200) {
        return Notify({
          type: "danger",
          message: res.msg,
        });
      }
      this.$router.push({
        path: "/eject",
        query: { sn: this.sn },
      });
    },
  },
};
</script>

<style scoped lang="less">
.app-container {
  padding: 0 10px;
  .banner {
    width: 100%;
  }
  .title {
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    line-height: 28px;
    opacity: 0.8;
  }
  .vanForm {
    margin-top: 20px;
  }
  .button {
    height: 44px;
    line-height: 44px;
    text-align: center;
    // background: url("../assets/images/button2.png") 0 0 no-repeat;
    // background-size: 100% 100%;
    background: linear-gradient(90deg, #79d5f9 0%, #0490e2 100%);
    border-radius: 100px;
    color: #fff;
    font-weight: 700;
  }
}
</style>
<style lang="less">
.van-cell {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 11px;
  margin-bottom: 18px;
}
</style>
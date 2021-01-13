<template>
  <div class="faultReport">
    <van-form @submit="onSubmit">
      <van-field v-model="orderId" name="orderId" label="订单号" disabled input-align="right" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="exceptionType"
        label="问题类型"
        placeholder="问题类型"
        :rules="[{ required: true, message: '请选择问题类型' }]"
        input-align="right"
        @click="showPicker = true"
      />
      <!-- @click="showPicker = true" -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="exceptionReason"
        name="exceptionReason"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入问题描述"
        show-word-limit
        :rules="[{ required: true, message: '请输入问题描述' }]"
      />
      <van-field name="uploader" label="上传照片">
        <template #input>
          <van-uploader
            v-model="uploader"
            upload-icon="plus"
            :max-count="3"
            multiple
            :after-read="afterRead"
            @delete="deleteImg"
          />
        </template>
      </van-field>
      <div class="btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="linear-gradient(to right, #F6CE95, #E1A651)"
        >上传问题</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { uploadImg, faultReport, getLastOrder } from "@/api/api";
import Vue from "vue";
import { Form, Field, Button, Popup, Picker, Uploader, Notify } from "vant";

// 全局注册
Vue.use(Notify);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Uploader);
export default {
  data() {
    return {
      openId: "",
      exceptionType: "租用故障", //问题类型
      columns: ["租用故障", "归还故障"],
      exceptionReason: "", //问题描述
      uploader: [], //展示的图片的链接
      fileList: [], //上传之后的图片地址
      showPicker: false, //问题类型的弹框
      orderId: null,
      time: null,
    };
  },
  created() {
    this.openId = localStorage.getItem("openId");
    this.orderId = this.$route.params.orderId;
    this.time = this.$route.params.time;
  },
  methods: {
    async onSubmit(values) {
      const { picker, exceptionReason } = values;
      let sn = localStorage.getItem("sn");
      let openId = localStorage.getItem("openId");
      let exceptionType = picker == "租用问题" ? 1 : 2;
      let data = {
        exceptionReason,
        exceptionType,
        fileList: this.fileList,
        openid: openId,
        sn,
        orderId: this.orderId,
        lendTime: this.time,
      };
      try {
        const res = await faultReport(data);
        console.log(res);
        if (res.code == 500) {
          console.log(500);
        }
        if (res.code == 200) {
          Notify({
            type: "primary",
            message: res.msg,
          });
          this.$router.push("/");
        } else {
          Notify({
            type: "warning",
            message: res.msg,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    onConfirm(value) {
      this.exceptionType = value;
      this.showPicker = false;
    },
    async afterRead(file, detail) {
      let formData = new FormData();
      //如果上传的数组
      if (file instanceof Array) {
        for (let i = 0; i < file.length; i++) {
          formData.append("file" + i, file[i].file);
        }
      } else {
        formData.append("file", file.file); //必须是file.file，不然会报错
      }
      try {
        const res = await uploadImg(formData);
        if (res.code == 200) {
          // console.log(this.fileList);
          this.fileList.push(res.data);
        } else {
          Notify({
            type: "warning",
            message: res.msg,
          });
        }
      } catch (error) {
        console.log(error);
      }
      // uploadImg
    },
    deleteImg(file, index) {
      this.fileList.splice(index.index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.faultReport {
  .btn {
    position: absolute;
    bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
  }
}
</style>
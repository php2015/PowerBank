<template>
  <div class="faultReport">
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="网点"
        label="网点"
        placeholder="网点名称"
        :rules="[{ required: true, message: '请填写网点名称' }]"
        input-align="right"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="questType"
        label="问题类型"
        placeholder="问题类型"
        :rules="[{ required: true, message: '请选择问题类型' }]"
        @click="showPicker = true"
        input-align="right"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="describe"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入问题描述"
        show-word-limit
      />
      <van-field name="uploader" label="上传照片">
        <template #input>
          <van-uploader v-model="uploader" upload-icon="plus" :max-count="3" />
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
import Vue from "vue";
import { Form, Field, Button, Popup, Picker, Uploader } from "vant";

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Uploader);
export default {
  data() {
    return {
      name: "", //网点名称
      questType: "", //问题类型
      columns: ["租用问题", "归还问题", "退押金问题"],
      describe: "", //问题描述
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }], //展示的图片的链接
      showPicker: false, //问题类型的弹框
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(value) {
      this.questType = value;
      this.showPicker = false;
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
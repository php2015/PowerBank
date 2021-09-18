<template>
  <div class="app-container">
    <div class="banner">
      <div class="title">充电宝设备</div>
      <p>设备SN：{{ sn }}</p>
      <p>可用槽位：{{ allData.availableBatteryNum }}个</p>
      <p>空闲槽位：{{ allData.emptySlotNum }}个</p>
    </div>
    <div class="card-box">
      <!-- disable -->
      <!-- isDamage = 1，available = 0 -->
      <div
        :class="{
          card: true,
          disable: item.isDamage == 1 || item.available == 0,
        }"
        v-for="item in cardData"
        :key="item.slotId"
      >
        <div class="left">
          <div class="title">槽位{{ item.slotId }}</div>
          <template v-if="item.batteryId == 0">
            <p>电池是否可以 : 否</p>
            <p>电池编号 : /</p>
            <p>电池电量 : 0%</p>
            <p>是否线损 : /</p>
          </template>
          <template v-else>
            <p>电池是否可以 : {{ ["否", "是"][item.available] }}</p>
            <p>电池编号 : {{ item.batteryId }}</p>
            <p>电池电量 : {{ item.batteryPercentage }}%</p>
            <p>是否线损 : {{ ["健康", "线损"][item.isDamage] }}</p>
          </template>
        </div>
        <div class="right" @click="takeOut(item)">弹出</div>
      </div>
    </div>
    <div class="modal" v-show="showModal">
      <img src="../assets/images/powerbank.png" alt="" />
      <p>正在弹出....</p>
    </div>
  </div>
</template>

<script>
import { getCabinetStatus, popUpBattery } from "../api/api";
export default {
  data() {
    return {
      showModal: false,
      sn: "",
      allData: {},
      cardData: [
        // {
        //   slotId: "1",
        //   slotNum: null,
        //   available: 1,
        //   batteryPercentage: 99,
        //   batteryId: "XT4TH0116000410",
        //   isDamage: "0",
        // },
      ],
    };
  },
  components: {},
  mounted() {
    this.sn = this.$route.query.sn;
    this.getCabinetStatus();
  },
  methods: {
    // 获取设备列表
    async getCabinetStatus() {
      const res = await getCabinetStatus({ sn: this.sn });
      this.allData = res.data;
      this.cardData = res.data.ch;
    },
    //   弹出
    async takeOut({ isDamage, available, slotId }) {
      // 不能弹出
      if (isDamage == 1 || available == 0) return false;
      this.showModal = true;
      const res = await popUpBattery({ sn: this.sn, slotId });
      if (res.code !== 200) return console.log(res.msg);
      this.showModal = false;
      this.getCabinetStatus();
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
.app-container {
  height: 100%;
  .banner {
    height: 225px;
    background: url("../assets/images/banner2.png") 0 0 no-repeat;
    background-size: 100% 100%;
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    .title {
      text-align: center;
      line-height: 80px;
      font-weight: 700;
    }
    p {
      line-height: 40px;
    }
  }
  .card-box {
    padding: 10px;
    height: calc(100vh - 245px);
    overflow: scroll;
    .card {
      display: flex;
      height: 130px;
      margin-bottom: 15px;
      //   overflow: auto;
      .left {
        border-radius: 10px 0 0 10px;
        flex: 1;
        box-shadow: 1px 1px 7px 1px #c4bfbf;
        padding: 8px 10px 0;
        .title {
          color: rgba(33, 158, 230, 1);
          font-weight: 700;
          font-size: 18px;
          padding-bottom: 4px;
        }
        p {
          line-height: 22px;
          font-size: 14px;
        }
      }
      .right {
        border-radius: 0 10px 10px 0;
        width: 25%;
        height: 100%;
        background-color: rgba(33, 158, 230, 1);
        color: #fff;
        font-weight: 700;
        font-style: 28px;
        text-align: center;
        box-shadow: 1px 2px 7px 1px #c4bfbf;
        line-height: 130px;
      }
    }
    .disable {
      .left .title {
        color: #b5b5b5;
      }
      p {
        color: rgba(0, 0, 0, 0.4);
      }
      .right {
        background-color: rgba(181, 181, 181, 1);
      }
    }
  }
  .modal {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    text-align: center;
    img {
      margin-top: 220px;
    }
  }
}
</style>
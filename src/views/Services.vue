<template>
  <div class="services-body">
    <div class="top">
      <video class="sleep-video" autoplay muted loop>
        <source src="https://www.308262.com/vue/files/service.mov" type="video/mp4">
      </video>
      <div class="bigLogo">WeAre
      </div>
      <div class="smallLogo">professional
      </div>
      <div class="our-service" @click="toBottom(stepBottom)">
        <img src="@/assets/img/icons8-expand_arrow-4_2x.png" />Our Service
      </div>
      <div class="service-content">
        對於企業客戶，每一個決定都會產生影響，我們在這裡可以幫助您指導遷移或啟動過程中的動盪和壓力。 我們首先研究您的要求和需求，然後與我們經驗豐富的技術人員團隊一起開發可行的解決方案以及部署策略。
      </div>
    </div>
    <div class="services">
      <div v-for="(item, index) in services" :key="index" class="services-item">
        <img :src="(baseDomain +'/storage/service/'+ item.img)" >
        <div class="mask">
          <div class="services-title">{{item.title}}</div>
          <div class="services-content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-left">For Enterprise clients every decision has repercussions and we are here to help guide you through the turbulence and stress involved in migrations or start-ups. We start by delving into your requirements and needs, then working with our team of experienced technicians to develop a working solution as well as a deployment strategy.</div>
      <div class="footer-right">Consultation Services (Standardization, Strategic Technology and Adoption Assessment, Evaluation, POC, Mentoring) Implementation Services (Design, Architect, Plan and Build) Training Services (Standard or Customize) Managed Services (7/24 round the clock remote/on-site project nursing residency or support) Development Services (Java and Enterprise System Integration) Enterprise</div>
    </div>
  </div>
</template>

<script>
import {fetchService} from "@/api/serviceArticle";

export default {
  name: "Services",
  created() {
    fetchService([]).then(response=>{

      if(response.success){
        this.services=response.rows
      }

    })
  },
  data() {
    return {
      baseDomain: process.env.VUE_APP_BASE_DOMAIN,
      stepBottom: 50, //此数据是控制动画快慢的
      services: []
    };
  },
  computed: {
  },
  methods: {
    toBottom(i) {
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      let height = scrollHeight - clientHeight - 10; //超出窗口上界的值就是底部的scrolTop的值
      document.documentElement.scrollTop += i;
      let c;
      if (document.documentElement.scrollTop < height) {
        c = setTimeout(() => this.toBottom(i), 16);
      } else {
        clearTimeout(c);
      }
    },
    getImgUrl(image) {
      return require("@/assets/img/" + image);
    }
  },
  mounted() {
  },
  beforeDestroy() {
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style lang="scss">
@import "../assets/style/utils/_variables.scss";
@media screen and (min-width: $bigWidth) {
}
@media screen and (min-width: $smallWidth) and (max-width: $bigWidth) {
}
@media screen and (max-width: $smallWidth) {
}
.services-body {
  .top{
    height: 750px;
    color: white;
    position: relative;
    .sleep-video {
      left: 0;
      top: 0;
      position: fixed;
      // width: 100%;
      min-height: 100vh;
      min-width: 100vw;
      z-index: -20;
    }
    .bigLogo{
      font-size: 96px;
      position: absolute;
      top: 80px;
      left: 40px;
    }
    .smallLogo{
      font-size: 64px;
      position: absolute;
      top: 180px;
      left: 50px;
    }
    .our-service{
      font-size: 16px;
      position: absolute;
      bottom: 180px;
      right: 300px;
      width: 150px;
      height: 56px;
      background-color: rgba(232, 235, 237, 0.5);
      line-height: 56px;
      padding-left: 10px;
      cursor: pointer;
      img{
        width: 32px;
        position: relative;
        left: -10px;
      }
    }
    .service-content{
      font-size: 14px;
      position: absolute;
      bottom: 80px;
      right: 50px;
      width: 413px;
      text-align: left;
    }
  }
  .services{
    height: 480px;;
    width: 1092px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0 auto;
    .services-item{
      margin: 0 4px;
      color: rgb(255, 255, 255);
      display: flex;
      position: relative;
      overflow: hidden;
      img,
      .mask{
        width: 344px;
        height: 229px;
      }
      .mask{
        position: absolute;
        background: rgba(0, 150, 255, 0.8);
        .services-title{
          margin-top: 20%;
          font-size: 16px;
        }
        .services-content{
          margin-top: 8%;
          font-size: 12px;
        }
      }
      .mask:hover{
        background: rgba(0, 150, 255, 1);
      }
    }
  }
  .footer{
    font-size: 12px;
    color: white;
    text-align: left;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 30px;
    .footer-left{
      width: 466px;
    }
    .footer-right{
      width: 466px;
    }
  }
}
</style>
